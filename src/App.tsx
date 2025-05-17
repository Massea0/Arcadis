// src/App.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Gardé pour la navigation par ancre (#)
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
// Les autres imports de pages (About, Services, Contact, NotFound) ne sont pas utilisés
// si Home.tsx gère tout le contenu de la page unique.
// Ils pourraient être utilisés pour une future version multi-pages avec React Router.
import LoadingScreen from './components/LoadingScreen.js';
import SiteTransitionProvider from './context/SiteTransitionProvider.js';
// GSAP et ScrollTrigger sont importés dans les composants qui les utilisent directement.
import './styles/App.css';
import Site from './Site.js'; // Importez le composant Site

// gsap.registerPlugin(ScrollTrigger); // Plus nécessaire ici si non utilisé directement

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation(); // Pour la navigation par ancre

    // Gère l'écran de chargement initial
    useEffect(() => {
        const handleLoading = () => setLoading(false);
        // Simule un temps de chargement
        const timer = setTimeout(handleLoading, 2500);
        return () => clearTimeout(timer); // Nettoyage du timer
    }, []);

    // Gère l'état "scrolled" pour la Navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Vérification initiale au chargement
        return () => window.removeEventListener('scroll', handleScroll); // Nettoyage de l'écouteur
    }, []);

    // Gère la navigation par ancre (#) après le chargement
    useEffect(() => {
        if (!loading && location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                // Utilise scrollIntoView pour un défilement plus fiable vers les sections
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loading, location.hash]); // Se déclenche si loading ou location.hash change

    return (
        <>
            {loading ? (
                <LoadingScreen onLoadComplete={() => setLoading(false)} />
            ) : (
                // Le composant Site enveloppe tout pour fournir Lenis (défilement fluide)
                // et l'arrière-plan Amazonia (étoiles).
                <Site>
                    <SiteTransitionProvider>
                        <Navbar scrolled={scrolled} />
                        {/* Si Home.tsx est la page unique principale, on la rend directement.
                            La structure avec <main className="snap-container"> et les <section>
                            a été retirée d'ici, car Home.tsx gère ses propres sections. */}
                        <Home />
                        {/* Si vous aviez une application multi-pages, ce serait ici :
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        */}
                        <Footer />
                    </SiteTransitionProvider>
                </Site>
            )}
        </>
    );
};

export default App;
