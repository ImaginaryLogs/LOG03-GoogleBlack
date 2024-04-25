import dotenv from "dotenv";
import express from "express";
import * as path from 'path';
import * as proc from 'process';
import { error_handler } from './middleware/midwares.mjs';
import api_app from './routes/api.mjs';
import credit from './routes/google_credit_handler.mjs';
// Global Variables
const PATH_ROOT = path.dirname(proc.cwd());
const PATH_CLIENT = path.join(PATH_ROOT, '/client');
const PATH_CREDIT = path.join(PATH_CLIENT, 'client_secrets.json');
dotenv.config({});
const port = 8080;
const server = express();
server.use('/api', api_app);
server.use('/google', credit);
server.use('/public', express.static('public'));
server.use('/app', express.static('app'));
server.listen(port, 'localhost', () => {
    console.log(`Listening on Port ${port}\nWebsite: http://localhost:${port}/`);
});
server.use(error_handler);
//# sourceMappingURL=index.js.map