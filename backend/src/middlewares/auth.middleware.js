
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token provided" });
    }

    try {
        const token = authHeader.split(" ")[1]; 
        const decoded = jwt.verify(token, process.env.JWT_CRIDTE);
        // console.log("Decoded JWT:", decoded);
        req.user = decoded;
        next(); 
    } catch (err) {
        console.log("JWT ERROR:", err.message);
        
        return res.status(401).json({ msg: "Invalid token" });
    }
};


export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ msg: "Admin access required" });
    }
   return next();
};

