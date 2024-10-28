/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import '../styles/navbar.css';

const Navbar = ({message}) => {

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/">Main Page</a>
            </div>
            <div className="navbar-right">
                {message.userData ? (
                    <a href=''>Profile</a>
                ): (
                    <div style={{ display: 'flex', gap: '5em' }}>
                        <a href='/sign-in'> Login </a>
                        <a href='sign-up'> Register </a>
                    </div> 
                )}
            </div>
        </nav>  
    );
};

export default Navbar;
