import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterCard.css';
import { supabase } from '../../../lib/supabase';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const RegisterCard = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
        { username, email, password }
      );
      
      // Store JWT token
      localStorage.setItem('token', res.data.token);
      window.dispatchEvent(new Event('storage'));

      alert('Registration successful! Logged in.');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data.message || error.message;
      alert(`Registration failed: ${errorMessage}`);
    }
  };



  const handleOAuthRegister = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });

    if (error) {
      console.error('OAuth error:', error.message);
      alert('OAuth sign-in failed');
    }
  };

  return (
    <div className="register__card__container">
      <div className="register__card">

        <div className="oauth__icon__row">
          <button className="oauth-icon-btn" onClick={() => handleOAuthRegister('google')}>
            <FcGoogle size={28} />
          </button>
          <button className="oauth-icon-btn" onClick={() => handleOAuthRegister('github')}>
            <FaGithub size={28} />
          </button>
        </div>

        <div className="oauth__divider">
          <span>---------------- OR ----------------</span>
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




