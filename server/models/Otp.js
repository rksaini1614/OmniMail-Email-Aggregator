const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");


const otpSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            trim : true
        },
        otp : {
            type : String,
            required : true
        },
        createdAt : {
            type : Date,
            required : true,
            default : Date.now,
            expires : 5 * 60
        }
    }
);


// function to send mail
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Email Verification",
            `Your One Time Password (OTP) for creating account on OmniMail Email
            Aggregator Web Application is ${otp}.
            This OTP is valid for 5 minutes.`
        );

        console.log("Email send Successfully :",mailResponse);
    }
    catch(error){
        console.log("Erroe while sending otp : ",error.message);
        throw error;
    }
}


// pre middleware
otpSchema.pre("save",async function(next){
    console.log("New document saved to database");

    // only send email when a new document is created
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp);
    }
    next();
})


const OTP = mongoose.model("OTP",otpSchema);
module.exports = OTP;