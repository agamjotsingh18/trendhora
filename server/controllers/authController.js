const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utility/asyncHandler");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

// ------------------------ USER REGISTRATION ------------------------
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await new User({ username, email, password }).save();

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, username).catch((err) =>
      console.error("Error sending welcome email:", err.message)
    );

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    // Check for duplicate key error (MongoDB code 11000)
    if (err.code === 11000) {
      if (err.keyPattern && err.keyPattern.username) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (err.keyPattern && err.keyPattern.email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// ------------------------ USER LOGIN ------------------------
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// ------------------------ DELETE USER ------------------------
exports.deleteUser = asyncHandler(async (req, res) => {
  await req.user.deleteOne();
  res.json({ message: "Account deleted successfully" });
});

// ------------------------ GET CURRENT USER ------------------------
exports.getMe = asyncHandler(async (req, res) => {
  const user = req.user; // Using authMiddleware attached user
  if (!user) {
    return res.status(404).json({ message: "User data not found in request" });
  }
  res.status(200).json({ success: true, data: user });
});

// ------------------------ FORGOT PASSWORD ------------------------
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const message = `You requested a password reset. Please go to: ${resetUrl}`;

  await sendEmail({ email: user.email, subject: "Password Reset", message });
  res.json({ message: "Reset link sent to email" });
});

// ------------------------ RESET PASSWORD ------------------------
exports.resetPassword = asyncHandler(async (req, res) => {
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
});

// ------------------------ CHECK DUPLICATE USERNAME ------------------------
exports.checkUsername = asyncHandler(async (req, res) => {
  const { username } = req.query;
  if (!username)
    return res.status(400).json({ success: false, message: "Username is required" });

  const exists = !!(await User.findOne({ username }));
  res.status(200).json({ success: true, exists });
});

// ------------------------ EMAIL UTILITIES ------------------------
const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  await transporter.sendMail({
    from: `"Trendhora" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    text: message,
  });
};

const sendWelcomeEmail = async (email, username) => {
  const message = `Welcome to Trendhora, ${username}! We're excited to have you.`;
  await sendEmail({ email, subject: "Welcome to Trendhora!", message });
};
