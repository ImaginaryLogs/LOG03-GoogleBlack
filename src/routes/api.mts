import { authenticate } from '@google-cloud/local-auth';
import express, { Express, Request, Response } from "express";
import * as fsp from 'fs/promises'; //  File system module
import * as path from 'node:path'; //  File Path module
import { error_handler, log_actions, try_redirect} from "../middleware/midwares.mjs";
import { GetOAuthCookies } from "./google_credit_handler.mjs";

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

const save_settings = async (req: Request, res: Response, new_settings: {[keys : string]: string}) => {
    let current_settings = {};
        
}

const load_stored_credits = async (req: Request) => {
    try {
        const tokens = await GetOAuthCookies(req);
    } catch (err: unknown) {

    }
}

const save_credits = async (req: Request) => {

}

api.use(express.json());

api.get('/settings/load', try_redirect(async (req: Request, res:Response) => {
    res.sendStatus(404);
    res.end();
}));


export default api;