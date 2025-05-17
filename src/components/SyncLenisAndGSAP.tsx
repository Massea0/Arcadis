// src/components/SyncLenisAndGSAP.tsx
            import { useEffect } from "react";
            import Lenis from "@studio-freight/lenis";
            import { gsap } from "gsap";
            import { ScrollTrigger } from "gsap/ScrollTrigger";

            gsap.registerPlugin(ScrollTrigger);

            // Define a proper interface for Lenis options matching the library's structure
            interface LenisOptions {
                wrapper?: HTMLElement | Window;
                content?: HTMLElement;
                wheelEventsTarget?: HTMLElement | Window | null;
                smoothWheel?: boolean;
                smoothTouch?: boolean;
                touchMultiplier?: number;
                wheelMultiplier?: number;
                duration?: number;
                easing?: (t: number) => number;
                lerp?: number;
                infinite?: boolean;
                gestureOrientation?: 'vertical' | 'horizontal' | 'both';
                orientation?: 'vertical' | 'horizontal';
                smooth?: boolean;
            }

            // Define a proper interface for scrollTo options
            interface ScrollToOptions {
                offset?: number;
                immediate?: boolean;
                duration?: number;
                easing?: (t: number) => number;
            }

            // Define proper type for ScrollTrigger instance
            interface ScrollTriggerInstance {
                progress: number;
                direction: number;
                isActive: boolean;
                animation?: gsap.core.Animation;
                trigger: Element;
                start: string;
                end: string;
                kill: () => void;
            }

            const SyncLenisAndGSAP = () => {
                useEffect(() => {
                    // Set the dark turquoise blue background color
                    document.body.style.backgroundColor = "#0A3845";

                    // Update the canvas background in Amazonia component to match the theme
                    const canvasElement = document.querySelector(".amazonia-canvas-container canvas");
                    if (canvasElement) {
                        (canvasElement as HTMLElement).style.background =
                            "linear-gradient(to bottom, #051620, #0A3845)";
                    }

                    // Create Lenis instance with the properly typed options
                    const lenis = new Lenis({
                        duration: 1.2,
                        smooth: true,
                        wheelMultiplier: 1,
                        smoothTouch: false,
                        touchMultiplier: 2
                    } as LenisOptions);

                    // Function to handle scroll animation
                    const onScroll = (time: number) => {
                        lenis.raf(time);
                    };

                    // Sync Lenis with GSAP's ScrollTrigger
                    const lenisScrollTrigger = ScrollTrigger.create({
                        trigger: document.body,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                        onUpdate: (self: ScrollTriggerInstance) => {
                            lenis.scrollTo(self.progress * document.body.scrollHeight, {
                                duration: 0.1
                            } as ScrollToOptions);
                        }
                    });

                    // Create connection between Lenis and ScrollTrigger
                    ScrollTrigger.refresh();

                    // Create a variable to monitor scroll speed for star movement
                    let scrollSpeed = 0;
                    let lastScrollTop = 0;

                    // Add listener to track scroll speed for star field movement
                    const handleScroll = () => {
                        const st = window.scrollY;
                        scrollSpeed = Math.abs(st - lastScrollTop);
                        lastScrollTop = st;

                        // Emit custom event that StarsParallax can listen to
                        window.dispatchEvent(new CustomEvent('scrollSpeedChange', {
                            detail: { speed: scrollSpeed }
                        }));
                    };

                    window.addEventListener('scroll', handleScroll);

                    // Animation frame loop
                    const requestId = requestAnimationFrame(onScroll);

                    return () => {
                        // Clean up when component unmounts
                        window.removeEventListener('scroll', handleScroll);
                        lenisScrollTrigger.kill();
                        lenis.destroy();
                        cancelAnimationFrame(requestId);

                        // Reset background color if needed when component unmounts
                        document.body.style.backgroundColor = "";
                    };
                }, []);

                return null;
            };

            export default SyncLenisAndGSAP;