const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.Auth = async (req, res, next) => {

    // console.log("Inside Auth");

    try {

        // console.log("Inside Auth1");
        // console.log("token:", req.header("Authorization"));
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");
        console.log("Inside Auth2");
        console.log("Token:", token)

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }
        console.log("Inside Auth3");


        try {
            // Verifying the JWT 
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            // Storing the decoded JWT payload in the request object for further use
            req.user = decode;
        } catch (error) {
            return res
                .status(401)
                .json({ success: false, message: "token is invalid" });
        }
        console.log("Inside auth 4")

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something wen wrong while authenticating user"
        })

    }


}
