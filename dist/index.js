// import cookieParser from "cookie-parser";
// import { google } from 'googleapis';
// import { oauth2 } from "googleapis/build/src/apis/oauth2/index.js";
// import { LOG_INDEX } from './config/settings.js';
// import { errorHandler, logApp, tries } from './middleware/middleware.js';
// import api from './routes/api.js';
import dotenv from "dotenv";
import express from "express";
import * as path from 'path';
import * as proc from 'process';
// Global Variables
const PATH_ROOT = path.dirname(proc.cwd());
const PATH_CLIENT = path.join(PATH_ROOT, '/client');
const PATH_CREDIT = path.join(PATH_CLIENT, 'client_secrets.json');
dotenv.config({});
const port = 8080;
const server = express();
server.listen(port, 'localhost', () => {
    console.log(`Listening on Port ${port}\nWebsite: http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map