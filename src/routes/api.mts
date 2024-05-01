import { authenticate } from '@google-cloud/local-auth';
import express, { Application, Express, Request, Response } from "express";
import * as fsp from 'fs/promises'; //  File system module
import * as path from 'node:path'; //  File Path module
import { error_handler, log_actions, try_redirect, get_result} from "../middleware/midwares.mjs";
import { GetOAuthCookies, GetOAuthURL, OAuth2Client } from "./google_credit_handler.mjs";

// PATHS
const PATH_CLIENT   : string = path.join(process.cwd(), 'src/client');
const PATH_CREDIT   : string = path.join(PATH_CLIENT, 'client_secrets.json');
const PATH_TOKENS   : string = path.join(PATH_CLIENT, 'token.json'); // Token is a generated id that automatically does authentication.
const PATH_SETTINGS : string = path.join(PATH_CLIENT, 'client_settings.json');
const PATH_DATABASE : string = path.join(path.dirname(process.cwd()), 'db');

const urlGoogleScope: string[] = ['https://www.googleapis.com/auth/calendar'];
const regexDateYMD  : RegExp = /^\d{4}-\d{2}-\d{2}$/;


const api = express.Router();

const load_stored_settings = async (req: Request): Promise<any> =>{
    try {
        const content = req.cookies['user_settings'];
        return content;
    } catch (err: unknown) {
        return null;
    }
}

const save_settings = async (req: Request, newInfo: {[updatedKey: string]: any}) => {
    let resultSetting = await get_result(load_stored_settings(req));
    let payloadSettings: {[updatedKey: string]: any} = {
        markdown_path: '',
        web: { '--bg': '#080808', '--text': 'white' },
    };

	if (resultSetting.ok) {
		payloadSettings = resultSetting.value;
		for (const updatedKey of Object.keys(newInfo)) 
            payloadSettings[updatedKey] = newInfo[updatedKey];
	}
	
}

const load_stored_credits = async (req: Request, res: Response, newInfo: {[updatedKey: string]: any}) => {
	
}

const save_credits = async (req: Request) => {

}

api.use(express.json());

api.post('/login', try_redirect(GetOAuthURL));

api.get('/settings/load', try_redirect(async (req: Request, res:Response) => {
    res.cookie('user_settings', save_settings(req, req.body));
    res.writeHead(200);
    res.send();
}));

api.post('/settings/save', try_redirect((req: Request, res: Response)=>{
    res.cookie('user_settings', save_settings(req, req.body));
    res.writeHead(200);
    res.send();
}))

api.post('/redirect', try_redirect(async (req: Request, res: Response)=>{
    
    const code = req.query.code as string;

    //const user_info = axios.get(`https://www.googleapis.com/oauth/v3/tokeninfo?id_token=${code}`);
    const tokens = (await OAuth2Client.getToken(code)).tokens
    OAuth2Client.setCredentials(tokens)
    console.log("Tokens:\n");
    console.log(tokens);
    console.table(tokens);

	const token_settings: {[key: string]: any} = { maxAge: tokens.expiry_date as number, httpOnly: true };

	res.cookie('access_token', tokens.access_token as string, token_settings);
	res.cookie('refresh_token', tokens.refresh_token, token_settings);
	res.cookie('scope', tokens.scope, token_settings);
	res.cookie('token_type', tokens.token_type, token_settings);
	//res.cookie('expiry_date', tokens.expiry_date, token_settings)
	
    res.writeHead(200);
    res.write("Logged In!" + JSON.stringify(OAuth2Client));
    res.end();
}))

export default api;