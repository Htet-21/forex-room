import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginRegister.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('senderId', response.data.user._id);
            localStorage.setItem('role', response.data.user.role);
            localStorage.setItem('name', response.data.user.username);
            window.location.href = '/';
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed, please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div className="login-register-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default LoginPage;
