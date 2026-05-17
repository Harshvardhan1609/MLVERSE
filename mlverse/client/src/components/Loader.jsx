import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Loader = () => {
  const [visible, setVisible] = useState(true);
  const loaderRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Fill progress bar
    tl.to(progressRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut"
    });

    // Fade out loader
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
      onComplete: () => setVisible(false)
    });

    // SAFETY FALLBACK: Force hide after 4 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div ref={loaderRef} className="loader-container">
      <div className="loader-content">
        <h2 className="loader-text">INITIALIZING MLVERSE...</h2>
        <div className="progress-track">
          <div ref={progressRef} className="progress-bar" />
        </div>
      </div>

      <style jsx="true">{`
        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #050A1A;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-content {
          text-align: center;
          width: 300px;
        }

        .loader-text {
          font-family: 'Space Mono', monospace;
          color: #00F5FF;
          font-size: 10px;
          letter-spacing: 0.5em;
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .progress-track {
          width: 100%;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          overflow: hidden;
          position: relative;
        }

        .progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #00F5FF;
          width: 0%;
          box-shadow: 0 0 10px #00F5FF;
        }
      `}</style>
    </div>
  );
};

export default Loader;
