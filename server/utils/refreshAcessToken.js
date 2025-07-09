const { google } = require("googleapis");


// function to refresh access token 
const refreshAccessToken = async (emailAccount) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: emailAccount.refreshToken,
  });

  try {
    const { credentials } = await oauth2Client.refreshAccessToken(); // DEPRECATED
    // Use the new method:
    // const { token } = await oauth2Client.getAccessToken();

    //another way to get the access token
    const newAccessToken = (await oauth2Client.getAccessToken()).token;

    // Update DB
    emailAccount.accessToken = newAccessToken;
    emailAccount.tokenExpiry = Date.now() + 3600 * 1000; // 1 hour from now
    await emailAccount.save();

    //console.log(`Refreshed access token for ${emailAccount.email}`);
    return newAccessToken;
  } 
  catch (error) {
    //console.error(`Failed to refresh token for ${emailAccount.email}:`, error.message);
    return null;
  }
};
module.exports = refreshAccessToken;