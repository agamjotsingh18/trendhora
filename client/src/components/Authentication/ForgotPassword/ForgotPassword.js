import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Forgot Password clicked with email:", email);

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/auth/forgot-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();
            console.log("Backend response:", data);

            if (!response.ok) {
                setMessage(data.message || "Something went wrong");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="forgot-overlay" onClick={onClose}>
            <div className="forgot-card" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    ×
                </button>
                <h2 style={{ color: "#FFE26E" }}>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
