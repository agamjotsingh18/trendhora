import { useState } from 'react';
import toast from 'react-hot-toast';
import LoginCard from '../../Card/LoginCard/LoginCard';
import './Login.css';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { supabase } from '../../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
        e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, { email, password });
            localStorage.setItem('authToken', response.data.token); // Store JWT token
            
            // Clear any existing Supabase session to avoid showing a different logged-in user
            try {
              await supabase.auth.signOut();
            } catch (err) {
              // ignore
            }
            
            // Notify other tabs/components that auth changed
            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(new Event('authChange'));
            
            toast.success('Logged in successfully!');
            navigate('/account/me'); // Navigate to account page after login
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
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
            <LoginCard
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
        </form>
      </div>
    </div>
  );
};

export default Login;


