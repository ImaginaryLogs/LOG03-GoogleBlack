
// import cookieParser from "cookie-parser";
import { google } from 'googleapis';
import { oauth2 } from "googleapis/build/src/apis/oauth2/index.js";

import style from 'ansi-styles';
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import * as path from 'path';
import * as proc from 'process';
import { error_handler, log_actions, try_log, try_redirect } from './middleware/midwares.mjs';
import api_app from './routes/api.mjs';
import credit from './routes/google_credit_handler.mjs';

// Global Variables
const PATH_ROOT		: string = proc.cwd();
const PATH_CLIENT	: string = path.join(PATH_ROOT, '/client')
const PATH_CREDIT	: string = path.join(PATH_CLIENT, 'client_secrets.json');

dotenv.config({});
const port: number = Number(proc.env.PORT) || 8080;
const server: Express = express();
const isEnvPropertyBoolTrue = (variable: string | undefined) => {
	return variable=== undefined ? style.yellow.open : (variable == 'y' ? style.green.open : style.red.open)
}

console.log(path.join(PATH_ROOT, '/public'));

server.get('/', (request: Request, response: Response) => {
	response.sendFile('index.html', { root: path.join(PATH_ROOT, 'public//pages//') });
	log_actions(request, response, {mes: `${path.join(PATH_ROOT, 'public//pages//')}`});
});

server.use(try_log);	

server.use('/api', api_app);

server.use('/google', credit);

server.use('/app', express.static('/app'));

server.use('/public', express.static(path.join(PATH_ROOT, '/public')));

server.listen(port, 'localhost', () => {
	console.log(`Listening on Port ${port}!`);
	console.log(`Website: http://localhost:${port}/`);
	console.log(`Settings:
	 - process.env.LOG_MID ${isEnvPropertyBoolTrue(proc.env.LOG_MID)}${proc.env.LOG_MID} ${style.color.close}
	 - process.env.LOG_ERR ${isEnvPropertyBoolTrue(proc.env.LOG_ERR)}${proc.env.LOG_ERR} ${style.color.close}
	`)
});



server.use(error_handler);