const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User'); // adjust path if needed
const authMiddleware = require('../middlewares/authMiddleware');
const { registerUser, loginUser, deleteUser, getMe } = require('../controllers/authController');

// ======================
// Email transporter
// ======================
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use app password for Gmail
    }
});

// ======================
// Auth Routes
// ======================
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete', authMiddleware, deleteUser);
<<<<<<< HEAD

// router.get('/me', getMe);
=======
router.get('/me', getMe);
>>>>>>> 202109b (Backend changes for forgot password)

// ======================
// Forgot Password Route
// ======================
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate reset token
        const resetToken = user.generatePasswordReset();
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const message = `<h3>Password reset requested</h3>
                         <p>Click the link below to reset your password:</p>
                         <a href="${resetUrl}">${resetUrl}</a>
                         <p>This link will expire in 1 hour.</p>`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            html: message
        });

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ======================
// Reset Password Route
// ======================
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
