function getGoogleOAuthURL() {
    const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        access_type: 'offline',
        reponse_type: 'code',
        prompt: 'consent',
        scopes: 'https://www.googleapis.com/auth/userinfo.profile',
    };
    console.log({ options });
    const qs = new URLSearchParams(options);
    return `${rootURL}?${qs.toString()}`;
}
export {};
//# sourceMappingURL=googleGetURL.mjs.map