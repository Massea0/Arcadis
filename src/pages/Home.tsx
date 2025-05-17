// src/pages/Home.tsx
                                import React, { useEffect, useRef, useState } from 'react';
                                import { gsap } from 'gsap';
                                import { ScrollTrigger } from 'gsap/ScrollTrigger';
                                import Hero from '../components/Hero.js';
                                import ParallaxSection from '../components/ParallaxSection.js';
                                import HorizontalScrollText from '../components/HorizontalScrollText.js';
                                import '../styles/Home.css';

                                gsap.registerPlugin(ScrollTrigger);

                                // Define ScrollTrigger instance interface
                                interface ScrollTriggerInstance {
                                    kill: () => void;
                                }

                                const Home: React.FC = () => {
                                    const [expandedCard, setExpandedCard] = useState<number | null>(null);
                                    const servicesRef = useRef<HTMLDivElement>(null);
                                    const aboutRef = useRef<HTMLDivElement>(null);
                                    const contactRef = useRef<HTMLDivElement>(null);

                                    useEffect(() => {
                                        const cleanupSpotlight = () => {
                                            // Cleanup code for spotlight effect if necessary
                                        };

                                        // Animate services
                                        if (servicesRef.current) {
                                            const serviceCards = servicesRef.current.querySelectorAll('.service-card');
                                            gsap.fromTo(
                                                serviceCards,
                                                { opacity: 0, y: 50 },
                                                {
                                                    opacity: 1,
                                                    y: 0,
                                                    duration: 0.8,
                                                    stagger: 0.15,
                                                    ease: "power2.out",
                                                    scrollTrigger: {
                                                        trigger: servicesRef.current,
                                                        start: "top 70%",
                                                        toggleActions: "play none none reverse",
                                                    },
                                                }
                                            );
                                        }

                                        // Animate about section
                                        if (aboutRef.current) {
                                            const aboutElements = aboutRef.current.querySelectorAll('p, .value-prop');
                                            gsap.fromTo(
                                                aboutElements,
                                                { opacity: 0, y: 30 },
                                                {
                                                    opacity: 1,
                                                    y: 0,
                                                    duration: 0.8,
                                                    stagger: 0.2,
                                                    ease: "power2.out",
                                                    scrollTrigger: {
                                                        trigger: aboutRef.current,
                                                        start: "top 70%",
                                                        toggleActions: "play none none reverse",
                                                    },
                                                }
                                            );
                                        }

                                        // Animate contact section
                                        if (contactRef.current) {
                                            const contactElements = contactRef.current.querySelectorAll('p, .contact-item, .contact-cta');
                                            gsap.fromTo(
                                                contactElements,
                                                { opacity: 0, y: 30 },
                                                {
                                                    opacity: 1,
                                                    y: 0,
                                                    duration: 0.8,
                                                    stagger: 0.2,
                                                    ease: "power2.out",
                                                    scrollTrigger: {
                                                        trigger: contactRef.current,
                                                        start: "top 70%",
                                                        toggleActions: "play none none reverse",
                                                    },
                                                }
                                            );
                                        }

                                        return () => {
                                            // Clean up all ScrollTrigger instances and spotlight effects
                                            ScrollTrigger.getAll().forEach((trigger: ScrollTriggerInstance) => trigger.kill());
                                            cleanupSpotlight();
                                        };
                                    }, []);

                                    const handleCardClick = (index: number) => {
                                        setExpandedCard(expandedCard === index ? null : index);
                                    };

                                    const services = [
                                        {
                                            title: "Conception Logicielle",
                                            description: "Développement d'applications sur mesure adaptées à votre entreprise.",
                                            details:
                                                "Notre équipe d'experts conçoit des solutions logicielles personnalisées qui répondent parfaitement à vos besoins spécifiques. Des applications web aux systèmes complexes, nous assurons une qualité irréprochable et une expérience utilisateur exceptionnelle.",
                                            icon: "💻"
                                        },
                                        {
                                            title: "Automatisation",
                                            description: "Optimisez vos processus avec des solutions d'automatisation intelligentes.",
                                            details:
                                                "Gagnez en efficacité en automatisant vos tâches répétitives. Nos solutions d'automatisation permettent de réduire les erreurs, d'accélérer les processus et de libérer vos équipes pour qu'elles se concentrent sur des activités à plus forte valeur ajoutée.",
                                            icon: "⚙️"
                                        },
                                        {
                                            title: "Intégration Systèmes",
                                            description: "Connectez et synchronisez vos différents outils et plateformes.",
                                            details:
                                                "Nous assurons une communication fluide entre vos différents systèmes d'information. Notre expertise en intégration vous garantit un écosystème digital cohérent et performant, éliminant les silos de données et optimisant votre flux d'information.",
                                            icon: "🔄"
                                        },
                                        {
                                            title: "Conseil Technologique",
                                            description: "Expertise stratégique pour guider vos décisions technologiques.",
                                            details:
                                                "Bénéficiez de conseils avisés pour orienter votre stratégie digitale. Nos consultants vous accompagnent dans l'évaluation des technologies, la définition de votre roadmap et l'optimisation de votre architecture technique pour maximiser votre ROI.",
                                            icon: "🧠"
                                        },
                                    ];

                                    return (
                                        <div className="home-container">
                                            {/* Hero Section */}
                                            <Hero />

                                            {/* Services Section */}
                                            <ParallaxSection
                                                bgColor="#051620"
                                                depth={0.1}
                                                id="services"
                                                className="services-parallax"
                                            >
                                                <div className="section-content" ref={servicesRef}>
                                                    <h2 className="section-title">Nos Services</h2>
                                                    <div className="services-grid">
                                                        {services.map((service, index) => (
                                                            <div
                                                                key={index}
                                                                className={`service-card ${expandedCard === index ? "expanded" : ""}`}
                                                                onClick={() => handleCardClick(index)}
                                                            >
                                                                <div className="service-icon">{service.icon}</div>
                                                                <h3>{service.title}</h3>
                                                                <p>{service.description}</p>
                                                                <div className="service-details">
                                                                    <p>{service.details}</p>
                                                                    <button className="learn-more-btn">En savoir plus</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </ParallaxSection>

                                            {/* Horizontal Scroll Section */}
                                            <HorizontalScrollText />

                                            {/* About Section */}
                                            <ParallaxSection
                                                bgColor="#072635"
                                                depth={0.2}
                                                id="about"
                                                className="about-parallax"
                                            >
                                                <div className="section-content" ref={aboutRef}>
                                                    <h2 className="section-title">À Propos</h2>
                                                    <div className="about-content">
                                                        <p>
                                                            Arcadis Tech est une entreprise spécialisée dans la conception et le développement
                                                            de solutions digitales innovantes. Notre mission est d'accompagner les entreprises
                                                            dans leur transformation numérique en proposant des services sur mesure adaptés
                                                            à leurs besoins spécifiques.
                                                        </p>
                                                        <p>
                                                            Avec une équipe d'experts passionnés et une approche centrée sur le client,
                                                            nous mettons notre expertise au service de votre réussite. Nous croyons
                                                            que la technologie doit être un accélérateur de croissance et un vecteur
                                                            de valeur ajoutée pour votre activité.
                                                        </p>
                                                        <div className="about-value-props">
                                                            <div className="value-prop">
                                                                <span className="value-icon">🚀</span>
                                                                <h4>Innovation</h4>
                                                                <p>Toujours à la pointe de la technologie</p>
                                                            </div>
                                                            <div className="value-prop">
                                                                <span className="value-icon">🤝</span>
                                                                <h4>Collaboration</h4>
                                                                <p>Partenariat étroit avec nos clients</p>
                                                            </div>
                                                            <div className="value-prop">
                                                                <span className="value-icon">✨</span>
                                                                <h4>Excellence</h4>
                                                                <p>Qualité irréprochable dans tous nos projets</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ParallaxSection>

                                            {/* Contact Section */}
                                            <ParallaxSection
                                                bgColor="#051620"
                                                depth={0.15}
                                                id="contact"
                                                className="contact-parallax"
                                            >
                                                <div className="section-content" ref={contactRef}>
                                                    <h2 className="section-title">Contactez-nous</h2>
                                                    <div className="contact-content">
                                                        <p>
                                                            Vous avez un projet ou une idée à développer ? Nous serions ravis d'en discuter
                                                            avec vous. Contactez-nous pour échanger sur vos besoins et découvrir comment
                                                            nous pouvons vous accompagner dans votre transformation digitale.
                                                        </p>
                                                        <div className="contact-info">
                                                            <div className="contact-item">
                                                                <span className="contact-icon">✉️</span>
                                                                <span>Email:</span>
                                                                <a href="mailto:contact@arcadis.tech">contact@arcadis.tech</a>
                                                            </div>
                                                            <div className="contact-item">
                                                                <span className="contact-icon">📞</span>
                                                                <span>Téléphone:</span>
                                                                <a href="tel:+221 771980224">+221 77 198 02 24</a>
                                                            </div>
                                                            <div className="contact-item">
                                                                <span className="contact-icon">📍</span>
                                                                <span>Adresse:</span>
                                                                <address>1210 Rue GYxxx, Dakar</address>
                                                            </div>
                                                        </div>
                                                        <div className="contact-cta">
                                                            <button className="contact-button">Prendre rendez-vous</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ParallaxSection>
                                        </div>
                                    );
                                };

                                export default Home;