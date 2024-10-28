/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/">Main Page</a>
            </div>
            <div className="navbar-right">
                <a href="/profile">Profile</a>
            </div>
        </nav>  
    );
};

export default Navbar;
