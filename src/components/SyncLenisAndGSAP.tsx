// src/components/SyncLenisAndGSAP.tsx
import { useEffect } from "react";
import { useLenis } from '@studio-freight/react-lenis';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SyncLenisAndGSAP = () => {
    const lenis = useLenis(); // Récupère l'instance Lenis de ReactLenis

    useEffect(() => {
        if (!lenis) return;

        // Synchronisation de GSAP ScrollTrigger avec Lenis
        // Inspiré par la documentation de Lenis & GSAP
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Lenis attend le temps en millisecondes
        });

        gsap.ticker.lagSmoothing(0);

        // Forcer un rafraîchissement de ScrollTrigger après un court délai
        // pour s'assurer que tout est calculé correctement après le montage initial
        const timeoutId = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            // Nettoyage: supprimer les listeners et les tickers
            // lenis.off('scroll', ScrollTrigger.update); // Ne pas appeler off si cela cause des problèmes, Lenis pourrait gérer son propre nettoyage
            // gsap.ticker.remove(lenis.raf); // L'API de ticker peut varier, s'assurer que c'est la bonne méthode
            clearTimeout(timeoutId);
            // ScrollTrigger.killAll(); // Peut être trop agressif, mais utile si des ST persistent
        };
    }, [lenis]); // Se ré-exécute si l'instance lenis change

    return null; // Ce composant ne rend rien
};

export default SyncLenisAndGSAP;