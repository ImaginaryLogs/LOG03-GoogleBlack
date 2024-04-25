
// import cookieParser from "cookie-parser";
import { google } from 'googleapis';
import { oauth2 } from "googleapis/build/src/apis/oauth2/index.js";

import style from 'ansi-styles';
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import * as path from 'path';
import * as proc from 'process';
import { error_handler, log_actions, try_redirect, try_log } from './middleware/midwares.mjs';
import api_app from './routes/api.mjs';
import credit from './routes/google_credit_handler.mjs';

// Global Variables
const PATH_ROOT		: string = proc.cwd();
const PATH_CLIENT	: string = path.join(PATH_ROOT, '/client')
const PATH_CREDIT	: string = path.join(PATH_CLIENT, 'client_secrets.json');


dotenv.config({});
const port: number = 8080;
const server: Express = express();

server.get('/', (request: Request, response: Response) => {
	response.sendFile('index.html', { root: path.join(PATH_ROOT, 'public//pages//') });
	log_actions(request, response, {mes: `${path.join(PATH_ROOT, 'public//pages//')}`});
});

server.use('/api', api_app);

server.use('/google', credit);

server.use(express.static(__dirname + '/public'));

server.use('/app', express.static(__dirname + '/app'));

server.listen(port, 'localhost', () => {
	console.log(`Listening on Port ${port}\nWebsite: http://localhost:${port}/`);
});


server.use(try_log)
server.use(error_handler);