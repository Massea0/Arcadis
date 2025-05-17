// src/components/Amazonia.tsx
                                    import { Canvas } from '@react-three/fiber';
                                    import { Suspense } from 'react';
                                    import * as THREE from 'three';
                                    import '../styles/Amazonia.css';
                                    import StarsParallax from './StarsParallax.js';

                                    const Amazonia = () => {
                                        return (
                                            <div className="amazonia-canvas-container">
                                                <Canvas
                                                    dpr={[1, 2]}
                                                    camera={{ position: [0, 0, 30], fov: 70, near: 0.1, far: 1000 }}
                                                    style={{
                                                        background: 'linear-gradient(to bottom, #051620, #0A3845)',
                                                        width: '100%',
                                                        height: '100vh',
                                                        position: 'fixed',
                                                        top: 0,
                                                        left: 0
                                                    }}
                                                    gl={{
                                                        antialias: true,
                                                        alpha: false,
                                                        powerPreference: "high-performance"
                                                    }}
                                                >
                                                    <Suspense fallback={null}>
                                                        <primitive object={new THREE.AmbientLight(0xffffff, 0.1)} />
                                                        <StarsParallax />
                                                    </Suspense>
                                                </Canvas>
                                            </div>
                                        );
                                    };

                                    export default Amazonia;