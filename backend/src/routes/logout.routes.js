import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Token is required');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid or expired token');
        }
        req.user = decoded; // User data will be available in req.user
        next();
    });
};

// Logout Endpoint
router.post('/logout', verifyToken, (req, res) => {
    // Optional: Add to blacklist for more secure logout (e.g. using MongoDB or Redis)
    // Example: Blacklist the token in the DB (optional, based on your preference)

    // You can implement token blacklisting or invalidation logic here

    // Inform the client to remove the JWT token
    res.status(200).json({ message: 'Successfully logged out' });
});

export default router;