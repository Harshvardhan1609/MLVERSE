import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LaunchEvent = () => {
  const sectionRef = useRef(null);
  const photoRef  = useRef(null);
  const overlayRef = useRef(null);
  const badgeRef  = useRef(null);
  const captionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Photo reveal: scale + blur in on scroll
      gsap.fromTo(photoRef.current,
        { scale: 1.08, filter: 'blur(12px)', opacity: 0 },
        {
          scale: 1, filter: 'blur(0px)', opacity: 1,
          duration: 1.6, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Badge pop
      gsap.fromTo(badgeRef.current,
        { y: -30, opacity: 0, scale: 0.8 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.9, ease: 'back.out(2)',
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Caption slide up
      gsap.fromTo(captionRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1, ease: 'power2.out',
          delay: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Subtle parallax: photo scrolls a bit slower than the page
      gsap.to(photoRef.current, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="launch" ref={sectionRef} className="launch-section">

      {/* ── Photo ── */}
      <div className="launch-photo-wrapper">
        <img
          ref={photoRef}
          src="/team-launch.jpeg"
          alt="MLverse Launch — The Founding Builders at SIN School of AI"
          className="launch-photo"
        />

        {/* Cinematic vignette layers */}
        <div className="launch-vignette-top"    ref={overlayRef} />
        <div className="launch-vignette-bottom" />
        <div className="launch-vignette-sides"  />

        {/* Scanline grain */}
        <div className="launch-scanlines" />
      </div>

      {/* ── Live Badge ── */}
      <div ref={badgeRef} className="launch-badge">
        <span className="badge-dot" />
        COHORT 01 · LAUNCH DAY · 15 MAY 2026
      </div>

      {/* ── Caption block ── */}
      <div ref={captionRef} className="launch-caption">
        <div className="caption-inner">
          <p className="caption-label">THE FOUNDING BUILDERS</p>
          <h2 className="caption-title">The MLverse Launch</h2>
          <p className="caption-sub">
            27 students. 27 live ML projects. One moment captured at&nbsp;
            <span className="caption-highlight">SIN School of AI</span>.
          </p>
        </div>
      </div>

      <style jsx="true">{`
        /* ══ Section ══════════════════════════════════════════════════════════ */
        .launch-section {
          position: relative;
          width: 100%;
          min-height: 80vh;
          background: #050A1A;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: hidden;
          border-top: 1px solid rgba(0,245,255,0.06);
        }

        /* ══ Photo ════════════════════════════════════════════════════════════ */
        .launch-photo-wrapper {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .launch-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          display: block;
          will-change: transform;
        }

        /* Cinematic dark overlays */
        .launch-vignette-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 45%;
          background: linear-gradient(
            to bottom,
            rgba(5, 10, 26, 0.92) 0%,
            rgba(5, 10, 26, 0.55) 50%,
            transparent 100%
          );
          pointer-events: none;
        }

        .launch-vignette-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 65%;
          background: linear-gradient(
            to top,
            rgba(5, 10, 26, 0.97) 0%,
            rgba(5, 10, 26, 0.7) 40%,
            transparent 100%
          );
          pointer-events: none;
        }

        .launch-vignette-sides {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 30%,
            rgba(5, 10, 26, 0.55) 100%
          );
          pointer-events: none;
        }

        /* Film grain scanlines */
        .launch-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.06) 0px,
            rgba(0,0,0,0.06) 1px,
            transparent 1px,
            transparent 3px
          );
          opacity: 0.4;
          pointer-events: none;
        }

        /* ══ Live Badge ═══════════════════════════════════════════════════════ */
        .launch-badge {
          position: absolute;
          top: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(5, 10, 26, 0.75);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(0, 245, 255, 0.25);
          border-radius: 50px;
          padding: 10px 22px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--cyan);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          z-index: 20;
          white-space: nowrap;
          box-shadow: 0 0 30px rgba(0,245,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 10px var(--cyan), 0 0 20px var(--cyan-glow);
          animation: pulse-dot 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.4); opacity: 0.7; }
        }

        /* ══ Caption ══════════════════════════════════════════════════════════ */
        .launch-caption {
          position: relative;
          z-index: 20;
          width: 100%;
          padding: 0 6% 4rem;
          display: flex;
          justify-content: center;
        }

        .caption-inner {
          max-width: 800px;
          text-align: center;
        }

        .caption-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--magenta);
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .caption-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(2.5rem, 8vw, 5.5rem);
          font-weight: 800;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 1.2rem;
          text-shadow:
            0 0 40px rgba(0,245,255,0.25),
            0 0 80px rgba(0,245,255,0.1);
        }

        .caption-sub {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(1rem, 2.5vw, 1.35rem);
          color: rgba(232,244,248,0.75);
          line-height: 1.6;
          letter-spacing: 0.03em;
        }

        .caption-highlight {
          color: var(--cyan);
          font-weight: 700;
          text-shadow: 0 0 15px var(--cyan-glow);
        }

        /* ══ Responsive ═══════════════════════════════════════════════════════ */
        @media (max-width: 768px) {
          .launch-section { min-height: 60vh; }
          .launch-caption  { padding-bottom: 3rem; }
          .launch-badge    { font-size: 9px; padding: 8px 16px; }
        }

        @media (max-width: 480px) {
          .launch-section  { min-height: 55vh; }
          .caption-title   { font-size: clamp(2rem, 10vw, 3rem); }
        }
      `}</style>
    </section>
  );
};

export default LaunchEvent;
