// src/Site.tsx
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import Amazonia from './components/Amazonia.js';
import SyncLenisAndGSAP from './components/SyncLenisAndGSAP.js';
import { ReactNode, useEffect } from 'react';

interface SiteProps {
    children: ReactNode;
}

export default function Site({ children }: SiteProps) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
            {/* SyncLenisAndGSAP sera rendu comme un enfant de ReactLenis
                et pourra accéder à Lenis via useLenis() à l'intérieur. */}
            <SyncLenisAndGSAP />
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                {/* Canvas WebGL en arrière-plan */}
                <Amazonia />
            </div>

            <main style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </main>
        </ReactLenis>
    );
}