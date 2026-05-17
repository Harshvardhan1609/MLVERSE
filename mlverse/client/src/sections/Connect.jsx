import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const brainGif = '/brain.gif';
const sinSchoolLogo = '/logo/sinschoolofai.png';
const jietLogo = '/logo/jietuniverse.png';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = {
  website: 'https://sintechnologies.in',
  linkedin: 'https://in.linkedin.com/company/sinindia',
  instagram: 'https://www.instagram.com/sin.edutech/',
  youtube: 'https://www.youtube.com/@ceoharsh'
};

const harshvardhanLinks = {
  linkedin: 'https://in.linkedin.com/in/harshvardhan1609',
  instagram: 'https://www.instagram.com/ceo.harsh/'
};

const officialsData = [
  {
    id: 'harshvardhan',
    role: 'Lead Instructor',
    name: 'Er Harshvardhan Purohit',
    title: 'Founder & CEO, SIN Technologies',
    tag: 'Lead Mentor',
    description: 'Visionary leader and expert in AI/ML with extensive experience in building cutting-edge machine learning solutions. Under his guidance, SIN Technologies has become a pioneer in AI education and innovation.',
    accent: 'cyan',
    links: harshvardhanLinks
  },
  {
    id: 'manish',
    role: 'Director & Registrar',
    name: 'Dr Manish Bafna',
    title: 'Registrar, JIET Universe',
    tag: 'Chief Patron',
    description: 'Respected academic leader serving as Registrar of JIET Universe. His visionary leadership has been instrumental in bridging academia with industry, fostering innovation and excellence in technical education.',
    accent: 'gold'
  },
  {
    id: 'sanjay',
    role: 'TPO',
    name: 'Sanjay Bhandari',
    title: 'Training & Placement Officer',
    description: 'Dedicated to student career development and placement opportunities. His efforts ensure students get exposure to top industry partners.',
    accent: 'magenta'
  },
  {
    id: 'laxmi',
    role: 'Coordinator',
    name: 'Laxmi Choudhary',
    title: 'ML Course Coordinator',
    description: 'Coordinated the ML course curriculum and guided students through their machine learning journey at SIN School of AI.',
    accent: 'cyan'
  }
];

const Connect = () => {
  const sectionRef = useRef(null);
  const brainsRef = useRef([]);
  const particlesRef = useRef([]);
  const orbsRef = useRef([]);
  const floatingTextRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      orbsRef.current.forEach((orb, index) => {
        gsap.to(orb, {
          y: -150 - (index * 30),
          x: Math.sin(index) * 50,
          rotation: 360,
          duration: 8 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      if (floatingTextRef.current) {
        gsap.to(floatingTextRef.current, {
          y: -20,
          opacity: 0.8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      gsap.fromTo('.official-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.officials-section',
            start: 'top 95%',
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo('.bootcamp-badge',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '.bootcamp-section',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    // Fallback: ensure officials are visible even if ScrollTrigger doesn't fire
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll('.official-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }, 3000);

    return () => {
      ctx.revert();
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    brainsRef.current.forEach((brain, index) => {
      gsap.to(brain, {
        y: -40,
        x: index % 2 === 0 ? 30 : -30,
        rotation: index % 2 === 0 ? 15 : -15,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section id="connect" ref={sectionRef} className="connect-section">
      <div className="background-effects">
        <div
          className="cursor-light"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
          }}
        />
        <div className="orbs-container">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              ref={el => orbsRef.current[i] = el}
              className="orb"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                width: `${60 + Math.random() * 40}px`,
                height: `${60 + Math.random() * 40}px`,
                background: i % 2 === 0
                  ? 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(255,0,110,0.1) 0%, transparent 70%)'
              }}
            />
          ))}
        </div>

        <div className="scroll-particles" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="grid-lines" />
      </div>

      <div className="gradient-box">
        <div className="box-content">
          <h2 className="connect-title">Built at SIN School of AI</h2>
          <p className="connect-subtext">
            Powered by Streamlit · Guided by SIN Technologies · Jodhpur, Rajasthan
          </p>

          <div className="bootcamp-section">
            <div className="bootcamp-badge" ref={floatingTextRef}>
              <span className="bootcamp-icon">🎓</span>
              <span className="bootcamp-text">SIN School of AI X JIET Universe GEN AI Bootcamp</span>
            </div>
          </div>

          <div className="logos-section">
            <div className="logo-item">
              <img src={sinSchoolLogo} alt="SIN School of AI" className="org-logo" />
              <span className="logo-label">SIN School of AI</span>
            </div>
            <div className="logo-divider">×</div>
            <div className="logo-item">
              <img src={jietLogo} alt="JIET Universe" className="org-logo" />
              <span className="logo-label">JIET Universe</span>
            </div>
          </div>

          <div className="social-links-section">
            <span className="social-label">Connect with SIN Technologies</span>
            <div className="social-icons">
              <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="social-icon" title="Website">
                🌐
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
                💼
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
                📸
              </a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="social-icon" title="YouTube">
                ▶️
              </a>
            </div>
          </div>

          <div className="cta-container">
            <button className="cta-btn" onClick={() => scrollToSection('projects')}>
              Explore All Projects
            </button>
            <a href="https://sinschoolofai.com" target="_blank" rel="noopener noreferrer" className="cta-btn">
              SIN School of AI
            </a>
            <a href="#" className="cta-btn">
              MLverse Report
            </a>
          </div>

          <div className="officials-section">
            <h3 className="officials-title">Our Officials</h3>
            <div className="officials-grid">
              {officialsData.map((official, index) => (
                <div
                  key={official.id}
                  className={`official-card ${index === 0 ? 'lead' : ''} ${index === 1 ? 'special' : ''}`}
                  onClick={() => setSelectedOfficial(official)}
                >
                  {index === 1 && <div className="special-badge">JIET Universe</div>}
                  <div className="official-role">{official.role}</div>
                  <div className="official-name">{official.name}</div>
                  <div className="official-title">{official.title}</div>
                  {official.tag && <div className="official-tag">{official.tag}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="spiritual-thanks">
            <p className="thanks-quote">
              "Grateful to the <span className="spiritual-power">Spiritual Power of the Universe</span> for guiding this journey of knowledge and innovation."
            </p>
          </div>
        </div>

        {[0, 1, 2].map((i) => (
          <img
            key={i}
            ref={el => brainsRef.current[i] = el}
            src={brainGif}
            className={`ambient-brain brain-${i}`}
            alt=""
          />
        ))}
      </div>

      {selectedOfficial && (
        <div className="modal-overlay" onClick={() => setSelectedOfficial(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedOfficial(null)}>×</button>
            <div className="modal-header">
              <div className="modal-role">{selectedOfficial.role}</div>
              <h3 className="modal-name">{selectedOfficial.name}</h3>
              <p className="modal-title">{selectedOfficial.title}</p>
            </div>
            <div className="modal-body">
              <p>{selectedOfficial.description}</p>
              {selectedOfficial.links && (
                <div className="modal-social-links">
                  <a href={selectedOfficial.links.linkedin} target="_blank" rel="noopener noreferrer" className="modal-social-icon">
                    💼 LinkedIn
                  </a>
                  <a href={selectedOfficial.links.instagram} target="_blank" rel="noopener noreferrer" className="modal-social-icon">
                    📸 Instagram
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx="true">{`
        .connect-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 4%;
          position: relative;
          overflow: hidden;
        }

        .background-effects {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .orbs-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        .grid-lines {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .cursor-light {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 100;
          transition: opacity 0.3s;
        }

        .scroll-particles {
          position: absolute;
          width: 100%;
          height: 200%;
          top: 0;
        }

        .particle {
          position: absolute;
          bottom: -10px;
          background: var(--cyan);
          border-radius: 50%;
          animation: rise linear infinite;
          box-shadow: 0 0 6px var(--cyan);
        }

        @keyframes rise {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-500px) scale(0.3); opacity: 0; }
        }

        .gradient-box {
          position: relative;
          width: 100%;
          max-width: 1000px;
          padding: 2px;
          border-radius: 24px;
          z-index: 5;
        }

        .gradient-box::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--cyan), var(--magenta), var(--gold), var(--cyan));
          background-size: 300% 300%;
          animation: gradientBorder 6s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        @keyframes gradientBorder {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .box-content {
          background: linear-gradient(135deg, rgba(5, 10, 26, 0.95) 0%, rgba(15, 20, 40, 0.92) 100%);
          border-radius: 22px;
          padding: 5rem 3rem;
          text-align: center;
          position: relative;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .connect-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(2.2rem, 7vw, 3.5rem);
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.15);
          letter-spacing: -0.02em;
        }

        .connect-subtext {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--white-dim);
          margin-bottom: 3rem;
          letter-spacing: 0.12em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }

        .connect-subtext::before, .connect-subtext::after {
          content: '';
          width: 25px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan));
        }

        .connect-subtext::after {
          background: linear-gradient(90deg, var(--cyan), transparent);
        }

        .bootcamp-section {
          margin-bottom: 3rem;
        }

        .bootcamp-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          background: linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,165,0,0.08) 100%);
          border: 1px solid rgba(255,215,0,0.3);
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .bootcamp-badge:hover {
          transform: scale(1.05);
          border-color: var(--gold);
          box-shadow: 0 0 30px rgba(255,215,0,0.2);
        }

        .bootcamp-icon {
          font-size: 1.5rem;
        }

        .bootcamp-text {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .logos-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin: 2.5rem 0;
          flex-wrap: wrap;
        }

        .logo-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .org-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          padding: 8px;
          border: 1px solid rgba(0,245,255,0.2);
          transition: all 0.4s;
        }

        .org-logo:hover {
          transform: scale(1.1);
          border-color: var(--cyan);
          box-shadow: 0 0 25px var(--cyan-glow);
        }

        .logo-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--white-dim);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .logo-divider {
          font-size: 2rem;
          color: var(--cyan);
          opacity: 0.5;
        }

        .social-links-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
          padding: 1.5rem;
          background: rgba(0,245,255,0.02);
          border: 1px solid rgba(0,245,255,0.08);
          border-radius: 12px;
        }

        .social-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--white-dim);
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .social-icons {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,245,255,0.05);
          border: 1px solid rgba(0,245,255,0.15);
          border-radius: 50%;
          font-size: 1.2rem;
          text-decoration: none;
          transition: all 0.4s ease;
        }

        .social-icon:hover {
          background: var(--cyan);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,245,255,0.3);
        }

        .cta-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.2rem;
          margin-bottom: 4rem;
        }

        .cta-btn {
          padding: 14px 32px;
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 8px;
          background: rgba(0, 245, 255, 0.05);
          color: var(--cyan);
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-btn:hover {
          background: var(--cyan);
          color: var(--navy);
          box-shadow: 0 0 40px var(--cyan-glow);
          transform: translateY(-3px);
        }

        .ambient-brain {
          position: absolute;
          z-index: 10;
          opacity: 0.15;
          pointer-events: none;
        }

        .brain-0 { top: -40px; left: -20px; width: 70px; }
        .brain-1 { bottom: -30px; right: 20px; width: 50px; }
        .brain-2 { top: 25%; right: -30px; width: 45px; }

        .officials-section {
          margin-top: 3rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(0, 245, 255, 0.15);
        }

        .officials-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--cyan);
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .officials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .official-card {
          background: rgba(0, 245, 255, 0.03);
          border: 1px solid rgba(0, 245, 255, 0.12);
          border-radius: 14px;
          padding: 1.4rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
        }

        .official-card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: var(--cyan);
          box-shadow: 0 15px 40px rgba(0, 245, 255, 0.15);
        }

        .official-card.lead {
          grid-column: span 2;
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.08) 0%, rgba(255, 0, 110, 0.04) 100%);
          border-color: var(--cyan);
        }

        .official-card.lead::before {
          content: '★';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--gold);
          font-size: 1.3rem;
          text-shadow: 0 0 12px var(--gold);
        }

        .official-card.special {
          background: linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(255,165,0,0.04) 100%);
          border-color: rgba(255,215,0,0.3);
        }

        .official-card.special:hover {
          border-color: var(--gold);
          box-shadow: 0 15px 40px rgba(255,215,0,0.15);
        }

        .special-badge {
          position: absolute;
          top: -12px;
          right: 15px;
          padding: 4px 12px;
          background: linear-gradient(135deg, var(--gold), #ff8c00);
          color: var(--navy);
          font-family: 'Rajdhani', sans-serif;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-radius: 20px;
        }

        .official-role {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--magenta);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 0.6rem;
        }

        .official-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.3rem;
        }

        .official-card.lead .official-name {
          font-size: 1.6rem;
          color: var(--cyan);
        }

        .official-card.special .official-name {
          color: var(--gold);
        }

        .official-title {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--white-dim);
          line-height: 1.4;
        }

        .official-tag {
          display: inline-block;
          margin-top: 0.8rem;
          padding: 4px 14px;
          background: var(--cyan);
          color: var(--navy);
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 20px;
        }

        .spiritual-thanks {
          margin-top: 3rem;
          padding: 1.4rem;
          background: rgba(255, 215, 0, 0.03);
          border: 1px solid rgba(255, 215, 0, 0.1);
          border-radius: 12px;
        }

        .thanks-quote {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--white-dim);
          font-style: italic;
          line-height: 1.7;
        }

        .spiritual-power {
          color: var(--gold);
          font-weight: 700;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          backdrop-filter: blur(10px);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: linear-gradient(135deg, rgba(10, 15, 30, 0.98) 0%, rgba(20, 25, 45, 0.95) 100%);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 20px;
          padding: 2.5rem;
          max-width: 500px;
          width: 100%;
          position: relative;
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          color: var(--white-dim);
          font-size: 2rem;
          cursor: pointer;
          transition: color 0.3s;
        }

        .modal-close:hover {
          color: var(--cyan);
        }

        .modal-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .modal-role {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--magenta);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 0.5rem;
        }

        .modal-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--cyan);
          margin-bottom: 0.3rem;
        }

        .modal-title {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--white-dim);
          line-height: 1.5;
        }

        .modal-body {
          text-align: center;
        }

        .modal-body p {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: var(--white-dim);
          line-height: 1.8;
        }

        .modal-social-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0,245,255,0.1);
        }

        .modal-social-icon {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 8px 16px;
          background: rgba(0,245,255,0.05);
          border: 1px solid rgba(0,245,255,0.15);
          border-radius: 20px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--cyan);
          text-decoration: none;
          transition: all 0.3s;
        }

        .modal-social-icon:hover {
          background: var(--cyan);
          color: var(--navy);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .connect-section { padding: 6rem 4%; }
          .box-content { padding: 3rem 1.5rem; }
          .connect-title { font-size: 1.8rem; }
          .bootcamp-text { font-size: 0.8rem; }
          .bootcamp-badge { padding: 10px 20px; flex-direction: column; gap: 8px; }
          .logos-section { gap: 1rem; }
          .org-logo { width: 60px; height: 60px; }
          .logo-divider { font-size: 1.5rem; }
          .social-links-section { padding: 1rem; }
          .cta-container { flex-direction: column; gap: 0.8rem; }
          .cta-btn { width: 100%; padding: 12px 20px; font-size: 12px; }
          .officials-grid { grid-template-columns: 1fr; }
          .official-card.lead { grid-column: span 1; }
          .official-card.lead .official-name { font-size: 1.3rem; }
          .spiritual-thanks { margin-top: 2rem; padding: 1rem; }
          .modal-content { padding: 2rem 1.5rem; }
          .modal-name { font-size: 1.4rem; }
        }

        @media (max-width: 480px) {
          .connect-title { font-size: 1.5rem; }
          .connect-subtext { font-size: 10px; gap: 10px; }
          .connect-subtext::before, .connect-subtext::after { width: 15px; }
          .logos-section { flex-direction: column; gap: 1rem; }
          .logo-divider { display: none; }
          .org-logo { width: 50px; height: 50px; }
          .social-icons { gap: 0.8rem; }
          .social-icon { width: 36px; height: 36px; font-size: 1rem; }
          .official-name { font-size: 1rem; }
          .official-title { font-size: 9px; }
        }
      `}</style>
    </section>
  );
};

export default Connect;