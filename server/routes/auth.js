const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const User = require('../models/User'); // adjust path if needed
const authMiddleware = require('../middlewares/authMiddleware');
const { registerUser, loginUser, deleteUser, getMe } = require('../controllers/authController');
const { forgotPassword, resetPassword, checkUsername} = require("../controllers/authController");

// ======================
// Email transporter
// ======================
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// ======================
// Auth Routes
// ======================
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete', authMiddleware, deleteUser);
router.get('/me', authMiddleware, getMe);
router.get("/check-username", checkUsername);
// Forgot password - send reset link
router.post("/forgot-password", forgotPassword);

// Reset password - verify token and update password
router.post("/reset-password/:authToken", resetPassword);

module.exports = router;
