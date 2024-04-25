var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import * as fsp from 'fs/promises'; //  File system module
import * as path from 'node:path'; //  File Path module
// PATHS
const PATH_CLIENT = path.join(process.cwd(), 'src/client');
const PATH_CREDIT = path.join(PATH_CLIENT, 'client_secrets.json');
const PATH_TOKENS = path.join(PATH_CLIENT, 'token.json'); // Token is a generated id that automatically does authentication.
const PATH_SETTINGS = path.join(PATH_CLIENT, 'client_settings.json');
const PATH_DATABASE = path.join(path.dirname(process.cwd()), 'db');
const urlGoogleScope = ['https://www.googleapis.com/auth/calendar'];
const regexDateYMD = /^\d{4}-\d{2}-\d{2}$/;
const api = express.Router();
const load_stored_settings = () => __awaiter(void 0, void 0, void 0, function* () {
    let content = yield fsp.readFile(PATH_SETTINGS);
    let data = JSON.parse(content.toString());
    return new Promise((resolve, reject) => {
        resolve(data);
    });
});
const save_settings = (new_information) => __awaiter(void 0, void 0, void 0, function* () {
    let current_settings = {};
    current_settings = yield load_stored_settings();
});
api.use(express.json());
//api.use(error_handler);
module.exports = api;
export default api;
//# sourceMappingURL=api.js.map