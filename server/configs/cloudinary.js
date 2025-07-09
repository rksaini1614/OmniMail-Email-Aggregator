const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET
        });
        console.log("Cloudinary connected successfully");
    }
    catch(error){
        console.error("Error connecting to Cloudinary:", error.message);
    }
}