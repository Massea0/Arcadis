import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/HorizontalScrollText.css'; // Assurez-vous que le chemin est correct

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollText: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Vérification que les références existent
        if (!containerRef.current || !textRef.current) {
            console.warn("HorizontalScrollText: Container or text ref is not available.");
            return;
        }

        const container = containerRef.current;
        const textItems = Array.from(textRef.current.children) as HTMLElement[]; // Convertir en Array pour forEach

        // Vérification qu'il y a des éléments à faire défiler
        if (textItems.length === 0) {
            console.warn("HorizontalScrollText: No text items found to scroll.");
            return;
        }

        let textWidth = 0;
        textItems.forEach(item => {
            textWidth += item.offsetWidth;
        });

        const windowWidth = window.innerWidth;
        const scrollDistance = textWidth - windowWidth;

        // Si la distance de défilement est négative ou nulle, il n'y a rien à faire défiler.
        if (scrollDistance <= 0) {
            console.warn(`HorizontalScrollText: scrollDistance is not positive (textWidth: ${textWidth}, windowWidth: ${windowWidth}, scrollDistance: ${scrollDistance}). No scroll animation will be applied.`);
            // Optionnel: Vous pourriez vouloir masquer le conteneur ou le désactiver
            // si aucun défilement n'est nécessaire, ou simplement ne pas créer l'animation.
            return;
        }

        // Création de l'animation GSAP
        const horizontalAnimation = gsap.to(textRef.current, {
            x: -scrollDistance, // Déplacement vers la gauche
            ease: "none",       // Animation linéaire
            scrollTrigger: {
                trigger: container, // L'élément qui déclenche l'animation
                start: "top top",   // Démarre quand le haut du trigger atteint le haut de la fenêtre
                end: () => `+=${scrollDistance + windowWidth}`, // Se termine après avoir défilé la distance + la largeur de la fenêtre
                // Cela assure que l'épinglage dure assez longtemps.
                pin: true,          // Épingle le `trigger` (container) pendant l'animation
                scrub: 0.5,         // Lie l'animation au défilement (0.5 pour un léger lissage)
                anticipatePin: 1,   // Aide à éviter les sauts lors de l'épinglage
                invalidateOnRefresh: true, // Recalcule lors du redimensionnement
                // markers: true, // Décommentez pour le débogage visuel des marqueurs GSAP
            },
        });

        // Fonction de nettoyage pour supprimer l'animation et le ScrollTrigger
        // lorsque le composant est démonté.
        return () => {
            console.log("HorizontalScrollText: Cleaning up GSAP animation and ScrollTrigger.");
            if (horizontalAnimation) {
                horizontalAnimation.kill(); // Tue l'animation GSAP
            }
            // ScrollTrigger.killAll() pourrait être trop agressif si d'autres ScrollTriggers existent.
            // Si vous avez plusieurs ScrollTriggers créés par ce composant (ce qui n'est pas le cas ici),
            // vous devriez les stocker et les tuer individuellement.
            // Pour un seul ScrollTrigger comme ici, tuer l'animation suffit généralement
            // car ScrollTrigger est lié à l'animation.
        };
    }, []); // Le tableau de dépendances vide signifie que l'effet s'exécute une fois après le montage initial.

    return (
        <div ref={containerRef} className="horizontal-scroll-container">
            <div ref={textRef} className="horizontal-scroll-text">
                {/* Section 1 */}
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
                {/* Section 2 */}
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
                {/* Section 3 */}
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

