const { google } = require("googleapis");
const EmailAccount = require("../models/EmailAccounts");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const getGmailClient = require("../utils/getGmailClient");
const refreshAccessToken = require("../utils/refreshAcessToken");
dotenv.config(); 


// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

const clientRedirect = process.env.CLIENT_URL;

// connect gmail
exports.connectGmail = async (req, res) => {
  try {
    const userId = req.user._id.toString(); 
    //console.log("Connect Gmail Hit for User ID:", userId);

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://mail.google.com/",
      ],
      prompt: "consent",
      state: userId,
    });

    //console.log("Generated Auth URL:", authUrl);

    return res.redirect(authUrl);
  } catch (error) {
    console.error("Error in Gmail Connect:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to initiate Gmail OAuth flow",
    });
  }
};


// callback for Gmail OAuth
exports.gmailCallback = async (req, res) => {
  // console.log("Request:", req);
  // console.log("Query Params:", req.query);
  // console.log("Gmail Callback Hit");
  // console.log("Code:", req.query.code);
  // console.log("State:", req.query.state);

  const code = req.query.code;
  const userId = req.query.state;

  if (!code || !userId) {
    return res.status(400).send("Missing auth code in callback");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    //console.log("Tokens received:", tokens);

    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const profile = await gmail.users.getProfile({ userId: "me" });
    //console.log("Gmail profile:", profile.data);

    // Check if the user already has a Gmail account linked
    const existing = await EmailAccount.findOne({ email: profile.data.emailAddress });

    if (existing) {
      existing.accessToken = tokens.access_token;
      existing.tokenExpiry = tokens.expiry_date;
      if (tokens.refresh_token) existing.refreshToken = tokens.refresh_token;
      await existing.save();

      return res.redirect(`${clientRedirect}/dashboard?linked=true`);

    }

    const emailAccount = await EmailAccount.create({
      userId: new mongoose.Types.ObjectId(userId),
      provider: "gmail",
      email: profile.data.emailAddress,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      tokenExpiry: tokens.expiry_date,
    });

   


    return res.redirect(`${clientRedirect}/dashboard?linked=new`);

  } catch (err) {
    console.error("OAuth Callback Error:", err.message);
    return res.status(500).send("Something went wrong in the Gmail callback.");
  }
};


// Get email list from gmail
exports.fetchGmailInbox = async (req, res) => {
  try {
    const userId = req.user._id;
    const pageToken = req.query.pageToken || null;
    const emailAccounts = await EmailAccount.find({ userId, provider: "gmail" });
    if (!emailAccounts || emailAccounts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Gmail accounts linked to this user",
      });
    }

    const allMessages = [];
    let nextPageToken = null;

    for (const emailAccount of emailAccounts) {
      if (emailAccount.tokenExpiry < Date.now()) {
        const newToken = await refreshAccessToken(emailAccount);
        if (!newToken) continue;
      }

      const gmail = getGmailClient({
        accessToken: emailAccount.accessToken,
        refreshToken: emailAccount.refreshToken,
      });

      const { data } = await gmail.users.messages.list({
        userId: "me",
        q: "is:unread",
        maxResults: 20,
        pageToken: pageToken || undefined
      });

      nextPageToken = data.nextPageToken || null;

      if (!data.messages) continue;

      for (const msg of data.messages) {
        const fullMsg = await gmail.users.messages.get({ userId: "me", id: msg.id });

        const headers = fullMsg.data.payload.headers;
        const getHeader = (name) => headers.find(h => h.name === name)?.value;

        const getBody = (payload) => {
          if (!payload) return "";
          if (payload.body?.data) {
            return Buffer.from(payload.body.data, "base64").toString("utf-8");
          }
          if (payload.parts) {
            for (const part of payload.parts) {
              if (part.mimeType === "text/html" && part.body?.data) {
                return Buffer.from(part.body.data, "base64").toString("utf-8");
              }
            }
            for (const part of payload.parts) {
              if (part.mimeType === "text/plain" && part.body?.data) {
                return Buffer.from(part.body.data, "base64").toString("utf-8");
              }
            }
          }
          return "";
        };

        const body = getBody(fullMsg.data.payload);

        allMessages.push({
          email: emailAccount.email,
          id: fullMsg.data.id,
          threadId: fullMsg.data.threadId,
          snippet: fullMsg.data.snippet,
          subject: getHeader("Subject"),
          from: getHeader("From"),
          date: getHeader("Date"),
          internalDate: fullMsg.data.internalDate,
          body: body,
        });
      }
    }

    allMessages.sort((a, b) => b.internalDate - a.internalDate);

    return res.status(200).json({
      success: true,
      messages: allMessages,
      nextPageToken: nextPageToken,
      message: "Fetched inboxes from all linked Gmail accounts",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Gmail inbox",
    });
  }
};


// add new email account
exports.addNewEmailAccount = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    //console.log("Initiating Add Email Flow for:", userId);

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://mail.google.com/",
      ],
      prompt: "consent",
      state: userId,
    });

    return res.status(200).json({
      success: true,
      url: authUrl,
      message: "Authorization URL generated successfully"
    });
  } catch (error) {
    console.error("Error generating Gmail auth URL:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to generate Gmail OAuth URL"
    });
  }
};


// mark email as read
exports.markEmailAsRead = async (req, res) => {
  try {
    const { messageId, email } = req.body;
    const userId = req.user._id;

    const emailAccount = await EmailAccount.findOne({ userId, email, provider: "gmail" });

    if (!emailAccount) {
      return res.status(404).json({ success: false, message: "Email account not found" });
    }

    // Refresh token if needed
    if (emailAccount.tokenExpiry < Date.now()) {
      const newToken = await refreshAccessToken(emailAccount);
      if (!newToken) return res.status(500).json({ success: false, message: "Failed to refresh token" });
    }

    const gmail = getGmailClient({
      accessToken: emailAccount.accessToken,
      refreshToken: emailAccount.refreshToken,
    });

    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      requestBody: {
        removeLabelIds: ["UNREAD"],
      },
    });

    return res.status(200).json({ success: true, message: "Marked as read" });
  } catch (err) {
    console.error("Mark as read error:", err.message);
    return res.status(500).json({ success: false, message: "Error marking as read" });
  }
};
