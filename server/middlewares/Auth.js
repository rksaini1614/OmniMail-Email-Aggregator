const jwt = require("jsonwebtoken");
const User = require("../models/User");


// Middleware to authenticate user using JWT
exports.authenticate = async(req, res, next) => {

        // get auth header
        const authHeader = req.headers["authorization"];

        // console.log("req.cookies:", req.cookies);
        // console.log("req.body.token:", req.body?.token);
        // console.log("Authorization header:", authHeader);
        
        // get jwt token
        let token = null;

        if (req.cookies?.token) {
            token = req.cookies.token;
        } else if (req.body?.token) {
            token = req.body.token;
        } else if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
            token = authHeader.replace("Bearer ", "").trim();
        }
        //console.log("Token received: ", token);
        if(!token) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Authentication failed, token not found"
                }
            );
        }
        // verify token
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            console.log("Decoded token: ", decoded);
            const user = await User.findById(decoded.id);
            if(!user) {
                return res.status(401).json(
                    {
                        success: false,
                        message: "User not found"
                    }
                );
            }

            req.user = user;
            //req.token = token;
            console.log("Authenticated user: ", req.user);
            next();
        }
        catch(err){
            return res.status(401).json(
                {
                    success: false,
                    message: "Authentication failed, invalid token"
                }
            );
        }

    
}