import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import { access } from "fs";
import { google } from 'googleapis';
import { oauth2 } from "googleapis/build/src/apis/oauth2/index.js";
import { error_handler, try_redirect } from "../middleware/midwares.mjs";

// OAuth Authentication Software
export const OAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID, 
    process.env.CLIENT_SECRET, 
    process.env.REDIRECT_URL
)

const scopes = ['https://www.googleapis.com/auth/calendar']
const cookieNames = [ 'access_token', 'refresh_token', 'scope', 'token_type']

const credit_router = express.Router();

/**
 * 
 * @param req Request Incoming data
 * @param res Outgoing response
 * @param next Next part of the script
 */
export async function GetOAuthURL(request: Request, response: Response, next: NextFunction){
    const url = OAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        prompt: "consent",
        response_type: "code"
    })
    response.redirect(url);
}

/**
 * Sets the cookies from the google redirect to localstorage cookies.
 * @param req Requested incoming data
 * @param res Outgoing response
 */
async function OAuthRedirect(req: Request, res: Response){
    const code = req.query.code as string;

    const { tokens } = await OAuth2Client.getToken(code);
    OAuth2Client.setCredentials(tokens);

    const access_token = tokens.access_token as string;
    const refresh_token = tokens.refresh_token as string;

    const default_cookie_options = { maxAge: tokens.expiry_date as number, httpOnly: true}
    for (const cookie_name of cookieNames){
        res.cookie(cookie_name, {tokens}[cookie_name] as string, default_cookie_options)
    }
    res.writeHead(200);
    res.write("Logged In!" + JSON.stringify(OAuth2Client));
    res.end();
}

/**
 * 
 * @param req Incoming Request
 * @returns Cookies from the browswer
 */
export function GetOAuthCookies(req: Request): {[key: string]: any} {
    // Credentials to send
	var credentials: {[key: string]: any} = {}
	
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
function ReadOAuthCookies(req: Request, res: Response){

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