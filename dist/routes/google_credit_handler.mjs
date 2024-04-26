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
import { google } from 'googleapis';
import { try_redirect } from "../middleware/midwares.mjs";
// OAuth Authentication Software
const OAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
const scopes = ['https://www.googleapis.com/auth/calendar'];
const cookieNames = ['access_token', 'refresh_token', 'scope', 'token_type'];
const credit_router = express.Router();
/**
 *
 * @param req Request Incoming data
 * @param res Outgoing response
 * @param next Next part of the script
 */
function GetOAuthURL(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = OAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes,
        });
        response.redirect(url);
    });
}
/**
 * Sets the cookies from the google redirect to localstorage cookies.
 * @param req Requested incoming data
 * @param res Outgoing response
 */
function OAuthRedirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.query.code;
        const { tokens } = yield OAuth2Client.getToken(code);
        OAuth2Client.setCredentials(tokens);
        const access_token = tokens.access_token;
        const refresh_token = tokens.refresh_token;
        const default_cookie_options = { maxAge: tokens.expiry_date, httpOnly: true };
        for (const cookie_name of cookieNames) {
            res.cookie(cookie_name, { tokens }[cookie_name], default_cookie_options);
        }
        res.writeHead(200);
        res.write("Logged In!" + JSON.stringify(OAuth2Client));
        res.end();
    });
}
/**
 *
 * @param req Incoming Request
 * @returns Cookies from the browswer
 */
export function GetOAuthCookies(req) {
    // Credentials to send
    var credentials = {};
    // Get the credits and and assign it 
    for (const cookieName of cookieNames)
        credentials[cookieName] = req.cookies[cookieName];
    return credentials;
}
/**
 * Reads any of local storage's cookies.
 * @param req Requested incoming data
 * @param res Outgoing response
 */
function ReadOAuthCookies(req, res) {
    console.log(OAuth2Client);
    // Credentials to send
    var credentials = GetOAuthCookies(req);
    console.log(credentials);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write("Sending " + JSON.stringify(credentials));
    res.end();
}
credit_router.use('/login', try_redirect(GetOAuthURL));
credit_router.use('/credit_read', try_redirect(ReadOAuthCookies));
credit_router.use('/redirect', try_redirect(OAuthRedirect));
export default credit_router;
//# sourceMappingURL=google_credit_handler.mjs.map