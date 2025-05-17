import gsap from "gsap";
import { useEffect } from "react";

const AnimateScroll = () => {
    useEffect(() => {
        gsap.fromTo(".section", {
            opacity: 0,
            y: 100,
        }, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: ".section",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
    }, []);

    return (
        <div className="section">
            <h2>Votre contenu ici</h2>
        </div>
    );
};

export default AnimateScroll;
