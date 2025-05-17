// src/Site.tsx
import { ReactLenis } from '@studio-freight/react-lenis';
import Amazonia from './components/Amazonia.js';
import SyncLenisAndGSAP from './components/SyncLenisAndGSAP.js';
import { ReactNode } from 'react';

interface SiteProps {
    children: ReactNode;
}

export default function Site({ children }: SiteProps) {
    return (
        // Options pour Lenis : lerp pour la fluidité, duration pour la durée de l'animation de scroll-to,
        // smoothWheel pour le défilement à la molette.
        <ReactLenis root options={{ lerp: 0.07, duration: 1.5, smoothWheel: true, smoothTouch: false }}>
            {/* SyncLenisAndGSAP doit être un enfant de ReactLenis pour utiliser le hook useLenis */}
            <SyncLenisAndGSAP />

            {/* Arrière-plan WebGL fixe */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw', // Assure que ça prend toute la largeur de la fenêtre
                height: '100vh', // Assure que ça prend toute la hauteur de la fenêtre
                zIndex: -1, // Derrière tout le reste du contenu
            }}>
                <Amazonia />
            </div>

            {/* Contenu principal du site */}
            {/* zIndex: 1 pour s'assurer qu'il est au-dessus de l'arrière-plan Amazonia */}
            <main style={{ position: 'relative', zIndex: 1, width: '100%', overflowX: 'hidden' }}>
                {children}
            </main>
        </ReactLenis>
    );
}
