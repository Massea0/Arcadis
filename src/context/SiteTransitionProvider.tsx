import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import '../styles/SiteTransition.css';

interface TransitionContextType {
    isTransitioning: boolean;
    startTransition: (callback: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType>({
    isTransitioning: false,
    startTransition: () => {},
});

export const useTransition = () => useContext(TransitionContext);

interface SiteTransitionProviderProps {
    children: React.ReactNode;
}

const SiteTransitionProvider: React.FC<SiteTransitionProviderProps> = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionOverlay, setTransitionOverlay] = useState<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        // Create overlay element if it doesn't exist yet
        if (!transitionOverlay) {
            const overlay = document.createElement('div');
            overlay.className = 'page-transition-overlay';
            document.body.appendChild(overlay);
            setTransitionOverlay(overlay);
        }

        return () => {
            // Cleanup on unmount
            if (transitionOverlay) {
                document.body.removeChild(transitionOverlay);
            }
        };
    }, []);

    // Handle route changes
    useEffect(() => {
        if (transitionOverlay) {
            // Enter animation
            const tl = gsap.timeline({
                onComplete: () => {
                    // Exit animation
                    gsap.to(transitionOverlay, {
                        y: '-100%',
                        duration: 0.8,
                        ease: 'power3.inOut',
                        onComplete: () => setIsTransitioning(false)
                    });
                }
            });

            setIsTransitioning(true);
            tl.set(transitionOverlay, { y: '100%' })
                .to(transitionOverlay, {
                    y: '0%',
                    duration: 0.8,
                    ease: 'power3.inOut'
                });

            // Scroll to top on page change
            window.scrollTo(0, 0);
        }
    }, [location.pathname, transitionOverlay]);

    // Function to manually trigger transitions
    const startTransition = (callback: () => void) => {
        if (transitionOverlay) {
            setIsTransitioning(true);

            // Enter animation
            gsap.timeline({
                onComplete: () => {
                    callback();
                    // Exit animation after callback
                    gsap.to(transitionOverlay, {
                        y: '-100%',
                        duration: 0.8,
                        ease: 'power3.inOut',
                        onComplete: () => setIsTransitioning(false)
                    });
                }
            }).set(transitionOverlay, { y: '100%' })
                .to(transitionOverlay, {
                    y: '0%',
                    duration: 0.8,
                    ease: 'power3.inOut'
                });
        }
    };

    return (
        <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
            {children}
        </TransitionContext.Provider>
    );
};

export default SiteTransitionProvider;