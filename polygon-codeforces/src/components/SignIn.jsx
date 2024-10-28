/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../styles/sign-in.css';
import Navbar from './Navbar';
import { back } from '../../public/template';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Both fields are required.');
            return;
        }

        try {
            const response = await fetch(`${back}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const data = await response.json();
        
            if (response.ok) {
                window.localStorage.setItem('access-token', data.access_token);
                window.location.href = '/';
            } else {
                setError(response.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="sign-in-card">
                <h1>Sign In</h1>
                {error && <div className="error">{error}</div>} {/* Display error messages */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
                <footer className="footer">
                    <div className='footer-content'>
                        <span className='line'></span>
                        <span className='footer-text'>{"Don't have an account?"} <a href="/sign-up">Sign Up</a></span>
                        <span className='line'></span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default SignIn;
