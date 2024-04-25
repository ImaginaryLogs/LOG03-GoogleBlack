function getGoogleOAuthURL() {
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
export default getGoogleOAuthURL;
//# sourceMappingURL=get_google_url.js.map