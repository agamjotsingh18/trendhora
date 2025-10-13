// File: authMiddleware.js (REVISED)

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // 🎯 CRITICAL: Keep User model import

const authMiddleware = async (req, res, next) => {
    // Uses the clearer logic from the verifyJWT function
    const authHeader = req.header('Authorization'); // req.header is equivalent to req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 🎯 CRITICAL: This database step ensures the user is active and prevents caching issues.
        req.user = await User.findById(decoded.id)
            .select('-password')
            .lean() // Keep .lean() for robust caching prevention
            .exec(); 

        if (!req.user) {
            return res.status(401).json({ message: 'User not found for token ID' });
        }

        next();
    } catch (err) {
        // console.error('JWT verification error:', err); // Optional logging
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;