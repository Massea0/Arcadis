// src/pages/Services.tsx
                            import React, { useRef, useEffect, useState } from "react";
                            import { gsap } from "gsap";
                            import { ScrollTrigger } from "gsap/ScrollTrigger";
                            import ParallaxSection from "../components/ParallaxSection.js";
                            import "../styles/Services.css";

                            gsap.registerPlugin(ScrollTrigger);

                            // Define ScrollTrigger instance interface
                            interface ScrollTriggerInstance {
                                kill: () => void;
                            }

                            interface ServiceType {
                                id: number;
                                title: string;
                                subtitle: string;
                                description: string;
                                icon: string;
                                bullets: string[];
                            }

                            const Services: React.FC = () => {
                                const [activeService, setActiveService] = useState<number | null>(null);
                                const headerRef = useRef<HTMLDivElement>(null);
                                const servicesRef = useRef<HTMLDivElement>(null);
                                const showcaseRef = useRef<HTMLDivElement>(null);
                                const processRef = useRef<HTMLDivElement>(null);

                                // Sample services data
                                const services: ServiceType[] = [
                                    {
                                        id: 1,
                                        title: "Conception Logicielle",
                                        subtitle: "Solutions sur mesure pour votre entreprise",
                                        description: "Nous développons des applications personnalisées qui répondent parfaitement à vos besoins spécifiques, en utilisant les technologies les plus adaptées à votre projet.",
                                        icon: "💻",
                                        bullets: [
                                            "Applications web et mobiles performantes",
                                            "Architecture logicielle évolutive",
                                            "Interfaces utilisateur intuitives",
                                            "Code optimisé et maintenable"
                                        ]
                                    },
                                    {
                                        id: 2,
                                        title: "Automatisation",
                                        subtitle: "Optimisez vos processus métier",
                                        description: "Transformez votre flux de travail grâce à des solutions d'automatisation intelligentes qui libèrent vos équipes des tâches répétitives et minimisent les erreurs.",
                                        icon: "⚙️",
                                        bullets: [
                                            "Automatisation des workflows",
                                            "Intégration RPA (Robotic Process Automation)",
                                            "Scripts et outils d'automatisation personnalisés",
                                            "Tableaux de bord de suivi en temps réel"
                                        ]
                                    },
                                    {
                                        id: 3,
                                        title: "Intégration Systèmes",
                                        subtitle: "Connectez tous vos outils et plateformes",
                                        description: "Nous créons des ponts entre vos différents systèmes d'information pour assurer une communication fluide et éliminer les silos de données.",
                                        icon: "🔄",
                                        bullets: [
                                            "APIs et middlewares robustes",
                                            "Synchronisation de données inter-systèmes",
                                            "Intégration avec vos solutions existantes",
                                            "Architecture orientée services (SOA)"
                                        ]
                                    },
                                    {
                                        id: 4,
                                        title: "Conseil Technologique",
                                        subtitle: "Expertise stratégique pour votre transformation digitale",
                                        description: "Bénéficiez de conseils avisés pour orienter votre stratégie technologique et maximiser le retour sur investissement de vos projets IT.",
                                        icon: "🧠",
                                        bullets: [
                                            "Audit de votre infrastructure technique",
                                            "Recommandations stratégiques personnalisées",
                                            "Veille technologique et innovation",
                                            "Accompagnement dans la prise de décision"
                                        ]
                                    }
                                ];

                                const processSteps = [
                                    {
                                        number: "01",
                                        title: "Découverte",
                                        description: "Nous prenons le temps de comprendre vos besoins, vos objectifs et les défis spécifiques à votre activité."
                                    },
                                    {
                                        number: "02",
                                        title: "Analyse & Conception",
                                        description: "Nous définissons l'architecture technique et fonctionnelle de la solution adaptée à vos exigences."
                                    },
                                    {
                                        number: "03",
                                        title: "Développement",
                                        description: "Notre équipe d'experts développe votre solution en suivant les meilleures pratiques et méthodologies agiles."
                                    },
                                    {
                                        number: "04",
                                        title: "Tests & Validation",
                                        description: "Chaque fonctionnalité est rigoureusement testée pour garantir la qualité et la fiabilité de la solution."
                                    },
                                    {
                                        number: "05",
                                        title: "Déploiement",
                                        description: "Nous assurons une mise en production fluide et sans impact sur votre activité."
                                    },
                                    {
                                        number: "06",
                                        title: "Support & Évolution",
                                        description: "Nous continuons à vous accompagner après le lancement pour assurer le succès à long terme de votre solution."
                                    }
                                ];

                                useEffect(() => {
                                    // Header animation
                                    if (headerRef.current) {
                                        gsap.fromTo(
                                            headerRef.current.querySelectorAll(".animate-fade"),
                                            { opacity: 0, y: 50 },
                                            {
                                                opacity: 1,
                                                y: 0,
                                                duration: 1,
                                                stagger: 0.2,
                                                ease: "power3.out",
                                                scrollTrigger: {
                                                    trigger: headerRef.current,
                                                    start: "top 80%",
                                                    toggleActions: "play none none reverse"
                                                }
                                            }
                                        );
                                    }

                                    // Services cards animation
                                    if (servicesRef.current) {
                                        const cards = servicesRef.current.querySelectorAll(".service-card");
                                        gsap.fromTo(
                                            cards,
                                            { opacity: 0, y: 50 },
                                            {
                                                opacity: 1,
                                                y: 0,
                                                duration: 0.8,
                                                stagger: 0.15,
                                                ease: "power3.out",
                                                scrollTrigger: {
                                                    trigger: servicesRef.current,
                                                    start: "top 70%",
                                                    toggleActions: "play none none reverse"
                                                }
                                            }
                                        );
                                    }

                                    // Process steps animation
                                    if (processRef.current) {
                                        const steps = processRef.current.querySelectorAll(".process-step");
                                        gsap.fromTo(
                                            steps,
                                            { opacity: 0, x: -30 },
                                            {
                                                opacity: 1,
                                                x: 0,
                                                duration: 0.6,
                                                stagger: 0.2,
                                                ease: "power2.out",
                                                scrollTrigger: {
                                                    trigger: processRef.current,
                                                    start: "top 70%",
                                                    toggleActions: "play none none reverse"
                                                }
                                            }
                                        );
                                    }

                                    // Showcase items animation
                                    if (showcaseRef.current) {
                                        const items = showcaseRef.current.querySelectorAll(".showcase-item");
                                        gsap.fromTo(
                                            items,
                                            { opacity: 0, scale: 0.9 },
                                            {
                                                opacity: 1,
                                                scale: 1,
                                                duration: 0.8,
                                                stagger: 0.2,
                                                ease: "back.out(1.7)",
                                                scrollTrigger: {
                                                    trigger: showcaseRef.current,
                                                    start: "top 80%",
                                                    toggleActions: "play none none reverse"
                                                }
                                            }
                                        );
                                    }

                                    return () => {
                                        // Clean up ScrollTrigger instances
                                        ScrollTrigger.getAll().forEach((trigger: ScrollTriggerInstance) => trigger.kill());
                                    };
                                }, []);

                                const toggleServiceDetails = (id: number) => {
                                    setActiveService(activeService === id ? null : id);
                                };

                                return (
                                    <div className="services-page">
                                        {/* Header Section */}
                                        <ParallaxSection bgColor="#051620" depth={0.1} id="services-header">
                                            <div className="services-header" ref={headerRef}>
                                                <h1 className="services-title animate-fade">Nos Services</h1>
                                                <p className="services-subtitle animate-fade">
                                                    Des solutions technologiques innovantes pour accélérer votre transformation digitale
                                                </p>
                                                <div className="header-decoration animate-fade"></div>
                                            </div>
                                        </ParallaxSection>

                                        {/* Services Overview Section */}
                                        <ParallaxSection bgColor="#072635" depth={0.2} id="services-grid">
                                            <div className="services-grid-container" ref={servicesRef}>
                                                <h2 className="section-title">Expertise Technologique</h2>
                                                <div className="services-grid">
                                                    {services.map((service) => (
                                                        <div
                                                            key={service.id}
                                                            className={`service-card ${activeService === service.id ? "active" : ""}`}
                                                            onClick={() => toggleServiceDetails(service.id)}
                                                        >
                                                            <div className="service-icon">{service.icon}</div>
                                                            <h3 className="service-title">{service.title}</h3>
                                                            <p className="service-subtitle">{service.subtitle}</p>

                                                            <div className="service-details">
                                                                <p className="service-description">{service.description}</p>
                                                                <ul className="service-bullets">
                                                                    {service.bullets.map((bullet, index) => (
                                                                        <li key={index}>{bullet}</li>
                                                                    ))}
                                                                </ul>
                                                                <button className="service-cta">En savoir plus</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </ParallaxSection>

                                        {/* Process Section */}
                                        <ParallaxSection bgColor="#051620" depth={0.15} id="services-process">
                                            <div className="process-container" ref={processRef}>
                                                <h2 className="section-title">Notre Approche</h2>
                                                <div className="process-timeline">
                                                    {processSteps.map((step, index) => (
                                                        <div key={index} className="process-step">
                                                            <div className="step-number">{step.number}</div>
                                                            <div className="step-content">
                                                                <h3 className="step-title">{step.title}</h3>
                                                                <p className="step-description">{step.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </ParallaxSection>

                                        {/* Showcase Section */}
                                        <ParallaxSection bgColor="#072635" depth={0.25} id="services-showcase">
                                            <div className="showcase-container" ref={showcaseRef}>
                                                <h2 className="section-title">Pourquoi Nous Choisir</h2>
                                                <div className="showcase-grid">
                                                    <div className="showcase-item">
                                                        <div className="showcase-icon">🚀</div>
                                                        <h3>Innovation Constante</h3>
                                                        <p>Nous restons à la pointe des dernières technologies pour vous offrir les solutions les plus innovantes.</p>
                                                    </div>
                                                    <div className="showcase-item">
                                                        <div className="showcase-icon">🔒</div>
                                                        <h3>Sécurité Intégrée</h3>
                                                        <p>La sécurité est au cœur de chaque solution que nous développons pour protéger vos données sensibles.</p>
                                                    </div>
                                                    <div className="showcase-item">
                                                        <div className="showcase-icon">⚡</div>
                                                        <h3>Performance Optimale</h3>
                                                        <p>Nos solutions sont optimisées pour offrir des performances exceptionnelles et une expérience utilisateur fluide.</p>
                                                    </div>
                                                    <div className="showcase-item">
                                                        <div className="showcase-icon">📊</div>
                                                        <h3>Approche Data-Driven</h3>
                                                        <p>Nous mettons les données au cœur de nos solutions pour vous aider à prendre des décisions éclairées.</p>
                                                    </div>
                                                </div>
                                                <div className="cta-container">
                                                    <a href="#contact" className="primary-button">Discutez de votre projet</a>
                                                </div>
                                            </div>
                                        </ParallaxSection>
                                    </div>
                                );
                            };

                            export default Services;