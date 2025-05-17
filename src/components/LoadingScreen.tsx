// src/components/LoadingScreen.tsx
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import '../styles/LoadingScreen.css';

interface LoadingScreenProps {
    onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 3000;
        const interval = 20;
        const steps = duration / interval;
        let step = 0;

        const loadingInterval = setInterval(() => {
            step++;
            // Calculate progress with easing
            const ratio = step / steps;
            const newProgress = Math.min(Math.floor(ratio * 100), 99);
            setProgress(newProgress);

            if (step >= steps) {
                clearInterval(loadingInterval);
                // Explicitly set to 100% at the end
                setProgress(100);

                // Small delay to show 100%
                setTimeout(() => {
                    gsap.to(".loading-screen", {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: onLoadComplete
                    });
                }, 300);
            }
        }, interval);

        return () => clearInterval(loadingInterval);
    }, [onLoadComplete]);

    return (
        <div className="loading-screen">
            <div className="loading-container">
                <div className="loading-content">
                    <div className="loading-logo">
                        <h1>ARCADIS</h1>
                    </div>
                    <div className="loading-progress-container">
                        <div className="loading-progress-bar">
                            <div
                                className="loading-progress-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="loading-progress-text">
                            {progress}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;