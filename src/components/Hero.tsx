// src/components/Hero.tsx
                    import React, { useEffect, useRef } from 'react';
                    import gsap from 'gsap';
                    import ScrollTrigger from 'gsap/ScrollTrigger';
                    import '../styles/Hero.css';

                    gsap.registerPlugin(ScrollTrigger);

                    // Define ScrollTrigger instance interface
                    interface ScrollTriggerInstance {
                        kill: () => void;
                    }

                    const Hero: React.FC = () => {
                        const heroRef = useRef<HTMLDivElement>(null);
                        const textRef = useRef<HTMLHeadingElement>(null);
                        const subTextRef = useRef<HTMLParagraphElement>(null);

                        useEffect(() => {
                            if (heroRef.current && textRef.current && subTextRef.current) {
                                const tl = gsap.timeline();

                                // Initial animation on page load
                                tl.fromTo(
                                    textRef.current,
                                    { opacity: 0, y: 100 },
                                    {
                                        opacity: 1,
                                        y: 0,
                                        duration: 1.2,
                                        ease: "power3.out"
                                    }
                                ).fromTo(
                                    subTextRef.current,
                                    { opacity: 0, y: 50 },
                                    {
                                        opacity: 1,
                                        y: 0,
                                        duration: 1,
                                        ease: "power3.out"
                                    },
                                    "-=0.8"
                                );

                                // Scroll effect
                                gsap.to([textRef.current, subTextRef.current], {
                                    y: -100,
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
                                ScrollTrigger.getAll().forEach((trigger: ScrollTriggerInstance) => trigger.kill());
                            };
                        }, []);

                        return (
                            <div ref={heroRef} className="hero">
                                <h1 ref={textRef} className="hero-title">
                                    Arcadis Tech
                                </h1>
                                <p ref={subTextRef} className="hero-subtitle">
                                    Accélérez votre transformation digitale avec des solutions innovantes.
                                </p>
                                <div className="scroll-down">
                                    <span>Scroll</span>
                                    <div className="arrow"></div>
                                </div>
                            </div>
                        );
                    };

                    export default Hero;