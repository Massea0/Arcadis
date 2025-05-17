// src/components/StarField.tsx
                          import React, { useRef, useEffect } from 'react';
                          import * as THREE from 'three';

                          interface StarFieldProps {
                            count?: number;
                            size?: number;
                            color?: string;
                            speed?: number;
                            depth?: number;
                            className?: string;
                          }

                          const StarField: React.FC<StarFieldProps> = ({
                            count = 1000,
                            size = 0.1,
                            color = '#ffffff',
                            speed = 0.05,
                            depth = 50,
                            className = ''
                          }) => {
                            const containerRef = useRef<HTMLDivElement>(null);
                            const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

                            useEffect(() => {
                              if (!containerRef.current) return;

                              // Setup scene
                              const scene = new THREE.Scene();

                              // Setup camera
                              const camera = new THREE.PerspectiveCamera(
                                75,
                                containerRef.current.clientWidth / containerRef.current.clientHeight,
                                0.1,
                                1000
                              );
                              camera.position.z = 5;

                              // Setup renderer
                              const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                              renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
                              renderer.setClearColor(0x000000, 0); // Transparent background
                              containerRef.current.appendChild(renderer.domElement);
                              rendererRef.current = renderer;

                              // Create stars
                              const geometry = new THREE.BufferGeometry();
                              const positions = new Float32Array(count * 3);
                              const velocities = new Float32Array(count);

                              for (let i = 0; i < count; i++) {
                                // Position
                                const i3 = i * 3;
                                positions[i3] = (Math.random() - 0.5) * depth;     // x
                                positions[i3 + 1] = (Math.random() - 0.5) * depth; // y
                                positions[i3 + 2] = (Math.random() - 0.5) * depth; // z

                                // Velocity
                                velocities[i] = Math.random() * speed + 0.05;
                              }

                              geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

                              const material = new THREE.PointsMaterial({
                                color: color,
                                size: size,
                                transparent: true,
                                opacity: 0.8,
                                sizeAttenuation: true
                              });

                              const stars = new THREE.Points(geometry, material);
                              scene.add(stars);

                              // Animation loop
                              const animate = () => {
                                requestAnimationFrame(animate);

                                const positions = geometry.attributes.position.array as Float32Array;

                                for (let i = 0; i < count; i++) {
                                  const i3 = i * 3;
                                  positions[i3 + 2] += velocities[i]; // Move star in z direction

                                  // If star is too far, reset its position
                                  if (positions[i3 + 2] > depth / 2) {
                                    positions[i3] = (Math.random() - 0.5) * depth;
                                    positions[i3 + 1] = (Math.random() - 0.5) * depth;
                                    positions[i3 + 2] = -depth / 2;
                                  }
                                }

                                geometry.attributes.position.needsUpdate = true;

                                renderer.render(scene, camera);
                              };

                              animate();

                              // Handle window resize
                              const handleResize = () => {
                                if (!containerRef.current) return;

                                camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
                                camera.updateProjectionMatrix();
                                renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
                              };

                              window.addEventListener('resize', handleResize);

                              // Cleanup function
                              return () => {
                                window.removeEventListener('resize', handleResize);
                                if (containerRef.current && rendererRef.current) {
                                  containerRef.current.removeChild(rendererRef.current.domElement);
                                }
                                scene.remove(stars);
                                geometry.dispose();
                                material.dispose();
                              };
                            }, [count, size, color, speed, depth]);

                            return (
                              <div
                                ref={containerRef}
                                className={`starfield-container ${className}`}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  zIndex: 0,
                                  overflow: 'hidden',
                                  pointerEvents: 'none'
                                }}
                              />
                            );
                          };

                          export default StarField;