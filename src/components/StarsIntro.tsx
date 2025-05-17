import  { useEffect, useRef } from 'react';
        import { gsap } from 'gsap';
        import { ScrollTrigger } from 'gsap/ScrollTrigger';
        import StarsParallax from './StarsParallax.js';
        import '../styles/StarsIntro.css';

        gsap.registerPlugin(ScrollTrigger);

        interface StarsIntroProps {
          onComplete: () => void;
        }

        const StarsIntro = ({ onComplete }: StarsIntroProps) => {
          const containerRef = useRef<HTMLDivElement>(null);
          const logoRef = useRef<HTMLImageElement>(null);

          useEffect(() => {
            const timeline = gsap.timeline({
              onComplete: () => {
                setTimeout(onComplete, 2000); // Delay before transitioning out
              },
            });

            // Fade in the container
            timeline.fromTo(
              containerRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 1.5 }
            );

            // Animate the logo
            timeline.fromTo(
              logoRef.current,
              { scale: 0.8, opacity: 0, y: 50 },
              { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
            );

            // Scroll-triggered animation for stars and logo
            gsap.to(logoRef.current, {
              y: -100,
              scale: 0.9,
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            });

            return () => {
              timeline.kill();
              ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
          }, [onComplete]);

          return (
            <div className="stars-intro" ref={containerRef}>
              <StarsParallax />
              <div className="logo-container">
                <img
                  ref={logoRef}
                  src="/logo.png"
                  alt="Arcadis Logo"
                  className="intro-logo"
                />
              </div>
            </div>
          );
        };

        export default StarsIntro;