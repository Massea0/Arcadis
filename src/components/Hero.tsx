// src/components/Hero.tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
// ScrollTrigger est déjà importé globalement si utilisé dans SyncLenisAndGSAP
// mais il est bon de l'importer ici aussi si vous l'utilisez directement pour des animations spécifiques à Hero
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Hero.css'; // Assurez-vous que le chemin est correct

gsap.registerPlugin(ScrollTrigger); // Enregistrez-le ici aussi par sécurité ou si ce composant est utilisé isolément

// Define ScrollTrigger instance interface (si vous avez besoin de typer les instances de ScrollTrigger)
interface ScrollTriggerInstanceWithKill extends gsap.core.ScrollTrigger {
    kill: (soft?: boolean, preserveStyles?: boolean) => void;
}


const Hero: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null); // Renommé de textRef pour plus de clarté
    const subtitleRef = useRef<HTMLParagraphElement>(null); // Renommé de subTextRef pour plus de clarté
    const scrollDownRef = useRef<HTMLDivElement>(null); // Référence pour l'indicateur de défilement

    useEffect(() => {
        // Assurez-vous que les références sont valides
        if (heroRef.current && titleRef.current && subtitleRef.current && scrollDownRef.current) {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Animation d'apparition initiale au chargement de la page
            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 70 }, // Commence plus bas
                { opacity: 1, y: 0, duration: 1 }
            )
                .fromTo(
                    subtitleRef.current,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=0.7" // Se chevauche légèrement avec l'animation précédente
                )
                .fromTo(
                    scrollDownRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 0.7, y: 0, duration: 0.6 },
                    "-=0.5"
                );

            // Animation de parallaxe/disparition au défilement
            // Cette animation déplace le titre, le sous-titre et l'indicateur de défilement vers le haut
            // et les fait disparaître lorsque l'utilisateur fait défiler la page vers le bas.
            gsap.to([titleRef.current, subtitleRef.current, scrollDownRef.current], {
                yPercent: -50, // Déplace de 50% de sa propre hauteur vers le haut
                opacity: 0,
                ease: "power2.in", // Accélération vers l'intérieur pour un effet de disparition
                scrollTrigger: {
                    trigger: heroRef.current, // L'élément déclencheur est la section Hero elle-même
                    start: "top top", // Commence lorsque le haut de .hero atteint le haut de la fenêtre
                    end: "bottom top", // Se termine lorsque le bas de .hero atteint le haut de la fenêtre
                    scrub: true, // Lie l'animation au défilement (true pour un lien direct, un nombre pour un lissage)
                },
            });
        }

        // Nettoyage : Tuer tous les ScrollTriggers créés par ce composant lors du démontage
        // Ceci est important pour éviter les fuites de mémoire et les comportements inattendus.
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                // Vérifiez si le trigger est associé à l'un des éléments de ce composant avant de le tuer
                // Ceci est une vérification plus sûre que de tuer tous les triggers sans distinction.
                const triggerElement = trigger.trigger;
                if (triggerElement === heroRef.current ||
                    triggerElement === titleRef.current ||
                    triggerElement === subtitleRef.current ||
                    triggerElement === scrollDownRef.current) {
                    (trigger as ScrollTriggerInstanceWithKill).kill(true);
                }
            });
        };
    }, []); // Le tableau de dépendances vide assure que l'effet s'exécute une seule fois après le montage.

    return (
        // Utilisez la classe .hero-section si elle est définie dans Home.css pour la structure globale
        // ou .hero si les styles sont uniquement dans Hero.css
        <div ref={heroRef} className="hero"> {/* ou className="hero-section" */}
            {/* Utilisez .hero-content si vous avez un conteneur interne avec max-width, etc. */}
            {/* <div className="hero-content"> */}
            <h1 ref={titleRef} className="hero-title">
                Arcadis Tech
            </h1>
            <p ref={subtitleRef} className="hero-subtitle">
                Accélérez votre transformation digitale avec des solutions innovantes.
            </p>
            {/* </div> */}
            <div ref={scrollDownRef} className="scroll-down">
                <span>Scroll</span>
                <div className="arrow"></div>
            </div>
        </div>
    );
};

export default Hero;