/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../styles/sign-up.css'; // Make sure to import your CSS file
import Navbar from './Navbar';
import { canSee, cantSee } from '../../public/template';

const SignUp = () => {
    const [ avatar, setAvatar ] = useState('');
    const [ passwordVisibility, setPasswordVisibility ] = useState(false);
    const [ passwordType, setPasswordType ] = useState('password');

    const passwordVisible = () => {
        setPasswordVisibility(!passwordVisibility);

        if (!passwordVisibility) {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="sign-up-card">
                <h1>Sign Up</h1>
                <form>
                    <div className='avatar-container' onClick={() => document.getElementById('avatar-input').click()}>
                        {avatar ? (
                            <img src={avatar} className='avatar-preview' />
                        ) : (
                            <span className='avatar-placeholder'> Choose Avatar </span>
                        )}
                        <input type='file' id='avatar-input' accept='image/*' onChange={handleAvatarChange} style={{ display: 'none' }} />
                    </div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" name="fullname" required />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                    <div className='password-group'>
                        <div className='password-field'>
                            <label style={{ display: 'flex' }} htmlFor="password">
                                Password 
                                <div className='password-visibility' onClick={passwordVisible}> {passwordVisibility ? (<img src={canSee} />) : (<img src={cantSee} />)} </div>
                            </label>
                            <input type={passwordType} id="password" name="password" required />
                        </div>
                        <div className='password-field'>
                            <label style={{ display: 'flex' }} htmlFor="confirm-password">
                                Confirm Password
                                <div className='password-visibility' onClick={passwordVisible}> {passwordVisibility ? (<img src={canSee} />) : (<img src={cantSee} />)} </div> 
                            </label>
                            <input type={passwordType} id="confirm-password" name="confirm-password" required />
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

