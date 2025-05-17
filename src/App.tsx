import React, { useState, useEffect, useRef } from 'react';
                            import { Routes, Route, useLocation } from 'react-router-dom';
                            import Navbar from './components/Navbar.js';
                            import Footer from './components/Footer.js';
                            import Home from './pages/Home.js';
                            import About from './pages/About.js';
                            import Services from './pages/Services.js';
                            import Contact from './pages/Contact.js';
                            import NotFound from './pages/NotFound.js';
                            import LoadingScreen from './components/LoadingScreen.js';
                            import SiteTransitionProvider from './context/SiteTransitionProvider.js';
                            import { gsap } from 'gsap';
                            import { ScrollTrigger } from 'gsap/ScrollTrigger';
                            import './styles/App.css';

                            gsap.registerPlugin(ScrollTrigger);

                            const App: React.FC = () => {
                                const [loading, setLoading] = useState(true);
                                const [scrolled, setScrolled] = useState(false);
                                const location = useLocation();
                                const firstSectionRef = useRef<HTMLDivElement>(null);

                                // Handle initial app loading
                                useEffect(() => {
                                    const handleLoading = () => {
                                        setLoading(false);
                                    };

                                    setTimeout(handleLoading, 2500); // Minimum display time for loading screen
                                }, []);

                                // Handle scroll events for Navbar
                                useEffect(() => {
                                    const handleScroll = () => {
                                        const isScrolled = window.scrollY > 50;
                                        if (isScrolled !== scrolled) {
                                            setScrolled(isScrolled);
                                        }
                                    };

                                    window.addEventListener('scroll', handleScroll);

                                    // Initial check
                                    handleScroll();

                                    return () => {
                                        window.removeEventListener('scroll', handleScroll);
                                    };
                                }, [scrolled]);

                                // GSAP effect for disappearing first section
                                useEffect(() => {
                                    if (firstSectionRef.current) {
                                        gsap.to(firstSectionRef.current, {
                                            opacity: 0,
                                            y: -100,
                                            scrollTrigger: {
                                                trigger: firstSectionRef.current,
                                                start: 'top top',
                                                end: 'bottom top',
                                                scrub: true,
                                            },
                                        });
                                    }
                                }, []);

                                // Handle hash-based navigation
                                useEffect(() => {
                                    if (location.hash) {
                                        const element = document.querySelector(location.hash);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }
                                }, [location]);

                                return (
                                    <>
                                        {loading ? (
                                            <LoadingScreen onLoadComplete={() => setLoading(false)} />
                                        ) : (
                                            <SiteTransitionProvider>
                                                <Navbar scrolled={scrolled} />
                                                <main className="snap-container">
                                                    <section ref={firstSectionRef} className="snap-section" id="home">
                                                        <Home />
                                                    </section>
                                                    <section className="snap-section" id="about">
                                                        <About />
                                                    </section>
                                                    <section className="snap-section" id="services">
                                                        <Services />
                                                    </section>
                                                    <section className="snap-section" id="contact">
                                                        <Contact />
                                                    </section>
                                                </main>
                                                <Footer />
                                            </SiteTransitionProvider>
                                        )}
                                    </>
                                );
                            };

                            export default App;