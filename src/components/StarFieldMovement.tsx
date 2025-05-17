import { useFrame, useThree } from "@react-three/fiber";
    import { useRef, useEffect } from "react";

    interface StarFieldMovementProps {
        stars?: any | null;
    }

    const StarFieldMovement = ({ stars }: StarFieldMovementProps) => {
        const { camera } = useThree();
        const groupRef = useRef<any | null>(null);

        useEffect(() => {
            if (stars) {
                groupRef.current = stars;
            }
        }, [stars]);

        useFrame(() => {
            if (groupRef.current) {
                const scrollProgress = camera.position.z / 1000;
                groupRef.current.position.z = groupRef.current.position.z +
                    ((-scrollProgress * 500) - groupRef.current.position.z) * 0.05;
            }
        });

        return null;
    };

    export default StarFieldMovement;