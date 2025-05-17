// src/types/studio-freight__lenis.d.ts
declare module '@studio-freight/lenis' {
    export interface LenisOptions {
        duration?: number;
        easing?: (t: number) => number;
        smooth?: boolean;
        mouseMultiplier?: number;
        smoothTouch?: boolean;
        touchMultiplier?: number;
        direction?: 'vertical' | 'horizontal';
        gestureDirection?: 'vertical' | 'horizontal' | 'both';
        infinite?: boolean;
        orientation?: 'vertical' | 'horizontal';
        wheelEventsTarget?: HTMLElement | Window | null;
        wrapper?: HTMLElement | Window;
        content?: HTMLElement;
        // Add any missing properties
    }

    export default class Lenis {
        constructor(options?: LenisOptions);
        start(): void;
        stop(): void;
        destroy(): void;
        raf(time: number): void;
        scrollTo(
            target: number | string | HTMLElement,
            options?: {
                offset?: number;
                immediate?: boolean;
                duration?: number;
                easing?: (t: number) => number;
            }
        ): void;
    }
}