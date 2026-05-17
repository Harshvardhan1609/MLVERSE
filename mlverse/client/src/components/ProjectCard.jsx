import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { TYPE_COLORS } from '../data/typeColors';

const ProjectCard = ({ id, name, project, link, type, isFiltered }) => {
  const cardRef = useRef(null);
  const color = TYPE_COLORS[type] || "#ffffff";

  const onEnter = () => {
    gsap.to(cardRef.current, {
      y: -20,
      scale: 1.03,
      duration: 0.5,
      ease: "power3.out",
      boxShadow: `0 30px 60px rgba(0, 0, 0, 0.5), 0 0 40px ${color}40`
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)"
    });
  };

  return (
    <div 
      ref={cardRef}
      className={`project-card ${!isFiltered ? 'card--dimmed' : 'card--active'}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ borderLeftColor: color }}
    >
      <div className="card-id" style={{ color: color }}>
        {id < 10 ? `0${id}` : id}
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-creator">BY {project}</p>
        
        <div 
          className="type-badge" 
          style={{ 
            backgroundColor: `${color}22`, 
            borderColor: `${color}66`,
            color: color 
          }}
        >
          {type}
        </div>
      </div>

      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="launch-btn"
        style={{ '--hover-color': color }}
      >
        <span>LAUNCH PROJECT</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
        </svg>
      </a>

      <style jsx="true">{`
        .project-card {
          min-width: 340px;
          height: 440px;
          background: rgba(10, 15, 30, 0.9);
          backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-left: 6px solid;
          border-radius: 16px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s;
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .card--dimmed {
          opacity: 0.1;
          transform: scale(0.92);
          filter: grayscale(100%) blur(2px);
        }

        .card-id {
          font-family: 'Space Mono', monospace;
          font-size: 64px;
          font-weight: 800;
          opacity: 0.12;
          line-height: 0.8;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .card-id::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 40px;
          height: 1px;
          background: currentColor;
          opacity: 0.3;
        }

        .card-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: white;
          line-height: 1.15;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 15px rgba(0,0,0,0.5);
          margin-bottom: 0.75rem;
          position: relative;
        }

        .card-creator {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--cyan);
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-creator::before {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--cyan);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--cyan);
        }

        .type-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .launch-btn {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px;
          background: rgba(0, 245, 255, 0.05);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: var(--cyan);
          text-decoration: none;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 2px;
          border-radius: 8px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .launch-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .launch-btn:hover::before {
          left: 100%;
        }

        .launch-btn svg {
          width: 18px;
          height: 18px;
          transition: all 0.3s;
        }

        .launch-btn:hover {
          background: var(--cyan);
          color: var(--navy);
          box-shadow: 0 0 40px var(--cyan-glow), 0 0 80px var(--cyan-glow);
          transform: translateY(-3px);
          border-color: var(--cyan);
        }

        .launch-btn:hover svg {
          transform: translate(3px, -3px);
        }

        @media (max-width: 768px) {
          .project-card {
            min-width: 100%;
            width: 100%;
            height: auto;
            min-height: 320px;
            padding: 1.5rem;
          }

          .card-id {
            font-size: 48px;
            margin-bottom: 1rem;
          }

          .card-title {
            font-size: 24px;
          }

          .card-creator {
            font-size: 11px;
            margin-bottom: 1.5rem;
          }

          .type-badge {
            padding: 6px 12px;
            font-size: 9px;
          }

          .launch-btn {
            padding: 12px;
            font-size: 12px;
          }

          .launch-btn svg {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;
