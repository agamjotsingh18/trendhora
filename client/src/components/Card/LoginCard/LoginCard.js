import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginCard.css';

const LoginCard = ({ email, password, setEmail, setPassword }) => {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, { email, password });
            localStorage.setItem('token', response.data.token); // Store JWT token
            alert('Login successful!');
            navigate('/account/me'); // Navigate to account page after login
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            alert(`Login failed: ${errorMessage}`);
        }
    };

    return (
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="login__inputs">
                        <div className="email__input__container input__container">
                            <label className="email__label input__label">Email</label>
                            <input 
                                type="email" 
                                className="email__input login__input" 
                                placeholder='example@gmail.com' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="password__input__container input__container">
                            <label className="password__label input__label">Password</label>
                            <input 
                                type="password" 
                                className="password__input login__input" 
                                placeholder='**********' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="login__button__container">
                            <button className="login__button" type="submit">LOGIN</button>
                        </div>
                    </div>
                </form>
                <div className="login__other__actions">
                    <div className="login__forgot__password">Forgot password?</div>
                    <div className="login__new__account">Don't have account? <Link to="/account/register">Create account</Link> </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCard;
