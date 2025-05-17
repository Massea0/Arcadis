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
        <ReactLenis root options={{ duration: 1.2, smooth: true }}>
            <div style={{ position: 'relative', zIndex: 0 }}>
                {/* Canvas WebGL en arrière-plan */}
                <Amazonia />
                <SyncLenisAndGSAP />
            </div>

            <main style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </main>
        </ReactLenis>
    );
}