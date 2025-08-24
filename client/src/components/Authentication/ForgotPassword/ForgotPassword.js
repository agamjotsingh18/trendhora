import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="forgot-overlay" onClick={onClose}>
            <div className="forgot-card" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 style={{ color: "#FFE26E" }}>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Send Reset Link</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
