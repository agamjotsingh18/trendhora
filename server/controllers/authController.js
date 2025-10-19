const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { asyncHandler } = require('../utility/asyncHandler');
const nodemailer = require("nodemailer");
const crypto = require("crypto");


exports.registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    try {
        await sendWelcomeEmail(email, username);
    } catch (err) {
        console.error("Error sending welcome email:", err.message);
        // Do not block registration if email fails
    }

    // Generate token right after registration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
});

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, // include role
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
});

exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne();
        res.json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getMe = async (req, res, next) => {
    try {
        // Get user from database using id from req.user (set by auth middleware)
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 min
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const message = `You requested a password reset. Please go to: ${resetUrl}`;

        await sendEmail({ email: user.email, subject: "Password Reset", message });

        res.json({ message: "Reset link sent to email" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Reset Password Controller
exports.resetPassword = async (req, res) => {
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
};

// checking duplicate username
exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }

    const user = await User.findOne({ username });

    res.status(200).json({
      success: true,
      exists: !!user,
    });
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({
      success: false,
      message: "Server error while checking username",
    });
  }
};

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

