import dotenv from "dotenv";
import express from "express";
import * as path from 'path';
import * as proc from 'process';
import { error_handler, log_actions, try_log } from './middleware/midwares.mjs';
import api_app from './routes/api.mjs';
import credit from './routes/google_credit_handler.mjs';
// Global Variables
const PATH_ROOT = proc.cwd();
const PATH_CLIENT = path.join(PATH_ROOT, '/client');
const PATH_CREDIT = path.join(PATH_CLIENT, 'client_secrets.json');
dotenv.config({});
const port = Number(proc.env.PORT) || 8080;
const server = express();
console.log(path.join(PATH_ROOT, '/public'));
server.get('/', (request, response) => {
    response.sendFile('index.html', { root: path.join(PATH_ROOT, 'public//pages//') });
    log_actions(request, response, { mes: `${path.join(PATH_ROOT, 'public//pages//')}` });
});
server.use(try_log);
server.use('/api', api_app);
server.use('/google', credit);
server.use('/app', express.static('/app'));
server.use('/public', express.static(path.join(PATH_ROOT, '/public')));
server.listen(port, 'localhost', () => {
    console.log(`Listening on Port ${port}\nWebsite: http://localhost:${port}/`);
});
server.use(error_handler);
//# sourceMappingURL=index.mjs.map