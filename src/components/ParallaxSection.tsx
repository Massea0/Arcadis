// src/components/ParallaxSection.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ParallaxSection.css'; // Assurez-vous que le chemin est correct

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  bgColor?: string; // Rendre bgColor optionnel ou gérer 'transparent'
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
  const backgroundRef = useRef<HTMLDivElement>(null); // Référence pour le div d'arrière-plan de la section

  useEffect(() => {
    if (!sectionRef.current || !backgroundRef.current) return;

    const parallaxContainer = sectionRef.current;
    const parallaxBackgroundElement = backgroundRef.current; // Nom plus clair

    // Appliquer une couleur de fond à l'élément d'arrière-plan de la section
    // UNIQUEMENT si bgColor est fourni et n'est pas 'transparent'.
    // Cela permet à l'arrière-plan global (Amazonia) de transparaître.
    if (bgColor && bgColor !== 'transparent') {
      parallaxBackgroundElement.style.backgroundColor = bgColor;
    } else {
      // Si aucun bgColor n'est fourni ou s'il est 'transparent',
      // assurez-vous que l'arrière-plan de cette section est transparent.
      parallaxBackgroundElement.style.backgroundColor = 'transparent';
    }

    // Animation de parallaxe pour l'arrière-plan de la section (s'il a une couleur)
    const parallaxEffect = gsap.to(parallaxBackgroundElement, {
      y: () => depth * parallaxContainer.offsetHeight, // Décalage vertical basé sur la profondeur et la hauteur
      ease: "none",
      scrollTrigger: {
        trigger: parallaxContainer,
        start: "top bottom", // Commence quand le haut du conteneur atteint le bas de la fenêtre
        end: "bottom top",   // Se termine quand le bas du conteneur atteint le haut de la fenêtre
        scrub: true,         // Lie l'animation au défilement
        invalidateOnRefresh: true, // Recalcule au redimensionnement
      }
    });

    // Création des particules locales à cette ParallaxSection.
    // Soyez conscient que si Amazonia fournit déjà des étoiles globales,
    // ces particules pourraient être redondantes ou nécessiter un style différent pour se distinguer.
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'parallax-particles'; // CSS pour ces particules est dans ParallaxSection.css
    parallaxContainer.appendChild(particlesContainer);

    const particleAnimations: gsap.core.Tween[] = []; // Pour stocker les animations des particules pour le nettoyage

    // Créer un nombre réduit de particules pour l'instant (était 10) pour tester les performances.
    // Vous pouvez ajuster ce nombre.
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'parallax-particle';
      const size = 30 + Math.random() * 70; // Taille aléatoire
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = `${0.05 + Math.random() * 0.15}`; // Opacité plus faible pour être subtil
      // La couleur/apparence des particules est gérée par CSS via .parallax-particle
      particlesContainer.appendChild(particle);

      // Animation pour chaque particule
      const anim = gsap.to(particle, {
        y: 100 * (Math.random() - 0.5) * depth * 2, // Mouvement vertical aléatoire
        x: 100 * (Math.random() - 0.5) * depth,   // Mouvement horizontal aléatoire
        scale: 0.8 + Math.random() * 0.4,          // Changement d'échelle aléatoire
        scrollTrigger: {
          trigger: parallaxContainer,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
      particleAnimations.push(anim);
    }

    // Fonction de nettoyage pour useEffect
    return () => {
      // Supprimer le conteneur de particules du DOM
      if (particlesContainer.parentNode) {
        particlesContainer.parentNode.removeChild(particlesContainer);
      }
      // Tuer l'animation de l'arrière-plan de la section
      parallaxEffect.kill();
      // Tuer les animations de toutes les particules locales
      particleAnimations.forEach(anim => anim.kill());

      // Il est important de tuer les ScrollTriggers pour éviter les fuites de mémoire.
      // Normalement, .kill() sur une animation GSAP tue aussi son ScrollTrigger associé
      // si le ScrollTrigger a été créé par cette animation.
      // Si vous créez des ScrollTriggers séparément, ils doivent être tués explicitement.
    };
  }, [bgColor, depth]); // Dépendances de l'effet

  const combinedClassName = `parallax-section ${className}`.trim();

  return (
      // Le 'id' est utilisé pour la navigation par ancre
      <section ref={sectionRef} id={id} className={combinedClassName}>
        {/* Div pour l'arrière-plan spécifique à la section (peut être transparent) */}
        <div ref={backgroundRef} className="parallax-background" />
        {/* Contenu réel de la section */}
        <div className="parallax-content">
          {children}
        </div>
      </section>
  );
};

export default ParallaxSection;
