
const EmailAccount = require("../models/EmailAccounts");
const User = require("../models/User");
const { imageUploader } = require("../utils/imageUploader");
const deleteImage = require("../utils/deleteImage");


// get user profile
exports.getUserProfile = async(req, res) => {
    try{
        const user = req.user;

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const emails = await EmailAccount.find({ userId: user._id });
        const mainEmail = user.email?.toLowerCase().trim();

        //console.log("User Email:", user.email);
        //console.log("All Emails:", emails.map((e) => e.email));


        const otherEmails = emails
      .map((account) => account.email.toLowerCase().trim())
      .filter((email) => email !== mainEmail);

        //console.log("Other Email :",emails);
        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profile_image: user.profile_image || `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName}${user.lastName}`,
                otherEmails : otherEmails
            }
        });
    }
    catch(error){
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error" });
    }
}


// get user
exports.getUser = async (req,res) => {
    try{
        const {email} = req.query;
        //console.log(email);

        const user = await User.findOne({email:email});
        if(!user){
            return res.json(
                {
                    success : false,
                    message : "User do not exists"
                }
            );
        }

        return res.json(
            {
                success : true,
                message : "User found",
                user,
            }
        )
    }
    catch(error){
        console.log("Error in getUser Backend :",error.message);
        return res.json(
            {
                success : false,
                message : "Error while geting user"
            }
        );
    }
}


// logout user
exports.logoutUser = async(req, res) => {
    try{
        // Clear the token from cookies
        res.clearCookie("token",{
            httpOnly: true
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    }
    catch(error){
        console.error("Error logging out user:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error" });
    }
}


// update user profile
exports.updateProfileImage = async(req, res) => {
    try{
        const userId = req.user._id;
        const profileImage = req.files?.profileImage;

        const image = await imageUploader(
            profileImage, 
            process.env.FOLDER_NAME, 
            1000, 
            1000
        );

        //console.log("Image uploaded successfully:", image);

        const updatedUser = await User.findByIdAndUpdate(
            {_id : userId},
            { profile_image: image.secure_url },
            { new: true }
        );

        updatedUser.password = undefined;

        return res.status(200).json({
            success: true,
            user: updatedUser
        });
    }
    catch(error){
        console.error("Error updating user profile:", error.message);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error" });
    }
}


// delete user account
exports.deleteUserAccount = async(req, res) => {
    try{
        const userId = req.user._id;
        const deletedUser = req.user;
        if(!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Delete the user's profile image from Cloudinary if it exists
        if(deletedUser.profile_image && 
            deletedUser.profile_image.includes("res.cloudinary.com")) {
            await deleteImage(deletedUser.profile_image);
        }

        // Delete associated email accounts
        await EmailAccount.deleteMany({ user: userId });

        await User.deleteOne({ _id: userId });

        return res.status(200).json({
            success: true,
            message: "User account deleted successfully"
        });
    }
    catch(error){
        console.error("Error deleting user account:", error.message);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error" });
    }
}


// remove email from EmailAccount
exports.removeLinkedEmail = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const removed = await EmailAccount.findOneAndDelete({ userId, email });

    if (!removed) {
      return res.status(404).json({ success: false, message: "Email not found or not linked" });
    }

    return res.status(200).json({
      success: true,
      message: "Email removed successfully",
    });
  } catch (err) {
    console.error("Error removing linked email:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};