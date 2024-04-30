import jwt from "jsonwebtoken";
import User from "../models/userschema.js";
const secretKey = process.env.KEY;

const athenticate = async (req, res, next) => {
    try {
        console.log(secretKey + "gammu ");
        console.log(req + "gammu ");
        // const token = req.cookies.bazar;
        const token = req.headers.authorization;
        // const token = localStorage.getItem("token");
        console.log(token + "gammu ");
        // console.log(req.cookies); // Logging cookies
        // console.log(req.headers); // Logging request headers
        // console.log(req.method); // Logging HTTP method (GET, POST, etc.)
        // console.log(req.url); // Logging request URL
        // console.log(req.params); // Logging URL parameters
        // console.log(req.query); // Logging query parameters
        // console.log(req.body); // Logging request body (if applicable, for POST requests)
        // console.log(req.ip); // Logging client IP address
        // console.log(req.originalUrl); // Logging original request URL
        // console.log(req.route); // Logging route details
        const verifytoken = jwt.verify(token.replace("Bearer ", ""), secretKey);
        console.log(verifytoken._id + "   verifytoken");
        const rootuser = await User.findOne({ _id: verifytoken._id })
        // console.log(rootuser);
        if (!rootuser) {
            throw new Error("user not found");
        }
        req.token = token;
        req.rootuser = rootuser;
        req.userID = rootuser._id;
        next();

    } catch (error) {
        res.status(401).send(error + "unautherized:no token provide")
        console.log(error);

    }
}


export default athenticate;