const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { asyncHandler } = require('../utility/asyncHandler');
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// ---------------- Register User ----------------
exports.registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ username, email, password });
        await user.save();

        // Generate token right after registration
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        // Check for duplicate key error (MongoDB code 11000)
        if (err.code === 11000) {
            if (err.keyPattern && err.keyPattern.username) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            if (err.keyPattern && err.keyPattern.email) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }
        console.error("Registration error:", err);
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
});

// ---------------- Login User ----------------
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
});

// ---------------- Delete User ----------------
exports.deleteUser = asyncHandler(async (req, res) => {
    try {
        await req.user.deleteOne();
        res.json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ---------------- Get Logged-in User ----------------
exports.getMe = asyncHandler(async (req, res, next) => {
    try {
        // 🎯 FIX: Directly use the user object attached by the authMiddleware.
        // authMiddleware already fetched the user based on the valid JWT token ID.
        const user = req.user; 

        // The previous line was: const user = await User.findById(req.user.id);

        if (!user) {
            // This should not happen if authMiddleware succeeds, but is a safe check.
            return res.status(404).json({ message: 'User data not found in request' });
        }

        res.status(200).json({
            success: true,
            data: user // This is the correct, authenticated user's data
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ---------------- Forgot Password ----------------
exports.forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const message = `You requested a password reset. Please go to: ${resetUrl}`;

        await sendEmail({ email: user.email, subject: "Password Reset", message });

        res.json({ message: "Reset link sent to email" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// ---------------- Reset Password ----------------
exports.resetPassword = asyncHandler(async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ---------------- Send Email Utility ----------------
const sendEmail = async ({ email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    await transporter.sendMail({
        from: `"Trendhora" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        text: message,
    });
};
