const jwt = require('jsonwebtoken');
const extractToken = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    return authHeader.split(' ')[1];
};
const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        const token = extractToken(authHeader);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({ message: 'Internal Server Error: JWT secret missing' });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // attach decoded user info (id, role, etc.) to request

        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        } else {
            return res.status(401).json({ message: 'Unauthorized: Token verification failed' });
        }
    }
};

module.exports = verifyJWT;
