import { useState } from 'react';
import LoginCard from '../../Card/LoginCard/LoginCard';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login__auth__container">
            <div className="login__auth">
                <LoginCard
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                />
            </div>
        </div>
    );
};

export default Login;
