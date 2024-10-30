/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import '../styles/navbar.css';
import { img_dir } from '../../public/template';

const Navbar = ({ message }) => {

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/">Main Page</a>
            </div>
            <div className="navbar-right">
                {message ? (
                    <div className="profile-container">
                        <div style={{ margin: 'auto' }} className='avatar-container2'>
                            <img className='avatar-preview' src={`${img_dir}${message.avatarTitle}`} />
                        </div>
                        <div className="dropdown-menu">
                            <a href="/profile">My Profile</a>
                            <a href="/settings">Settings</a>
                            <a href="/" onClick={() => window.localStorage.removeItem('access-token')}>Logout</a>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1em' }}>
                        <a href='/sign-in'>Login</a>
                        <a href='/sign-up'>Register</a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
