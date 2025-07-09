const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticator, totp} = require("otplib");
const OTP = require("../models/Otp")


// signup
exports.signup = async(req,res) => {
    try{
        const { firstName, lastName, email, password,confirmPassword,otp } = req.body;

        // Validate input
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json(
                {
                     message: "All fields are required"

                }
            );
        }

        // Check if passwords match
        if (password !== confirmPassword) { 
            return res.status(400).json(
                { 
                    message: "Passwords do not match" 
                }
            );
        }

        if( password.length < 6 ){
            return res.status(400).json(
                {
                    message: "Password must be at least 6 characters long"
                }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json(
                {
                    success: false,
                    message : "User already exists"
                }
            );
        }

        const recentOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);
        //console.log("Recent otp : ",recentOtp);

        // validate otp
        if(recentOtp.length === 0){
            return res.status(400).json(
                {
                    success : false,
                    message : "OTP Not Found"
                }
            );
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(401).json(
                {
                    success : false,
                    message : "Invalid OTP"
                }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user in database
        const newUser = await User.create(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                profile_image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
            }
        );

        // return the respone
        return res.status(200).json(
            {
                success : true,
                message : "User created successfully",
                user : newUser
            }
        )

    }
    catch(error){
        console.log("Error in signup:", error.message);
        return res.status(500).json(
            {
                success: false,
                message: "Internal server error, please try again later."
            }
        );
    }
}


// login
exports.login = async(req,res) => {
    try{
        const {email,password} = req.body;
        //console.log("Email ans password : ",email,password);

        // validation
        if(!email || !password){
            return res.status(400).json(
                {
                    success : false,
                    message : "Email and password are required"
                }
            );
        }

        // check if user exists
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json(
                {
                    success : false,
                    message : "User does not exist, please signup"
                }
            )
        }

        // check if password is correct or not
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.json(
                {
                    success : false,
                    message : "Invalid password"
                }
            );
        }

        // create a jwt token
        const payload = {
            email : user.email,
            id : user._id
        }

        let token = jwt.sign(payload,process.env.JWT_SECRET,
            {
                expiresIn: '1h' // Token will expire in 1 hour
            }
        )

        user.token = token; // Store the token in the user object
        await user.save(); // Save the user object with the token

        const userData = user.toObject();
        //console.log("User data before sending response: ", userData);
        //userData.token = token;
        userData.password = undefined; // Remove password from the response

        const options ={
            httpOnly: true,
            expires : new Date(Date.now() + 3*24*60*60*1000),
            secure : true,
        }

        return res.cookie("token",token,options).status(200).json(
            {
                success : true,
                message : "User logged in successfully",
                user : userData,
                token: token
            }
         )
    }
    catch(error){
        console.log("Error in login:", error.message);
        return res.status(500).json(
            {
                success: false,
                message: "Internal server error, please try again later."
            }
        );
    }
}


// sendOtp function
exports.sendOtp = async(req,res) => {
    try{

        // fetch email from request body
        const {email} = req.body;

        // if user already exists or not
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(409).json(
                {
                    success : false,
                    message  : "User already registered"
                }
            );
        }

        const secret = authenticator.generateSecret();
        const otp = totp.generate(secret);
        //console.log("Generated OTP: ", otp);

        const otpPayload = {email,otp};

        // create entry in otp db
        const otpBody = await OTP.create(otpPayload);
        //console.log("Otp entry in db : ",otpBody);

        return res.status(200).json(
            {
                success : true,
                message : "Otp generated successfully",
                otp : otp,
            }
        )
    }
    catch(error){
        console.log("Error in  otp generation : ",error.message);
        return res.status(500).json(
            {
                success : false,
                message : "Error in generating OTP"
            }
        );
    }
}