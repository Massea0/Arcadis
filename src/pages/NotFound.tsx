// src/pages/NotFound.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound: React.FC = () => {
    useEffect(() => {
        // Create particles effect for background
        const createParticles = () => {
            const container = document.querySelector('.not-found-container');
            if (!container) return;

            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.classList.add('error-particle');

                // Random positioning
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.left = `${Math.random() * 100}%`;

                // Random size
                const size = Math.random() * 80 + 50;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;

                // Random opacity
                particle.style.opacity = `${Math.random() * 0.5}`;

                container.appendChild(particle);
            }
        };

        createParticles();

        // Animate error number
        const animateErrorNumber = () => {
            const errorNumber = document.querySelector('.error-number');
            if (errorNumber) {
                errorNumber.classList.add('animate');
            }
        };

        setTimeout(animateErrorNumber, 300);
    }, []);

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="error-number">404</h1>
                <h2 className="error-title">Page introuvable</h2>
                <p className="error-message">
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>
                <Link to="/" className="back-home-button">
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
};

export default NotFound;