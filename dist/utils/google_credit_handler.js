var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { google } from 'googleapis';
const OAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
const cookieNames = ['access_token', 'refresh_token', 'scope', 'token_type'];
export function getGoogleOAuthURL() {
    const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: process.env.REDIRECT_URL,
        client_id: process.env.CLIENT_ID,
        access: 'type',
        prompt: 'consent',
        scopes: [
            'https://www.googleapis.com/auth/calendar'
        ].join(" "),
    };
    const queryStrings = new URLSearchParams(options);
    return `${rootURL}?${queryStrings.toString()}`;
}
export function googleOauthHandler(req, res) {
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
export default getGoogleOAuthURL;
//# sourceMappingURL=google_credit_handler.js.map