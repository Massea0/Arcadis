// src/components/ParallaxSection.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ParallaxSection.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  bgColor: string;
  depth: number;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
                                                           bgColor,
                                                           depth,
                                                           id,
                                                           className = '',
                                                           children
                                                         }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !backgroundRef.current) return;

    // Set initial background style
    const background = backgroundRef.current;
    background.style.backgroundColor = bgColor;

    // Create parallax effect for the background
    const parallaxEffect = gsap.to(background, {
      y: () => depth * sectionRef.current!.offsetHeight,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      }
    });

    // Create particles for visual effect
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'parallax-particles';
    sectionRef.current.appendChild(particlesContainer);

    // Create random particles
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'parallax-particle';

      // Random size between 50px and 150px
      const size = 50 + Math.random() * 100;

      // Position particles randomly
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = `${0.1 + Math.random() * 0.2}`;

      particlesContainer.appendChild(particle);

      // Animate each particle with slightly different properties
      gsap.to(particle, {
        y: 100 * (Math.random() - 0.5) * depth * 2,
        x: 100 * (Math.random() - 0.5) * depth,
        scale: 0.8 + Math.random() * 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    // Clean up
    return () => {
      if (particlesContainer.parentNode) {
        particlesContainer.parentNode.removeChild(particlesContainer);
      }

      if (parallaxEffect.scrollTrigger) {
        parallaxEffect.scrollTrigger.kill();
      }
    };
  }, [bgColor, depth]);

  const combinedClassName = `parallax-section ${className}`.trim();

  return (
      <section ref={sectionRef} id={id} className={combinedClassName}>
        <div
            ref={backgroundRef}
            className="parallax-background"
            style={{ backgroundColor: bgColor }}
        />
        <div className="parallax-content">
          {children}
        </div>
      </section>
  );
};

export default ParallaxSection;