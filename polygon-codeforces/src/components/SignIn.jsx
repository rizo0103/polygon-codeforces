/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../styles/sign-in.css';
import Navbar from './Navbar';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Both fields are required.');
            return;
        }
        // Handle sign in logic
        console.log('Sign In:', { username, password });
        setError(''); // Clear error if submission is successful
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
