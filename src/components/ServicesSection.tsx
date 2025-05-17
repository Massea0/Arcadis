// src/components/ServicesSection.tsx
  import React, { useRef, useEffect, useState } from "react";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import ParallaxSection from "./ParallaxSection.js";
  import { fixSpotlightRendering } from "../utils/spotlightFix.js";
  import "../styles/ServicesSection.css";

  gsap.registerPlugin(ScrollTrigger);

  // Define ScrollTrigger instance interface
  interface ScrollTriggerInstance {
    vars: {
      trigger: any;
    };
    kill: () => void;
  }

  interface ServiceItemProps {
    title: string;
    description: string;
    details: string;
    icon?: string;
  }

  const ServiceItem: React.FC<ServiceItemProps> = ({ title, description, details, icon }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className={`service-card ${expanded ? "expanded" : ""}`}
            onClick={() => setExpanded(!expanded)}
        >
          {icon && <div className="service-icon">{icon}</div>}
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="service-details">
            <p>{details}</p>
            <button className="learn-more-btn">En savoir plus</button>
          </div>
        </div>
    );
  };

  interface ServicesSectionProps {
    id?: string;
    bgColor?: string;
    services: ServiceItemProps[];
  }

  const ServicesSection: React.FC<ServicesSectionProps> = ({
                                                             id = "services",
                                                             bgColor = "#051620",
                                                             services
                                                           }) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Apply spotlight effect
      const cleanupSpotlight = fixSpotlightRendering();

      // Animate section title on scroll
      if (sectionRef.current) {
        const title = sectionRef.current.querySelector(".section-title");
        if (title) {
          gsap.fromTo(
              title,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                  trigger: title,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
          );
        }

        // Animate service cards on scroll
        const cards = sectionRef.current.querySelectorAll(".service-card");
        gsap.fromTo(
            cards,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
        );
      }

      return () => {
        // Clean up ScrollTrigger instances and spotlight effect
        ScrollTrigger.getAll().forEach((trigger: ScrollTriggerInstance) => {
          if (trigger.vars.trigger === sectionRef.current) {
            trigger.kill();
          }
        });
        cleanupSpotlight();
      };
    }, []);

    return (
        <ParallaxSection
            bgColor={bgColor}
            depth={0.1}
            id={id}
        >
          <div className="section-content" ref={sectionRef}>
            <h2 className="section-title">Nos Services</h2>
            <div className="services-grid">
              {services.map((service, index) => (
                  <ServiceItem
                      key={index}
                      title={service.title}
                      description={service.description}
                      details={service.details}
                      icon={service.icon}
                  />
              ))}
            </div>
          </div>
        </ParallaxSection>
    );
  };

  export default ServicesSection;