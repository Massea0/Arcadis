// src/components/SyncLenisAndGSAP.tsx
import { useEffect } from "react";
import { useLenis } from '@studio-freight/react-lenis'; // Hook pour accéder à l'instance Lenis
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SyncLenisAndGSAP = () => {
    const lenis = useLenis(); // Récupère l'instance Lenis fournie par <ReactLenis>

    useEffect(() => {
        if (!lenis) {
            // Si Lenis n'est pas encore initialisé, ne rien faire.
            // Cela peut arriver brièvement au montage.
            return;
        }

        // Fonction pour mettre à jour ScrollTrigger lors d'un événement de défilement de Lenis
        const updateScrollTrigger = (e: any) => {
            ScrollTrigger.update(e);
        };

        // S'abonner à l'événement 'scroll' de Lenis
        lenis.on('scroll', updateScrollTrigger);

        // Configurer le ticker de GSAP pour qu'il exécute la boucle de rendu de Lenis (raf)
        // et pour désactiver le lissage du lag du ticker de GSAP, ce qui peut aider avec la synchro.
        // Note : lenis.raf attend le temps en millisecondes.
        const GsaptickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        }
        gsap.ticker.add(GsaptickerCallback);
        gsap.ticker.lagSmoothing(0);

        // Forcer un rafraîchissement de ScrollTrigger après un court délai
        // pour s'assurer que toutes les dimensions et positions sont correctement calculées.
        const refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100); // Un délai de 100ms est généralement suffisant.

        // Fonction de nettoyage pour useEffect
        return () => {
            // Se désabonner de l'événement 'scroll' de Lenis
            lenis.off('scroll', updateScrollTrigger);
            // Retirer la fonction du ticker GSAP
            gsap.ticker.remove(GsaptickerCallback);
            // Annuler le timeout si le composant est démonté avant son exécution
            clearTimeout(refreshTimeout);

            // Optionnel : Tuer tous les ScrollTriggers. Peut être trop agressif si d'autres composants
            // gèrent leurs propres ScrollTriggers indépendamment.
            // ScrollTrigger.killAll();
        };
    }, [lenis]); // Cet effet se ré-exécutera si l'instance de Lenis change.

    return null; // Ce composant est purement fonctionnel et ne rend rien dans le DOM.
};

export default SyncLenisAndGSAP;
