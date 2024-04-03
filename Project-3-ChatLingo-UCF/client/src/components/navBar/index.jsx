import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div
            className="navbar-container"
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                setIsOpen(!isOpen);
            }}}>
                Menu
            </div>
      
            
            <Link to="/" className="nav-link">Home</Link>
                {isOpen && (
                    <ul className={`navbar-nav ${isOpen ? 'show' : ''}`}>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/chat" className="nav-link">Chat</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/settings" className="nav-link">Settings</Link>
                        </li>
                        <li className="nav-item">  
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/help" className="nav-link">Help</Link>
                        </li>
                    </ul>
                )}
        </nav>
    );
};

export default Nav;