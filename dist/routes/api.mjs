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
import * as path from 'node:path'; //  File Path module
import { try_redirect, get_result } from "../middleware/midwares.mjs";
import { GetOAuthURL, } from "./google_credit_handler.mjs";
// PATHS
const PATH_CLIENT = path.join(process.cwd(), 'src/client');
const PATH_CREDIT = path.join(PATH_CLIENT, 'client_secrets.json');
const PATH_TOKENS = path.join(PATH_CLIENT, 'token.json'); // Token is a generated id that automatically does authentication.
const PATH_SETTINGS = path.join(PATH_CLIENT, 'client_settings.json');
const PATH_DATABASE = path.join(path.dirname(process.cwd()), 'db');
const urlGoogleScope = ['https://www.googleapis.com/auth/calendar'];
const regexDateYMD = /^\d{4}-\d{2}-\d{2}$/;
const api = express.Router();
const load_stored_settings = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = req.cookies['user_settings'];
        return content;
    }
    catch (err) {
        return null;
    }
});
const save_settings = (req, newInfo) => __awaiter(void 0, void 0, void 0, function* () {
    let resultSetting = yield get_result(load_stored_settings(req));
    let payloadSettings = {
        markdown_path: '',
        web: { '--bg': '#080808', '--text': 'white' },
    };
    if (resultSetting.ok) {
        payloadSettings = resultSetting.value;
        for (const updatedKey of Object.keys(newInfo))
            payloadSettings[updatedKey] = newInfo[updatedKey];
    }
});
const load_stored_credits = (req, res, newInfo) => __awaiter(void 0, void 0, void 0, function* () {
});
const save_credits = (req) => __awaiter(void 0, void 0, void 0, function* () {
});
api.use(express.json());
api.post('/login', try_redirect(GetOAuthURL));
api.get('/settings/load', try_redirect((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('user_settings', save_settings(req, req.body));
    res.writeHead(200);
    res.send();
})));
api.post('/settings/save', try_redirect((req, res) => {
}));
export default api;
//# sourceMappingURL=api.mjs.map