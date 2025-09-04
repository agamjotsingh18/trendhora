import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './ResetPassword.css';

export default function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();
            setMessage(data.message);
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="reset-container">
            <div className="reset-card">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
                {message && <p className={message.includes("success") ? "success" : "error"}>{message}</p>}
            </div>
        </div>
    );
}
