const express = require("express");
const router = express.Router();
const {login,signup,sendOtp} = require("../controllers/AuthController");
const {authenticate} = require("../middlewares/Auth");
const {
    getUserProfile,logoutUser,
    updateProfileImage, deleteUserAccount, 
    getUser,
    removeLinkedEmail
} = require("../controllers/userControllers");


router.post("/login",login);
router.post("/signup",signup);
router.post("/sendOtp",sendOtp);

// protected routes
router.get("/profile",authenticate, getUserProfile);
router.post("/logout",authenticate, logoutUser);
router.put("/updateProfileImage",authenticate, updateProfileImage);
router.delete("/deleteAccount", authenticate,deleteUserAccount)
router.get("/getUser",getUser);
router.delete("/remove-email", authenticate, removeLinkedEmail);

module.exports = router;