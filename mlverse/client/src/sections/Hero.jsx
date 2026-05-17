import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrainAnimation from '../components/BrainAnimation';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Elegant Title Entrance with enhanced effects
      const chars = titleRef.current.children;
      gsap.fromTo(chars, 
        { y: 100, opacity: 0, rotateX: -90, scale: 0.8, filter: 'blur(15px)' },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          stagger: 0.05, 
          ease: "expo.out",
          duration: 2
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 0.85, y: 0, filter: 'blur(0px)', delay: 1.4, duration: 1.5, ease: "power3.out" }
      );

      gsap.fromTo(scrollIndicatorRef.current,
        { y: 0, opacity: 0 },
        { y: 15, opacity: 0.7, repeat: -1, yoyo: true, duration: 2.5, ease: "sine.inOut" }
      );

      // Enhanced Parallax on Scroll with rotation
      gsap.to(contentRef.current, {
        y: -200,
        opacity: 0,
        scale: 0.85,
        rotation: 2,
        filter: "blur(30px)",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      <div className="hero-content" ref={contentRef}>
        <div className="label-top-container">
          <span className="line" />
          <span className="label-top">Empowering the Future</span>
          <span className="line" />
        </div>
        
        <h1 ref={titleRef} className="hero-title">
          {"ML VERSE".split("").map((char, index) => (
            <span key={index} className="char">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p ref={subtitleRef} className="hero-subtitle">
          Machine Learning. Reimagined by Students.
        </p>
      </div>

      <div 
        ref={scrollIndicatorRef}
        className="scroll-indicator"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="scroll-line" />
        <span className="scroll-text">Scroll to Explore</span>
      </div>

      <style jsx="true">{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          overflow: hidden;
        }

        .hero-content {
          text-align: center;
          max-width: 90vw;
          z-index: 10;
          position: relative;
        }

        .label-top-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .label-top-container .line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          opacity: 0.6;
        }

        .label-top {
          font-family: 'Space Mono', monospace;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 0.6em;
          font-size: 0.75rem;
          opacity: 0.9;
          position: relative;
        }

        .label-top::before,
        .label-top::after {
          content: '◆';
          font-size: 6px;
          margin: 0 10px;
          opacity: 0.5;
        }

        .hero-title {
          font-size: clamp(3rem, 16vw, 12rem);
          font-weight: 800;
          line-height: 0.85;
          display: flex;
          justify-content: center;
          perspective: 2000px;
          color: white;
          letter-spacing: -0.04em;
          text-shadow: 
            0 0 60px rgba(0, 245, 255, 0.3),
            0 0 120px rgba(0, 245, 255, 0.1);
          position: relative;
        }

        .hero-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          opacity: 0.4;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(2.5rem, 14vw, 4rem);
          }
          
          .hero-title::after {
            width: 80px;
          }
          
          .label-top-container {
            gap: 1rem;
            margin-bottom: 1.5rem;
          }
          
          .label-top-container .line {
            width: 40px;
          }
          
          .label-top {
            font-size: 0.65rem;
            letter-spacing: 0.4em;
          }
          
          .hero-subtitle {
            margin-top: 2rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: clamp(2rem, 12vw, 3rem);
          }
        }

        .hero-title .char {
          display: inline-block;
          transform-style: preserve-3d;
          position: relative;
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.6rem);
          color: var(--white-dim);
          margin-top: 3rem;
          font-weight: 500;
          opacity: 0;
          letter-spacing: 0.15em;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          cursor: pointer;
          color: white;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5em;
          z-index: 20;
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--cyan), transparent);
          box-shadow: 0 0 15px var(--cyan), 0 0 30px var(--cyan-glow);
          position: relative;
        }

        .scroll-line::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: -3px;
          width: 7px;
          height: 7px;
          background: var(--cyan);
          border-radius: 50%;
          animation: scroll-bounce 2s ease-in-out infinite;
        }

        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(45px); opacity: 0.3; }
        }

        .scroll-text {
          opacity: 0.6;
          transition: all 0.3s;
        }

        .scroll-indicator:hover .scroll-text {
          opacity: 1;
          color: var(--cyan);
        }
      `}</style>
    </section>
  );
};

export default Hero;
