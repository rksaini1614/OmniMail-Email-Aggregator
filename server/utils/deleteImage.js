const cloudinary = require('cloudinary').v2;



// public id extraction function
const extractPublicId = (secureUrl) => {
    const urlParts = secureUrl.split("/");
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = publicIdWithExtension.split(".")[0];
    return publicId;
};

// function to delete image from Cloudinary
const deleteImage = async(secureUrl) => {
    const publicId = extractPublicId(secureUrl);
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        //console.log("Image deleted successfully:", result);
        return result;
    } catch (error) {
        console.error("Error deleting image:", error);
        throw new Error("Failed to delete image");
    }
}

module.exports = deleteImage;
