const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/Auth");
const { 
    connectGmail, gmailCallback, 
    fetchGmailInbox, addNewEmailAccount, 
    markEmailAsRead
} = require("../controllers/emailIntegrationController");



router.get("/gmail/connect", authenticate, connectGmail);
router.get("/gmail/callback", gmailCallback);
router.get("/gmail/emails", authenticate, fetchGmailInbox);
router.get("/gmail/add", authenticate, addNewEmailAccount);
router.post("/gmail/mark-read",authenticate,markEmailAsRead);

module.exports = router;
