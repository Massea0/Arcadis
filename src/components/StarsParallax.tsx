// src/components/StarsParallax.tsx
                                    import { useRef, useMemo, useEffect, useState } from "react";
                                    import * as THREE from "three";
                                    import { useFrame, useThree } from "@react-three/fiber";
                                    import { gsap } from "gsap";
                                    import { ScrollTrigger } from "gsap/ScrollTrigger";

                                    gsap.registerPlugin(ScrollTrigger);

                                    interface ScrollSpeedEvent extends CustomEvent {
                                        detail: {
                                            speed: number;
                                        };
                                    }

                                    interface ScrollTriggerInstance {
                                        kill: () => void;
                                    }

                                    const StarsParallax = () => {
                                        const points = useRef<THREE.Points>(null);
                                        const { camera } = useThree();
                                        const particlesCount = 30000;
                                        const [scrollSpeed, setScrollSpeed] = useState(0);
                                        const baseSpeed = 0.02;
                                        const maxSpeedMultiplier = 8;

                                        const positions = useMemo(() => {
                                            const pos = new Float32Array(particlesCount * 3);
                                            for (let i = 0; i < particlesCount; i++) {
                                                const i3 = i * 3;
                                                pos[i3] = (Math.random() - 0.5) * 400;
                                                pos[i3 + 1] = (Math.random() - 0.5) * 400;
                                                pos[i3 + 2] = (Math.random() - 0.5) * 500;
                                            }
                                            return pos;
                                        }, []);

                                        const sizes = useMemo(() => {
                                            const sizes = new Float32Array(particlesCount);
                                            for (let i = 0; i < particlesCount; i++) {
                                                const layer = Math.random();
                                                if (layer < 0.6) {
                                                    sizes[i] = Math.random() * 0.003 + 0.001;
                                                } else if (layer < 0.9) {
                                                    sizes[i] = Math.random() * 0.004 + 0.002;
                                                } else {
                                                    sizes[i] = Math.random() * 0.008 + 0.004;
                                                }
                                            }
                                            return sizes;
                                        }, []);

                                        const colors = useMemo(() => {
                                            const colors = new Float32Array(particlesCount * 3);
                                            for (let i = 0; i < particlesCount; i++) {
                                                const i3 = i * 3;
                                                const colorVar = Math.random();
                                                if (colorVar < 0.7) {
                                                    colors[i3] = 0.95 + Math.random() * 0.05;
                                                    colors[i3 + 1] = 0.95 + Math.random() * 0.05;
                                                    colors[i3 + 2] = 1.0;
                                                } else if (colorVar < 0.9) {
                                                    colors[i3] = 1.0;
                                                    colors[i3 + 1] = 0.92 + Math.random() * 0.08;
                                                    colors[i3 + 2] = 0.8 + Math.random() * 0.2;
                                                } else {
                                                    colors[i3] = 0.85 + Math.random() * 0.15;
                                                    colors[i3 + 1] = 1.0;
                                                    colors[i3 + 2] = 0.97 + Math.random() * 0.03;
                                                }
                                            }
                                            return colors;
                                        }, []);

                                        useEffect(() => {
                                            const handleScrollSpeed = (event: Event) => {
                                                const customEvent = event as ScrollSpeedEvent;
                                                setScrollSpeed(Math.min(customEvent.detail.speed / 30, maxSpeedMultiplier));
                                            };

                                            window.addEventListener('scrollSpeedChange', handleScrollSpeed);

                                            return () => {
                                                window.removeEventListener('scrollSpeedChange', handleScrollSpeed);
                                            };
                                        }, []);

                                        useEffect(() => {
                                            const tl = gsap.timeline({
                                                scrollTrigger: {
                                                    trigger: "body",
                                                    start: "top top",
                                                    end: "bottom bottom",
                                                    scrub: 1,
                                                },
                                            });

                                            tl.to(camera.position, {
                                                y: -10,
                                                z: 35,
                                                duration: 3,
                                                ease: "power1.inOut",
                                            }).to(camera.rotation, {
                                                x: 0.1,
                                                duration: 3,
                                                ease: "power1.inOut",
                                            }, "<");

                                            return () => {
                                                if (typeof ScrollTrigger !== 'undefined') {
                                                    ScrollTrigger.getAll().forEach((trigger: ScrollTriggerInstance) => {
                                                        trigger.kill();
                                                    });
                                                }
                                            };
                                        }, [camera]);

                                        useFrame(({ clock }) => {
                                            if (!points.current) return;

                                            const positions = points.current.geometry.attributes.position;
                                            const array = positions.array as Float32Array;
                                            const time = clock.getElapsedTime();

                                            const currentSpeed = baseSpeed * (1 + scrollSpeed);

                                            for (let i = 0; i < particlesCount; i++) {
                                                const i3 = i * 3;
                                                const depth = Math.abs(array[i3 + 2]);
                                                const layerSpeed = currentSpeed * (1 - depth / 500);
                                                array[i3 + 2] -= layerSpeed * (0.5 + Math.random() * 0.5);
                                                array[i3] += Math.sin(time * 0.1 + i * 0.01) * 0.01;
                                                array[i3 + 1] += Math.cos(time * 0.1 + i * 0.01) * 0.01;

                                                if (array[i3 + 2] < -250) {
                                                    array[i3 + 2] = 250;
                                                    array[i3] = (Math.random() - 0.5) * 400;
                                                    array[i3 + 1] = (Math.random() - 0.5) * 400;
                                                }
                                            }

                                            positions.needsUpdate = true;
                                        });

                                        return (
                                            <points ref={points}>
                                                <bufferGeometry>
                                                    <bufferAttribute
                                                        attach="attributes-position"
                                                        args={[positions, 3]}
                                                    />
                                                    <bufferAttribute
                                                        attach="attributes-size"
                                                        args={[sizes, 1]}
                                                    />
                                                    <bufferAttribute
                                                        attach="attributes-color"
                                                        args={[colors, 3]}
                                                    />
                                                </bufferGeometry>
                                                <pointsMaterial
                                                    args={[{ size: 0.3, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 1.0, depthWrite: false, blending: THREE.AdditiveBlending }]}
                                                />
                                            </points>
                                        );
                                    };

                                    export default StarsParallax;