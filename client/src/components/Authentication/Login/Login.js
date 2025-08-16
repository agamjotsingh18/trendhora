import { useState } from 'react';
import LoginCard from '../../Card/LoginCard/LoginCard';
import './Login.css';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { supabase } from '../../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('OAuth login error:', error.message);
      alert('OAuth login failed');
    }
  };

  return (
    <div className="login__auth__container">
      <div className="login__auth">

        {/* OAuth icons row */}
        {/* <img
        src="/bg.png"
        alt="Website Logo"
        className="navbrand__logo"
      /> */}
        <div className="oauth__icon__row">
          <button className="oauth-icon-btn" onClick={() => handleOAuthLogin('google')}>
            <FcGoogle size={30} />
          </button>
          <button className="oauth-icon-btn" onClick={() => handleOAuthLogin('github')}>
            <FaGithub size={30} />
          </button>
        </div>

        <div className="oauth__divider">
          <span>--------------- OR ---------------</span>
        </div>

        {/* Email/password form */}
        <form onSubmit={handleLogin}>
          <div className="input__container">
            <label className="input__label">Email</label>
            <input
              type="email"
              className="login__input"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input__container password__container">
            <label className="input__label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="login__input"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="login__button__container">
            <button type="submit" className="login__button">LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
