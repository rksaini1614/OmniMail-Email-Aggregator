
const {google} = require("googleapis");



const getGmailClient = ({accessToken, refreshToken}) => {

    if (!accessToken || !refreshToken) {
        throw new Error("Access token and refresh token are required to create Gmail client");
    }

    //console.log("Access Token:", accessToken);
    //console.log("Refresh Token:", refreshToken);

    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET,
        process.env.GMAIL_REDIRECT_URI
    );

    // Set the credentials for the OAuth2 client
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });

    // Return the Gmail API client
    return google.gmail({ version: "v1", auth: oauth2Client });
}

module.exports = getGmailClient;