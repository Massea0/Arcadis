import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/HorizontalScrollText.css';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollText: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const container = containerRef.current;
        const textItems = textRef.current;
        const textWidth = textItems.scrollWidth;
        const windowWidth = window.innerWidth;

        const scrollDistance = textWidth - windowWidth;

        gsap.to(textItems, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: () => `+=${scrollDistance + windowWidth}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                // Removed snap for smoother scrolling
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="horizontal-scroll-container">
            <div ref={textRef} className="horizontal-scroll-text">
                <div className="scroll-text-item">
                    <h2 className="scroll-text-heading">Innovation</h2>
                    <p className="scroll-text-paragraph">
                        Notre mission est de repousser les frontières du possible en développant
                        des solutions qui transforment votre façon de travailler et d'interagir
                        avec votre environnement numérique.
                    </p>
                    <a href="#services" className="cta-button">Découvrir</a>
                    <div className="decorative-line"></div>
                </div>
                <div className="scroll-text-item">
                    <h2 className="scroll-text-heading">Excellence</h2>
                    <p className="scroll-text-paragraph">
                        Nous visons l'excellence dans chaque ligne de code, chaque interface
                        utilisateur et chaque solution que nous développons, en nous assurant
                        qu'elles dépassent vos attentes.
                    </p>
                    <a href="#about" className="cta-button">En savoir plus</a>
                    <div className="decorative-line"></div>
                </div>
                <div className="scroll-text-item">
                    <h2 className="scroll-text-heading">Partenariat</h2>
                    <p className="scroll-text-paragraph">
                        Nous croyons en la création de partenariats durables avec nos clients,
                        en travaillant en étroite collaboration pour comprendre vos besoins et
                        vous accompagner dans votre croissance.
                    </p>
                    <a href="#contact" className="cta-button">Nous contacter</a>
                    <div className="decorative-line"></div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalScrollText;