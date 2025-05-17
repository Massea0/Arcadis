// src/pages/About.tsx
        import React, { useEffect, useRef } from 'react';
        import { gsap } from 'gsap';
        import { ScrollTrigger } from 'gsap/ScrollTrigger';
        import ParallaxSection from '../components/ParallaxSection.js';
        import '../styles/About.css';

        gsap.registerPlugin(ScrollTrigger);

        // Define ScrollTrigger instance interface
        interface ScrollTriggerInstance {
            kill: () => void;
        }

        const About: React.FC = () => {
            const headingRef = useRef<HTMLHeadingElement>(null);
            const contentRef = useRef<HTMLDivElement>(null);
            const teamRef = useRef<HTMLDivElement>(null);
            const valuesRef = useRef<HTMLDivElement>(null);

            useEffect(() => {
                // Animate heading
                if (headingRef.current) {
                    gsap.fromTo(
                        headingRef.current,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: headingRef.current,
                                start: "top 80%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }

                // Animate content
                if (contentRef.current) {
                    const paragraphs = contentRef.current.querySelectorAll('p');
                    gsap.fromTo(
                        paragraphs,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            stagger: 0.3,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: contentRef.current,
                                start: "top 70%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }

                // Animate team members
                if (teamRef.current) {
                    const members = teamRef.current.querySelectorAll('.team-member');
                    gsap.fromTo(
                        members,
                        { opacity: 0, y: 50, scale: 0.9 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            stagger: 0.15,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: teamRef.current,
                                start: "top 70%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }

                // Animate values section
                if (valuesRef.current) {
                    const values = valuesRef.current.querySelectorAll('.value-item');
                    gsap.fromTo(
                        values,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.2,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: valuesRef.current,
                                start: "top 70%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }

                return () => {
                    // Clean up ScrollTrigger instances
                    ScrollTrigger.getAll().forEach((trigger: ScrollTriggerInstance) => trigger.kill());
                };
            }, []);

            const teamMembers = [
                {
                    name: "Thomas Laurent",
                    role: "CEO & Fondateur",
                    bio: "Développeur full-stack et entrepreneur passionné par l'innovation.",
                    image: "/images/team/team-1.jpg" // You'll need to add actual images
                },
                {
                    name: "Marie Dubois",
                    role: "Directrice Technique",
                    bio: "Expert en architecture logicielle avec plus de 10 ans d'expérience.",
                    image: "/images/team/team-2.jpg"
                },
                {
                    name: "Antoine Moreau",
                    role: "Lead Developer",
                    bio: "Spécialiste JavaScript et expert en frameworks modernes.",
                    image: "/images/team/team-3.jpg"
                },
                {
                    name: "Sophie Martin",
                    role: "UI/UX Designer",
                    bio: "Créatrice d'expériences utilisateur intuitives et élégantes.",
                    image: "/images/team/team-4.jpg"
                }
            ];

            const companyValues = [
                {
                    title: "Innovation",
                    description: "Nous repoussons constamment les limites pour créer des solutions avant-gardistes.",
                    icon: "🚀"
                },
                {
                    title: "Excellence",
                    description: "Nous visons la perfection dans chaque projet et chaque ligne de code.",
                    icon: "✨"
                },
                {
                    title: "Collaboration",
                    description: "Nous croyons en la puissance du travail d'équipe et des partenariats solides.",
                    icon: "🤝"
                },
                {
                    title: "Intégrité",
                    description: "Nous agissons avec honnêteté et transparence dans toutes nos interactions.",
                    icon: "🔒"
                }
            ];

            return (
                <div className="about-page">
                    <ParallaxSection
                        bgColor="#051620"
                        depth={0.1}
                        id="about-header"
                        className="about-header-parallax"
                    >
                        <div className="about-header">
                            <h1 ref={headingRef} className="about-title">Notre Histoire</h1>
                            <div ref={contentRef} className="about-content">
                                <p>
                                    Fondée en 2020, Arcadis Tech est née de la vision de créer des solutions
                                    digitales qui allient performance technique et expérience utilisateur
                                    exceptionnelle. Notre entreprise a débuté avec une équipe de trois
                                    passionnés de technologie déterminés à changer la façon dont les
                                    entreprises abordent leur transformation numérique.
                                </p>
                                <p>
                                    Au fil des années, nous avons développé une expertise approfondie dans
                                    divers domaines technologiques, nous permettant d'offrir des services
                                    complets et adaptés aux besoins spécifiques de chaque client. Notre
                                    croissance s'est toujours faite en préservant nos valeurs fondamentales
                                    d'innovation, d'excellence et d'intégrité.
                                </p>
                                <p>
                                    Aujourd'hui, Arcadis Tech est reconnue comme un acteur majeur dans
                                    le développement de solutions digitales sur mesure, avec une approche
                                    centrée sur l'humain et une vision à long terme. Notre équipe s'est
                                    agrandie pour inclure des talents divers et complémentaires, tous unis
                                    par la même passion pour la technologie et l'innovation.
                                </p>
                            </div>
                        </div>
                    </ParallaxSection>

                    <ParallaxSection
                        bgColor="#072635"
                        depth={0.2}
                        id="team-section"
                        className="team-parallax"
                    >
                        <div className="team-section">
                            <h2 className="section-title">Notre Équipe</h2>
                            <div ref={teamRef} className="team-grid">
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="team-member">
                                        <div className="member-image" style={{ backgroundImage: `url(${member.image})` }}>
                                            <div className="member-overlay"></div>
                                        </div>
                                        <div className="member-info">
                                            <h3>{member.name}</h3>
                                            <span className="member-role">{member.role}</span>
                                            <p>{member.bio}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ParallaxSection>

                    <ParallaxSection
                        bgColor="#051620"
                        depth={0.15}
                        id="values-section"
                        className="values-parallax"
                    >
                        <div className="values-section">
                            <h2 className="section-title">Nos Valeurs</h2>
                            <div ref={valuesRef} className="values-grid">
                                {companyValues.map((value, index) => (
                                    <div key={index} className="value-item">
                                        <div className="value-icon">{value.icon}</div>
                                        <h3>{value.title}</h3>
                                        <p>{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ParallaxSection>
                </div>
            );
        };

        export default About;