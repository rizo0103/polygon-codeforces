/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../styles/sign-up.css';
import Navbar from './Navbar';
import { back, canSee, cantSee } from '../../public/template';

const SignUp = () => {
    const [avatar, setAvatar] = useState(null); // Track file object, not dataURL
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [error, setError] = useState('');

    useEffect(() => {
        if (window.localStorage.getItem('access-token')) {
            window.location.href = '/';
        }
    });

    const passwordVisible = () => {
        setPasswordVisibility(!passwordVisibility);
        setPasswordType(passwordVisibility ? 'password' : 'text');
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setAvatar(file); // Save file object for upload
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setError('Both passwords must be equal');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('fullname', fullname);
            formData.append('email', email);
            formData.append('password', password);
            if (avatar) formData.append('avatar', avatar); // Attach avatar file if it exists

            const response = await fetch(`${back}/register`, {
                method: 'POST',
                body: formData, // Do not set 'Content-Type' header
            });

            const data = await response.json();
            if (response.ok) {
                window.location.href = '/sign-in';
            } else {
                setError(data.message || 'Failed to register');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="sign-up-card">
                <h1>Sign Up</h1>
                {error && <div className="error">{error}</div>}
                <form onSubmit={onSubmit}>
                    <div className='avatar-container' onClick={() => document.getElementById('avatar-input').click()}>
                        {avatar ? (
                            <img src={URL.createObjectURL(avatar)} className='avatar-preview' alt="avatar preview" />
                        ) : (
                            <span className='avatar-placeholder'> Choose Avatar </span>
                        )}
                        <input type='file' id='avatar-input' accept='image/*' onChange={handleAvatarChange} style={{ display: 'none' }} />
                    </div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required />
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" name="fullname" onChange={(e) => setFullname(e.target.value)} required />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                    
                    <div className='password-group'>
                        <div className='password-field'>
                            <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="password">
                                Password
                                <div className='password-visibility' onClick={passwordVisible}>
                                    {passwordVisibility ? <img src={canSee} alt="show" /> : <img src={cantSee} alt="hide" />}
                                </div>
                            </label>
                            <input type={passwordType} id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='password-field'>
                            <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="confirm-password">
                                Confirm Password
                                <div className='password-visibility' onClick={passwordVisible}>
                                    {passwordVisibility ? <img src={canSee} alt="show" /> : <img src={cantSee} alt="hide" />}
                                </div>
                            </label>
                            <input type={passwordType} id="confirm-password" name="confirm-password" onChange={(e) => setPasswordConfirm(e.target.value)} required />
                        </div>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <div className="footer">
                    <div className="footer-content">
                        <span className="line"></span>
                        <span className="footer-text">Already have an account? <a href="/sign-in">Sign In</a></span>
                        <span className="line"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
