import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-logo">
                        Arcadis<span className="text-accent">Tech</span>
                    </h3>
                    <p className="footer-tagline">
                        Accélérez votre transformation digitale avec des solutions innovantes.
                    </p>
                    <div className="footer-social">
                        <a href="#" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a href="#" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                        </a>
                        <a href="#" aria-label="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="footer-sections-container">
                    <div className="footer-section">
                        <h4>Navigation</h4>
                        <ul className="footer-links">
                            <li><a href="#services">Services</a></li>
                            <li><a href="#about">À Propos</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Services</h4>
                        <ul className="footer-links">
                            <li><a href="#services">Conception Logicielle</a></li>
                            <li><a href="#services">Automatisation</a></li>
                            <li><a href="#services">Intégration Systèmes</a></li>
                            <li><a href="#services">Conseil Technologique</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p className="footer-contact-item">
                            <span>Email:</span>
                            <a href="mailto:contact@arcadistech.fr">contact@arcadis.tech</a>
                        </p>
                        <p className="footer-contact-item">
                            <span>Téléphone:</span>
                            <a href="tel:+221771980224">+221 77 198 02 24</a>
                        </p>
                        <div className="footer-contact-item">
                            <span>Adresse:</span>
                            <address>1210 Rue GYxxx, Dakar</address>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-copyright">
                    <p>&copy; {new Date().getFullYear()} ArcadisTech. Tous droits réservés.</p>
                </div>
                <div className="footer-legal">
                    <a href="#">Mentions légales</a>
                    <a href="#">Politique de confidentialité</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
