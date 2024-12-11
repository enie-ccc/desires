import React, { useState } from 'react';
import { users, decryptPassword } from '../config/users';

const Login = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = Object.values(users).find(u => {
            const decryptedPassword = decryptPassword(u.password);
            return decryptedPassword === password;
        });

        if (user) {
            setError('');
            onLogin(user);
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Welcome to Our Special Place</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Enter</button>
            </form>
        </div>
    );
};

export default Login;
