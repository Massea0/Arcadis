// src/pages/Contact.tsx
                                import React, { useEffect, useRef, useState } from 'react';
                                import { gsap } from 'gsap';
                                import { ScrollTrigger } from 'gsap/ScrollTrigger';
                                import ParallaxSection from '../components/ParallaxSection.js';
                                import '../styles/Contact.css';

                                gsap.registerPlugin(ScrollTrigger);

                                interface ScrollTriggerInstance {
                                    kill: () => void;
                                }

                                const Contact: React.FC = () => {
                                    const [formState, setFormState] = useState({
                                        name: '',
                                        email: '',
                                        subject: '',
                                        message: ''
                                    });
                                    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

                                    const headingRef = useRef<HTMLHeadingElement>(null);
                                    const formRef = useRef<HTMLFormElement>(null);
                                    const infoRef = useRef<HTMLDivElement>(null);

                                    useEffect(() => {
                                        if (headingRef.current) {
                                            gsap.fromTo(
                                                headingRef.current,
                                                { opacity: 0, y: 50 },
                                                {
                                                    opacity: 1,
                                                    y: 0,
                                                    duration: 1.2,
                                                    ease: "power3.out",
                                                    scrollTrigger: {
                                                        trigger: headingRef.current,
                                                        start: "top 80%",
                                                        toggleActions: "play none none reverse",
                                                    },
                                                }
                                            );
                                        }

                                        if (formRef.current) {
                                            const formElements = formRef.current.querySelectorAll('input, textarea, button');
                                            gsap.fromTo(
                                                formElements,
                                                { opacity: 0, y: 20 },
                                                {
                                                    opacity: 1,
                                                    y: 0,
                                                    stagger: 0.1,
                                                    duration: 0.8,
                                                    ease: "power2.out",
                                                    scrollTrigger: {
                                                        trigger: formRef.current,
                                                        start: "top 70%",
                                                        toggleActions: "play none none reverse",
                                                    },
                                                }
                                            );
                                        }

                                        if (infoRef.current) {
                                            const infoItems = infoRef.current.querySelectorAll('.contact-info-item');
                                            gsap.fromTo(
                                                infoItems,
                                                { opacity: 0, x: -30 },
                                                {
                                                    opacity: 1,
                                                    x: 0,
                                                    stagger: 0.2,
                                                    duration: 0.8,
                                                    ease: "power2.out",
                                                    scrollTrigger: {
                                                        trigger: infoRef.current,
                                                        start: "top 70%",
                                                        toggleActions: "play none none reverse",
                                                    },
                                                }
                                            );
                                        }

                                        return () => {
                                            ScrollTrigger.getAll().forEach((trigger: ScrollTriggerInstance) => trigger.kill());
                                        };
                                    }, []);

                                    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                        const { name, value } = e.target;
                                        setFormState(prev => ({ ...prev, [name]: value }));
                                    };

                                    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                                        e.preventDefault();
                                        setFormStatus('submitting');

                                        setTimeout(() => {
                                            console.log('Form submitted:', formState);
                                            setFormStatus('success');
                                            setFormState({ name: '', email: '', subject: '', message: '' });

                                            setTimeout(() => {
                                                setFormStatus('idle');
                                            }, 5000);
                                        }, 1500);
                                    };

                                    return (
                                        <div className="contact-page">
                                            <ParallaxSection
                                                bgColor="#051620"
                                                depth={0.1}
                                                id="contact-header"
                                                className="contact-header-parallax"
                                            >
                                                <div className="contact-header">
                                                    <h1 ref={headingRef} className="contact-title">Contactez-nous</h1>
                                                    <p className="contact-subtitle">
                                                        Vous avez une question ou un projet à discuter ? Notre équipe est là pour vous aider.
                                                        Remplissez le formulaire ci-dessous ou utilisez nos coordonnées directes.
                                                    </p>
                                                </div>
                                            </ParallaxSection>

                                            <ParallaxSection
                                                bgColor="#072635"
                                                depth={0.15}
                                                id="contact-form-section"
                                                className="contact-form-parallax"
                                            >
                                                <div className="contact-form-section">
                                                    <div className="contact-grid">
                                                        <div className="contact-form-container">
                                                            <h2>Envoyez-nous un message</h2>
                                                            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                                                                <div className="form-group">
                                                                    <label htmlFor="name">Nom</label>
                                                                    <input
                                                                        type="text"
                                                                        id="name"
                                                                        name="name"
                                                                        value={formState.name}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="email">Email</label>
                                                                    <input
                                                                        type="email"
                                                                        id="email"
                                                                        name="email"
                                                                        value={formState.email}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="subject">Sujet</label>
                                                                    <input
                                                                        type="text"
                                                                        id="subject"
                                                                        name="subject"
                                                                        value={formState.subject}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="message">Message</label>
                                                                    <textarea
                                                                        id="message"
                                                                        name="message"
                                                                        rows={6}
                                                                        value={formState.message}
                                                                        onChange={handleChange}
                                                                        required
                                                                    ></textarea>
                                                                </div>
                                                                <button
                                                                    type="submit"
                                                                    className={`submit-button ${formStatus === 'submitting' ? 'submitting' : ''}`}
                                                                    disabled={formStatus === 'submitting'}
                                                                >
                                                                    {formStatus === 'submitting' ? 'Envoi en cours...' : 'Envoyer'}
                                                                </button>

                                                                {formStatus === 'success' && (
                                                                    <div className="form-success-message">
                                                                        Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                                                                    </div>
                                                                )}

                                                                {formStatus === 'error' && (
                                                                    <div className="form-error-message">
                                                                        Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.
                                                                    </div>
                                                                )}
                                                            </form>
                                                        </div>

                                                        <div ref={infoRef} className="contact-info">
                                                            <h2>Nos Coordonnées</h2>
                                                            <div className="contact-info-item">
                                                                <div className="contact-info-icon">✉️</div>
                                                                <div className="contact-info-content">
                                                                    <h3>Email</h3>
                                                                    <a href="mailto:contact@arcadis.tech">contact@arcadis.tech</a>
                                                                </div>
                                                            </div>
                                                            <div className="contact-info-item">
                                                                <div className="contact-info-icon">📞</div>
                                                                <div className="contact-info-content">
                                                                    <h3>Téléphone</h3>
                                                                    <a href="tel:+221771980224">+221 771980224</a>
                                                                </div>
                                                            </div>
                                                            <div className="contact-info-item">
                                                                <div className="contact-info-icon">📍</div>
                                                                <div className="contact-info-content">
                                                                    <h3>Adresse</h3>
                                                                    <address>1210 Rue GY232<br />Dakar, Sénégal</address>
                                                                </div>
                                                            </div>
                                                            <div className="contact-info-item">
                                                                <div className="contact-info-icon">⏰</div>
                                                                <div className="contact-info-content">
                                                                    <h3>Heures d'ouverture</h3>
                                                                    <p>Lundi - Vendredi<br />9:00 - 18:00</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ParallaxSection>

                                            <ParallaxSection
                                                bgColor="#051620"
                                                depth={0.2}
                                                id="map-section"
                                                className="map-parallax"
                                            >
                                                <div className="map-section">
                                                    <h2 className="section-title">Nous trouver</h2>
                                                    <div className="map-container">
                                                        <div className="map-placeholder">
                                                            <span>Carte interactive</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ParallaxSection>
                                        </div>
                                    );
                                };

                                export default Contact;