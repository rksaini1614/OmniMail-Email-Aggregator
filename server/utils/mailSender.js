const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();


// function to send mail 
const mailSender = async(email,title,body) => {
    try{

        let transporter = nodemailer.createTransport(
            {
                port: 465,
                host : process.env.MAIL_HOST,
                auth : {
                    user : process.env.MAIL_USER,
                    pass : process.env.MAIL_PASSWORD
                },
                secure: true,
            }
        );

        let info = await transporter.sendMail(
            {
                from : "OmniMail Email Aggregator",
                to : `${email}`,
                subject : `${title}`,
                html : `${body}`
            }
        )

        //console.log("Info : ",info);
        return info;
    }
    catch(error) {
        console.log(error.message);
        return error.message;
    }
}

module.exports = mailSender;