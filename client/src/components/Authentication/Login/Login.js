import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LoginCard from '../../Card/LoginCard/LoginCard';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      navigate('/'); // Redirect to home or dashboard
    } catch (error) {
      alert(
        `Login failed: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
    <div className="login__auth__container">
      <div className="login__auth">
        <form onSubmit={handleLogin}>
          <LoginCard
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />

          {/* Forgot Password Link */}
          <div className="forgot-password" style={{ marginTop: '10px', textAlign: 'center' }}>
            <Link to="/ResetPassword" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
