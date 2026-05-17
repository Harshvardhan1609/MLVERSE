import React, { useEffect, useRef } from 'react';

const Stats = () => {
  const stats = [
    { value: 27, suffix: "",  label: "Builders" },
    { value: 5,  suffix: "",  label: "ML Domains" },
    { value: 100, suffix: "%", label: "Deployed" },
    { value: 1,  suffix: "",  label: "Cohort" }
  ];

  const StatItem = ({ value, suffix, label }) => {
    const numberRef = useRef(null);
    const hasRun = useRef(false);

    useEffect(() => {
      const el = numberRef.current;
      if (!el) return;

      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          obs.disconnect();

          // Animate counter with requestAnimationFrame
          const duration = 2000; // ms
          const start = performance.now();
          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out expo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            el.textContent = Math.round(eased * value);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      }, { threshold: 0.3 });

      obs.observe(el);
      return () => obs.disconnect();
    }, [value]);

    return (
      <div className="stat-item">
        <div className="stat-number-container">
          <span ref={numberRef} className="stat-number">0</span>
          <span className="stat-suffix">{suffix}</span>
        </div>
        <p className="stat-label">{label}</p>
      </div>
    );
  };

  return (
    <section id="stats" className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <StatItem key={i} {...stat} />
        ))}
      </div>

      <style jsx="true">{`
        .stats-section {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #060c1e;
          border-top: 1px solid rgba(0,245,255,0.06);
          padding: 6rem 2rem;
          position: relative;
        }

        .stats-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 100px;
          background: linear-gradient(to bottom, transparent, var(--cyan), transparent);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4rem;
          width: 100%;
          max-width: 1200px;
        }

        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 3rem;
          }
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .stat-item::before {
          content: '';
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .stat-number-container {
          display: flex;
          align-items: baseline;
          line-height: 1;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .stat-number {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(4.5rem, 12vw, 8rem);
          font-weight: 800;
          color: var(--cyan);
          text-shadow: 
            0 0 40px rgba(0, 245, 255, 0.4),
            0 0 80px rgba(0, 245, 255, 0.2);
          position: relative;
        }

        .stat-number::after {
          content: '';
          position: absolute;
          bottom: 10px;
          right: -15px;
          width: 20px;
          height: 20px;
          border-right: 2px solid var(--cyan);
          border-bottom: 2px solid var(--cyan);
          opacity: 0.5;
        }

        .stat-suffix {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700;
          color: var(--magenta);
          text-shadow: 0 0 30px var(--magenta-glow);
          margin-left: 5px;
        }

        .stat-label {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: var(--white-dim);
          text-transform: uppercase;
          letter-spacing: 0.35em;
          opacity: 0.8;
          position: relative;
        }

        .stat-label::before {
          content: '//';
          margin-right: 10px;
          color: var(--cyan);
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
};

export default Stats;
