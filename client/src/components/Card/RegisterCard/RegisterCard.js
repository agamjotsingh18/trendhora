import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterCard.css';

const RegisterCard = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, { username, email, password });
            alert('Registration successful!');
            navigate('/account/login');
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            alert(`Registration failed: ${errorMessage}`);
        }
    };

    return (
        <div className="register__card__container">
            <div className="register__card">
                <div className="register__header">
                    <h1>Create Account</h1>
                </div>
                <form onSubmit={handleRegister}>
                    <div className="register__inputs">
                        <div className="reg__input__container">
                            <label className="input__label">Username</label>
                            <input
                                type="text"
                                className="register__input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="reg__input__container">
                            <label className="input__label">Email</label>
                            <input
                                type="email"
                                className="register__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                required
                            />
                        </div>
                        <div className="reg__input__container">
                            <label className="input__label">Password</label>
                            <input
                                type="password"
                                className="register__input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="**********"
                                required
                            />
                        </div>
                        <div className="register__button__container">
                            <button type="submit" className="register__button">
                                Create Account
                            </button>
                        </div>
                    </div>
                </form>
                <div className="register__other__actions">
                    <div className="register__login__account">
                        Already have an account? <Link to="/account/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCard;
