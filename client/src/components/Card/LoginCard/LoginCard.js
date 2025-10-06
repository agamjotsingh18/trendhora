import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ForgotPassword from "../../Authentication/ForgotPassword/ForgotPassword";


// 🎯 REMOVE 'onSubmit' from the prop list
const LoginCard = ({ email, password, setEmail, setPassword }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login__card__container">
            <div className="login__card">
                {/* 🎯 FIX: Changed the div back to a clean div. The parent <form> will catch the submit event from the button below. */}
                <div> 
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
                            <div className="password__input__wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="password__input login__input"
                                    placeholder='**********'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="password__toggle__icon"
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </span>
                            </div>
                        </div>
                        <div className="login__button__container">
                            {/* This button has type="submit" and triggers the parent form */}
                            <button className="login__button" type="submit">LOGIN</button>
                        </div>
                    </div>
                </div> 
                <div className="login__other__actions">
                    <div
                        className="login__forgot__password"
                        onClick={() => setShowForgot(true)}
                    >
                        Forgot password?
                    </div>

                    <div className="login__new__account">Don't have account? <Link to="/account/register">Create account</Link> </div>
                </div>
            </div>
            {showForgot && <ForgotPassword onClose={() => setShowForgot(false)} />}
        </div>
    );
};

export default LoginCard;