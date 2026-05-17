import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.to(barRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
      }
    });
  }, []);

  return (
    <div 
      ref={barRef} 
      className="scroll-progress-bar"
    >
      <div className="progress-glow" />
      <style jsx="true">{`
        .scroll-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 0%;
          height: 3px;
          background: linear-gradient(90deg, var(--cyan), var(--magenta));
          z-index: 2000;
          box-shadow: 0 0 20px var(--cyan), 0 0 40px var(--cyan-glow);
        }
        
        .progress-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 50px;
          height: 100%;
          background: linear-gradient(90deg, transparent, white);
          opacity: 0.5;
          filter: blur(4px);
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default ScrollProgress;
