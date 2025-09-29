// src/components/Authentication/ForgotPassword/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/forgot-password`, {
                email: email.trim()
            });
            setMessage(response.data.message || 'Password reset link sent to your email!');
        } catch (error) {
            const errMsg = error.response ? error.response.data.message : error.message;
            setMessage(`Error: ${errMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-overlay">
            <div className="forgot-password-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
