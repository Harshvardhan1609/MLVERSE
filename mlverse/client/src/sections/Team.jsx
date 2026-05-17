import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import useProjects from '../hooks/useProjects';

const Team = () => {
  const { projects } = useProjects();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedBuilder, setSelectedBuilder] = useState(null);

  useEffect(() => {
    if (projects.length === 0) return;

    const chars = titleRef.current.querySelectorAll('.char');
    const titleObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(chars,
          { y: 50, scale: 0, rotation: -15, opacity: 0, filter: 'blur(10px)' },
          { y: 0, scale: 1, rotation: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.05, ease: 'back.out(1.5)', duration: 0.8 }
        );
        titleObs.disconnect();
      }
    }, { threshold: 0.3 });
    titleObs.observe(titleRef.current);

    const cells = gridRef.current.querySelectorAll('.team-cell');
    const gridObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(cells,
          { y: 60, scale: 0.9, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, stagger: { amount: 1.2, from: 'top' }, ease: 'power4.out', duration: 0.7 }
        );
        gridObs.disconnect();
      }
    }, { threshold: 0.1 });
    gridObs.observe(gridRef.current);

    return () => { titleObs.disconnect(); gridObs.disconnect(); };
  }, [projects]);

  const getBuilderProjects = (builderName) => {
    return projects.filter(p => p.project === builderName);
  };

  const getUniqueBuilders = () => {
    const seen = new Set();
    return projects.filter(p => {
      if (seen.has(p.project)) return false;
      seen.add(p.project);
      return true;
    });
  };

  return (
    <section id="team" ref={sectionRef} className="team-section">
      <div className="container">
        <h2 ref={titleRef} className="team-title">
          {"THE BUILDERS".split("").map((char, i) => (
            <span key={i} className="char inline-block" style={{ minWidth: char === " " ? "0.3em" : "auto" }}>
              {char}
            </span>
          ))}
        </h2>

        <div ref={gridRef} className="team-grid">
          {getUniqueBuilders().length > 0 ? (
            getUniqueBuilders().map((member) => (
              <div 
                key={member.id} 
                className="team-cell"
                onClick={() => setSelectedBuilder({ name: member.project, projects: getBuilderProjects(member.project) })}
              >
                <div className="cell-header">
                  <span className="cell-id">
                    {member.id < 10 ? `00${member.id}` : `0${member.id}`}
                  </span>
                  <span className="status-dot" />
                </div>
                <h3 className="cell-name">{member.project}</h3>
                <div className="cell-line" />
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', padding: '100px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Initializing AI Builders...</h3>
              <p>Fetching project data from the neural network.</p>
            </div>
          )}
        </div>
      </div>

      {selectedBuilder && (
        <div className="modal-overlay" onClick={() => setSelectedBuilder(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedBuilder(null)}>×</button>
            
            <div className="modal-header">
              <div className="modal-builder-icon">👤</div>
              <h3 className="modal-builder-name">{selectedBuilder.name}</h3>
              <p className="modal-builder-count">{selectedBuilder.projects.length} Project{selectedBuilder.projects.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="modal-projects">
              {selectedBuilder.projects.map((proj, idx) => (
                <a 
                  key={idx}
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-project-card"
                >
                  <div className="project-type">{proj.type}</div>
                  <h4 className="project-name">{proj.name}</h4>
                  <span className="project-link">Visit Project →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx="true">{`
        .team-section {
          min-height: 100vh;
          padding: 10rem 6%;
          background: #060c1e;
          position: relative;
          border-top: 1px solid rgba(0,245,255,0.08);
        }

        .team-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 150px;
          background: linear-gradient(180deg, var(--navy) 0%, transparent 100%);
          z-index: 5;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .team-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(3.5rem, 12vw, 7rem);
          font-weight: 800;
          color: white;
          text-align: center;
          margin-bottom: 6rem;
          letter-spacing: -0.03em;
          text-shadow: 0 0 40px rgba(0, 245, 255, 0.2);
          position: relative;
        }

        .team-title::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--magenta), transparent);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          background: rgba(0, 245, 255, 0.08);
          border: 1px solid rgba(0, 245, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
        }

        @media (min-width: 1024px) {
          .team-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .team-cell {
          background: rgba(10, 15, 30, 0.95);
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          cursor: pointer;
          border: 1px solid rgba(0, 245, 255, 0.05);
          backdrop-filter: blur(15px);
          overflow: hidden;
        }

        .team-cell::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.03) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.5s;
        }

        .team-cell:hover::before { opacity: 1; }

        .team-cell:hover {
          background: rgba(15, 20, 40, 0.98);
          border-color: var(--cyan);
          z-index: 10;
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px var(--cyan-glow);
        }

        .team-cell:hover .cell-name {
          color: var(--cyan);
          text-shadow: 0 0 20px var(--cyan-glow);
        }

        .team-cell:hover .status-dot {
          background: var(--magenta);
          box-shadow: 0 0 20px var(--magenta);
          opacity: 1;
        }

        .cell-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .cell-id {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--cyan);
          opacity: 0.5;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .cell-id::before { content: '#'; opacity: 0.5; }

        .status-dot {
          width: 10px;
          height: 10px;
          background: var(--cyan);
          border-radius: 50%;
          opacity: 0.4;
          transition: all 0.4s ease;
          position: relative;
        }

        .status-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid currentColor;
          opacity: 0;
          transition: opacity 0.4s;
        }

        .team-cell:hover .status-dot::after { opacity: 0.3; }

        .cell-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: white;
          transition: all 0.4s ease;
          line-height: 1.15;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .cell-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, var(--magenta), var(--cyan));
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .team-cell:hover .cell-line { width: 100%; }
        .inline-block { display: inline-block; }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          backdrop-filter: blur(15px);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: linear-gradient(135deg, rgba(10, 15, 35, 0.98) 0%, rgba(20, 25, 50, 0.95) 100%);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 24px;
          padding: 2.5rem;
          max-width: 600px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-close {
          position: absolute;
          top: 18px;
          right: 22px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          color: var(--white-dim);
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background: var(--cyan);
          color: var(--navy);
          transform: rotate(90deg);
        }

        .modal-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(0, 245, 255, 0.15);
        }

        .modal-builder-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .modal-builder-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: var(--cyan);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .modal-builder-count {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--magenta);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .modal-projects {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .modal-project-card {
          display: block;
          background: rgba(0, 245, 255, 0.03);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 14px;
          padding: 1.5rem;
          text-decoration: none;
          transition: all 0.4s ease;
        }

        .modal-project-card:hover {
          background: rgba(0, 245, 255, 0.08);
          border-color: var(--cyan);
          transform: translateX(8px);
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.15);
        }

        .project-type {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--magenta);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.6rem;
        }

        .project-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.6rem;
        }

        .project-link {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        @media (max-width: 768px) {
          .team-section { padding: 6rem 4%; }
          .team-title { margin-bottom: 3rem; font-size: 2.5rem; }
          .team-grid { grid-template-columns: 1fr 1fr; }
          .cell-name { font-size: 16px; }
          .team-cell { padding: 2rem 1.5rem; }
          .modal-content { padding: 2rem 1.5rem; }
          .modal-builder-name { font-size: 1.5rem; }
          .project-name { font-size: 1.1rem; }
        }

        @media (max-width: 480px) {
          .team-grid { grid-template-columns: 1fr; }
          .cell-name { font-size: 18px; }
        }
      `}</style>
    </section>
  );
};

export default Team;