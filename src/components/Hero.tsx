// src/components/Hero.tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Hero.css'; // Importation du CSS spécifique au Hero

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerInstanceWithKill extends gsap.core.ScrollTrigger {
    kill: (soft?: boolean, preserveStyles?: boolean) => void;
}

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const scrollDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current && titleRef.current && subtitleRef.current && scrollDownRef.current) {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 70 },
                { opacity: 1, y: 0, duration: 1 }
            )
                .fromTo(
                    subtitleRef.current,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=0.7"
                )
                .fromTo(
                    scrollDownRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 0.7, y: 0, duration: 0.6 },
                    "-=0.5"
                );

            gsap.to([titleRef.current, subtitleRef.current, scrollDownRef.current], {
                yPercent: -50,
                opacity: 0,
                ease: "power2.in",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                const typedTrigger = trigger as ScrollTriggerInstanceWithKill;
                if (typedTrigger.trigger === heroRef.current ||
                    typedTrigger.trigger === titleRef.current ||
                    typedTrigger.trigger === subtitleRef.current ||
                    typedTrigger.trigger === scrollDownRef.current) {
                    typedTrigger.kill(true);
                }
            });
        };
    }, []);

    return (
        // La classe "hero" est stylée dans Hero.css
        <div ref={heroRef} className="hero">
            {/* Ces classes doivent correspondre à celles définies dans Hero.css */}
            <h1 ref={titleRef} className="hero-title">
                Arcadis Tech
            </h1>
            <p ref={subtitleRef} className="hero-subtitle">
                Accélérez votre transformation digitale avec des solutions innovantes.
            </p>
            <div ref={scrollDownRef} className="scroll-down">
                <span>Scroll</span>
                <div className="arrow"></div>
            </div>
        </div>
    );
};

export default Hero;
