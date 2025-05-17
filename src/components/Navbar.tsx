// src/components/Navbar.tsx
import React from 'react';
import '../styles/Navbar.css';

// Define the props interface
interface NavbarProps {
    scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="/" className="navbar-logo">
                    Arcadis Tech
                </a>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="#services" className="nav-link">Services</a>
                    </li>
                    <li className="nav-item">
                        <a href="#about" className="nav-link">À Propos</a>
                    </li>
                    <li className="nav-item">
                        <a href="#contact" className="nav-link">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;