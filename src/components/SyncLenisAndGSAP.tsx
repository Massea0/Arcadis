import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisOptions {
    wrapper?: HTMLElement | Window;
    content?: HTMLElement;
    wheelEventsTarget?: HTMLElement | Window | null;
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    wheelMultiplier?: number;
    duration?: number;
    easing?: (t: number) => number;
    lerp?: number;
    infinite?: boolean;
    gestureOrientation?: 'vertical' | 'horizontal' | 'both';
    orientation?: 'vertical' | 'horizontal';
    smooth?: boolean;
}

interface ScrollToOptions {
    offset?: number;
    immediate?: boolean;
    duration?: number;
    easing?: (t: number) => number;
}

interface ScrollTriggerInstance {
    progress: number;
    direction: number;
    isActive: boolean;
    animation?: gsap.core.Animation;
    trigger: Element;
    start: string;
    end: string;
    kill: () => void;
}

const SyncLenisAndGSAP = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#0A3845";

        const lenis = new Lenis({
            duration: 1.2,
            smooth: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2
        } as LenisOptions);

        const onScroll = () => { // Removed the 'time' parameter
            lenis.raf();
        };

        const lenisScrollTrigger = ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self: ScrollTriggerInstance) => {
                lenis.scrollTo(self.progress * document.body.scrollHeight, {
                    duration: 0.1
                } as ScrollToOptions);
            }
        });

        ScrollTrigger.refresh();

        let scrollSpeed = 0;
        let lastScrollTop = 0;

        const handleScroll = () => {
            const st = window.scrollY;
            scrollSpeed = Math.abs(st - lastScrollTop);
            lastScrollTop = st;

            window.dispatchEvent(new CustomEvent('scrollSpeedChange', {
                detail: { speed: scrollSpeed }
            }));
        };

        window.addEventListener('scroll', handleScroll);

        const requestId = requestAnimationFrame(onScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            lenisScrollTrigger.kill();
            lenis.destroy();
            cancelAnimationFrame(requestId);
            document.body.style.backgroundColor = "";
        };
    }, []);

    return null;
};

export default SyncLenisAndGSAP;
