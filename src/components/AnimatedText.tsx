import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../styles/AnimatedText.css';

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    stagger?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
                                                       text,
                                                       className = '',
                                                       delay = 0,
                                                       duration = 0.8,
                                                       stagger = 0.03
                                                   }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const textElement = containerRef.current;
        const chars = textElement.textContent?.split('') || [];

        // Clear the text content for animation
        textElement.textContent = '';

        // Create span for each character
        chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            if (char === ' ') {
                charSpan.classList.add('space');
            }
            textElement.appendChild(charSpan);
        });

        // Animate characters
        gsap.fromTo(
            textElement.children,
            {
                opacity: 0,
                y: 30,
                rotateX: -90
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                stagger: stagger,
                duration: duration,
                delay: delay,
                ease: "back.out(1.7)",
            }
        );

        return () => {
            // Cleanup animation
            gsap.killTweensOf(textElement.children);
        };
    }, [text, delay, duration, stagger]);

    return (
        <div
            ref={containerRef}
            className={`animated-text ${className}`}
            aria-label={text}
        >
            {text}
        </div>
    );
};

export default AnimatedText;