import { authenticate } from '@google-cloud/local-auth';
import express, { Express, Request, Response } from "express";
import * as fsp from 'fs/promises'; //  File system module
import * as path from 'node:path'; //  File Path module
import { error_handler, log_actions, try_redirect} from "../middleware/midwares.mjs";

// PATHS
const PATH_CLIENT: string = path.join(process.cwd(), 'src/client');
const PATH_CREDIT: string = path.join(PATH_CLIENT, 'client_secrets.json');
const PATH_TOKENS: string = path.join(PATH_CLIENT, 'token.json'); // Token is a generated id that automatically does authentication.
const PATH_SETTINGS: string = path.join(PATH_CLIENT, 'client_settings.json');
const PATH_DATABASE: string = path.join(path.dirname(process.cwd()), 'db');

const urlGoogleScope: string[] = ['https://www.googleapis.com/auth/calendar'];
const regexDateYMD: RegExp = /^\d{4}-\d{2}-\d{2}$/;


const api = express.Router();

const load_stored_settings = async (): Promise<any> =>{
    let content = await fsp.readFile(PATH_SETTINGS);
    let data = JSON.parse(content.toString());
    return new Promise((resolve, reject) =>{
        resolve(data);
    })
}

const save_settings = async (new_information: any) => {
    let current_settings = {};
    current_settings = await load_stored_settings();
}



api.use(express.json());

api.get('/settings/load', try_redirect(async (req: Request, res:Response) => {}));

export default api;