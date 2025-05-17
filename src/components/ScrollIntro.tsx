import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollIntro = () => {
    useEffect(() => {
        gsap.fromTo(
            ".intro-text",
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                    trigger: ".intro-text",
                    start: "top 80%",
                    end: "bottom top",
                    scrub: 1,
                },
            }
        );
    }, []);

    return (
        <div className="intro-text">
            <h1>Bienvenue sur Arcadis Tech</h1>
            <p>Notre technologie vous propulse vers l'avenir</p>
        </div>
    );
};

export default ScrollIntro;
