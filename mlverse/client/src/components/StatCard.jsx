import React from 'react';

const StatCard = ({ number, label, description }) => {
  return (
    <div className="stat-card">
      <div className="card-glow" />
      <h3 className="stat-number">{number}</h3>
      <h4 className="stat-label">{label}</h4>
      <p className="stat-desc">{description}</p>
      
      <style jsx="true">{`
        .stat-card {
          backdrop-filter: blur(25px);
          background: linear-gradient(135deg, rgba(10, 15, 30, 0.9) 0%, rgba(5, 10, 26, 0.95) 100%);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 16px;
          padding: 2.5rem;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.05) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.5s;
        }

        .stat-card:hover {
          border-color: var(--cyan);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px var(--cyan-glow);
          transform: translateY(-10px);
        }

        .stat-card:hover .card-glow {
          opacity: 1;
        }

        .stat-number {
          font-family: 'Rajdhani', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: var(--cyan);
          margin-bottom: 0.75rem;
          text-shadow: 0 0 30px var(--cyan-glow);
          position: relative;
        }

        .stat-number::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, var(--cyan), transparent);
        }

        .stat-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .stat-desc {
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          color: var(--white-dim);
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .stat-card {
            padding: 1.5rem;
          }

          .stat-number {
            font-size: 2.25rem;
          }

          .stat-label {
            font-size: 1rem;
          }

          .stat-desc {
            font-size: 0.75rem;
            line-height: 1.5;
          }
        }

        @media (max-width: 480px) {
          .stat-card {
            padding: 1.25rem;
          }

          .stat-number {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default StatCard;
