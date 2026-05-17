import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import StatCard from '../components/StatCard';
import CircuitPattern from '../components/CircuitPattern';
import { AboutBrainAnimation } from '../components/BrainAnimation';

const About = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const stats = [
    { number: "27", label: "Projects Built", desc: "Real ML apps, deployed live" },
    { number: "1", label: "Cohort. Real World ML.", desc: "Students building, not just learning" },
    { number: "100%", label: "Deployed on Streamlit", desc: "Every project publicly accessible" }
  ];

  useEffect(() => {
    // Headline chars reveal using IntersectionObserver (works with Lenis)
    const chars = headlineRef.current.querySelectorAll('.char');
    const headObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(chars,
          { y: 60, opacity: 0, rotateX: -30, filter: 'blur(5px)' },
          { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', stagger: 0.04, duration: 1, ease: 'power3.out' }
        );
        headObs.disconnect();
      }
    }, { threshold: 0.3 });
    headObs.observe(headlineRef.current);

    // Cards reveal
    const cards = Array.from(cardsContainerRef.current.children);
    const cardObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(cards,
          { y: 80, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' }
        );
        cardObs.disconnect();
      }
    }, { threshold: 0.2 });
    cardObs.observe(cardsContainerRef.current);

    return () => { headObs.disconnect(); cardObs.disconnect(); };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section"
    >
      <div className="about-background">
        <div className="about-overlay" />
        <div className="about-vignette" />
      </div>

      <CircuitPattern />

      <div className="container relative z-10 max-w-6xl w-full">
        <h2
          ref={headlineRef}
          className="about-title"
        >
          {"What is MLverse?".split("").map((char, index) => (
            <span key={index} className="char inline-block" style={{ minWidth: char === " " ? "0.3em" : "auto" }}>
              {char}
            </span>
          ))}
        </h2>

        <div className="about-content-wrapper">
          <div className="about-text-content">
            <div className="about-text-backdrop">
              <p className="about-description">
                MLverse is a sprawling digital ecosystem of <span className="highlight">27 specialized Machine Learning projects</span>,
                each built with precision and deployed to solve real-world problems.
                From deep neural networks to advanced clustering algorithms,
                this universe represents the pinnacle of AI innovation at SIN School of AI.
              </p>
              <div className="vision-box">
                <span className="vision-tag">THE MISSION</span>
                <p>To bridge the gap between complex ML theory and functional, deployable applications that anyone can use.</p>
              </div>
            </div>
          </div>

          <div
            ref={cardsContainerRef}
            className="stat-grid"
          >
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                number={stat.number}
                label={stat.label}
                description={stat.desc}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .about-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6rem 5%;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .about-section {
            padding: 8rem 6%;
          }
        }

        .about-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .about-overlay {
          position: absolute;
          inset: 0;
          background: transparent;
          pointer-events: none;
          z-index: 1;
        }

        .about-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 20%,
            rgba(5, 10, 26, 0.9) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        .about-brain-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .about-brain-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
          filter: contrast(1.1) brightness(0.6) saturate(1.05);
        }

        .about-brain-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(5, 10, 26, 0.55) 0%,
            transparent 25%,
            transparent 65%,
            rgba(5, 10, 26, 0.7) 100%
          );
          pointer-events: none;
        }

        .about-brain-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 25%,
            rgba(5, 10, 26, 0.65) 100%
          );
          pointer-events: none;
        }

        .about-section::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(0, 245, 255, 0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 3;
        }

        .about-title {
          font-size: clamp(2rem, 8vw, 4.5rem);
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          color: white;
          text-shadow: 
            0 0 30px rgba(0, 245, 255, 0.3),
            0 0 60px rgba(0, 245, 255, 0.1);
          position: relative;
          z-index: 10;
        }

        .about-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .about-content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          width: 100%;
        }

        .about-text-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .about-text-backdrop {
          background: rgba(5, 10, 26, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 245, 255, 0.08);
          border-radius: 20px;
          padding: 2.5rem 2.5rem 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .about-description {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          line-height: 1.7;
          color: rgba(232, 244, 248, 0.92);
          margin-bottom: 3rem;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);
        }

        .highlight {
          color: var(--cyan);
          font-weight: 700;
          text-shadow: 0 0 20px var(--cyan-glow);
        }

        .vision-box {
          display: inline-block;
          background: rgba(0, 245, 255, 0.06);
          border: 1px solid rgba(0, 245, 255, 0.18);
          border-radius: 12px;
          padding: 2rem;
          position: relative;
          text-align: left;
        }

        .vision-tag {
          position: absolute;
          top: -12px;
          left: 20px;
          background: var(--cyan);
          color: var(--navy);
          padding: 4px 12px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          border-radius: 4px;
        }

        .vision-box p {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.6;
          margin: 0;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }

        .stat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 768px) {
          .stat-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 2rem;
            margin-bottom: 0;
          }
          
          .about-title {
            margin-bottom: 5rem;
          }
        }

        @media (max-width: 480px) {
          .about-section {
            padding: 5rem 4%;
          }
          
          .about-title {
            font-size: clamp(1.75rem, 7vw, 2.5rem);
          }
        }

        .container {
          position: relative;
          z-index: 10;
          max-width: 72rem;
          width: 100%;
        }

        .inline-block { display: inline-block; }
      `}</style>
    </section>
  );
};

export default About;