const cloudinary = require("cloudinary").v2;



exports.imageUploader = async (file,folder,height,quality) =>{
    try{
        const options = {folder};
        if(height) options.height = height;
        if(quality) options.quality = quality;
        options.resource_type = "image";

        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    }
    catch(error){
        console.error("Error uploading image:", error.message);
        throw new Error("Image upload failed");
    }
}