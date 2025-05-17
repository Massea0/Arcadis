// src/pages/Home.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero.js'; // S'assurer que le chemin est correct
import ParallaxSection from '../components/ParallaxSection.js'; // S'assurer que le chemin est correct
import HorizontalScrollText from '../components/HorizontalScrollText.js'; // S'assurer que le chemin est correct
import '../styles/Home.css'; // S'assurer que le chemin est correct

gsap.registerPlugin(ScrollTrigger);

// Définition d'une interface pour une instance de ScrollTrigger, si nécessaire pour un typage plus strict
interface ScrollTriggerInstance {
    kill: () => void;
    // Ajoutez d'autres propriétés si vous interagissez plus profondément avec l'instance
}

const Home: React.FC = () => {
    // État pour suivre quelle carte de service est agrandie
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    // Références aux sections pour les animations GSAP
    const servicesRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fonction de nettoyage pour un éventuel effet "spotlight" (non implémenté ici mais présent dans le code original)
        const cleanupSpotlight = () => {
            // Code de nettoyage pour l'effet spotlight si nécessaire
        };

        // Animation pour la section des services
        if (servicesRef.current) {
            const serviceCards = servicesRef.current.querySelectorAll('.service-card');
            gsap.fromTo(
                serviceCards,
                { opacity: 0, y: 50 }, // État initial (invisible et décalé vers le bas)
                {
                    opacity: 1, // État final (visible)
                    y: 0,       // État final (position originale)
                    duration: 0.8, // Durée de l'animation
                    stagger: 0.15, // Délai entre l'animation de chaque carte
                    ease: "power2.out", // Type d'accélération
                    scrollTrigger: {
                        trigger: servicesRef.current, // Déclencheur de l'animation
                        start: "top 70%", // Commence quand 70% du haut du trigger est visible
                        toggleActions: "play none none reverse", // Comportement au scroll
                    },
                }
            );
        }

        // Animation pour la section "À Propos"
        if (aboutRef.current) {
            const aboutElements = aboutRef.current.querySelectorAll('p, .value-prop'); // Cible les paragraphes et les "value-prop"
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

        // Animation pour la section "Contact"
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

        // Fonction de nettoyage exécutée lorsque le composant est démonté
        return () => {
            // Nettoie toutes les instances de ScrollTrigger pour éviter les fuites de mémoire
            ScrollTrigger.getAll().forEach((trigger) => (trigger as ScrollTriggerInstance).kill());
            cleanupSpotlight(); // Appelle la fonction de nettoyage du spotlight
        };
    }, []); // Le tableau de dépendances vide signifie que cet effet s'exécute une seule fois après le montage initial

    // Gestionnaire pour l'ouverture/fermeture des cartes de service
    const handleCardClick = (index: number) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    // Données pour les services (vous pouvez les externaliser si elles deviennent volumineuses)
    const services = [
        {
            title: "Conception Logicielle",
            description: "Développement d'applications sur mesure adaptées à votre entreprise.",
            details:
                "Notre équipe d'experts conçoit des solutions logicielles personnalisées qui répondent parfaitement à vos besoins spécifiques. Des applications web aux systèmes complexes, nous assurons une qualité irréprochable et une expérience utilisateur exceptionnelle.",
            icon: "💻" // Emoji comme icône
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
            {/* Section Héros en haut de la page */}
            <Hero />

            {/* Section des Services */}
            {/* En ne passant pas de bgColor, ou en passant bgColor="transparent",
                l'arrière-plan de cette ParallaxSection sera transparent,
                laissant voir l'arrière-plan global Amazonia. */}
            <ParallaxSection
                // bgColor="#051620" // Commenté ou supprimé pour la transparence
                depth={0.1}
                id="services"
                className="services-parallax"
            >
                <div className="section-content" ref={servicesRef}>
                    <h2 className="section-title">Nos Services</h2>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div
                                key={index} // Clé unique pour chaque élément de la liste
                                className={`service-card ${expandedCard === index ? "expanded" : ""}`}
                                onClick={() => handleCardClick(index)} // Gère le clic pour agrandir/réduire
                            >
                                <div className="service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                {/* Les détails ne sont visibles que si la carte est agrandie */}
                                <div className="service-details">
                                    <p>{service.details}</p>
                                    <button className="learn-more-btn">En savoir plus</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ParallaxSection>

            {/* Section de Texte à Défilement Horizontal */}
            <HorizontalScrollText />

            {/* Section "À Propos" */}
            <ParallaxSection
                // bgColor="#072635" // Commenté ou supprimé pour la transparence
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
                        {/* Propositions de valeur */}
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

            {/* Section "Contact" */}
            <ParallaxSection
                // bgColor="#051620" // Commenté ou supprimé pour la transparence
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
                        {/* Informations de contact */}
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-icon">✉️</span>
                                <span>Email:</span>
                                <a href="mailto:contact@arcadis.tech">contact@arcadis.tech</a>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <span>Téléphone:</span>
                                <a href="tel:+221771980224">+221 77 198 02 24</a>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <span>Adresse:</span>
                                <address>1210 Rue GYxxx, Dakar</address>
                            </div>
                        </div>
                        {/* Bouton d'appel à l'action */}
                        <div className="contact-cta">
                            <button className="contact-button">Prendre rendez-vous</button>
                        </div>
                    </div>
                </div>
            </ParallaxSection>
        </div>
    );
};

// Assurez-vous que cette ligne est présente et non commentée
export default Home;
