import React, { useState, useEffect, useRef, useCallback } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const activeSectionRef = useRef('hero');

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Team', id: 'team' },
    { name: 'Connect', id: 'connect' }
  ];

  const allSections = ['hero', 'about', 'projects', 'stats', 'team', 'connect'];

  // Robust scroll-position-based active section detection
  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const checkPoint = scrollY + viewportHeight * 0.35; // 35% from top of viewport

    let currentSection = 'hero';

    for (const sectionId of allSections) {
      const el = document.getElementById(sectionId);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionBottom = sectionTop + rect.height;

      if (checkPoint >= sectionTop && checkPoint < sectionBottom) {
        currentSection = sectionId;
        break;
      }
    }

    // Map 'stats' to nearest neighbor since it's not in the nav
    if (currentSection === 'stats') {
      currentSection = 'team';
    }

    if (activeSectionRef.current !== currentSection) {
      activeSectionRef.current = currentSection;
      setActiveSection(currentSection);
    }
  }, []);

  useEffect(() => {
    let rafId = null;
    let ticking = false;

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check after DOM settles
    const initTimer = setTimeout(() => {
      updateActiveSection();
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(initTimer);
    };
  }, [updateActiveSection]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      setMenuOpen(false);
      // Immediately set active for responsiveness
      activeSectionRef.current = id;
      setActiveSection(id);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#hero" className="logo" onClick={(e) => scrollToSection(e, 'hero')}>
          ML VERSE
        </a>

        {/* Desktop Links */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, link.id)}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`mobile-link ${activeSection === link.id ? 'active' : ''}`}
            onClick={(e) => scrollToSection(e, link.id)}
          >
            {link.name}
          </a>
        ))}
      </div>

      <style jsx="true">{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem 6%;
          z-index: 1000;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar--scrolled {
          background: rgba(5, 10, 26, 0.9);
          backdrop-filter: blur(25px);
          border-bottom: 1px solid rgba(0, 245, 255, 0.1);
          padding: 1rem 6%;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: 'Rajdhani', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--cyan);
          letter-spacing: 0.2em;
          text-decoration: none;
          transition: all 0.3s;
          text-shadow: 0 0 20px var(--cyan-glow);
        }

        .logo:hover {
          opacity: 0.8;
          text-shadow: 0 0 30px var(--cyan);
        }

        .nav-links {
          display: none;
          gap: 3rem;
        }

        @media (min-width: 769px) {
          .nav-links {
            display: flex;
          }
        }

        .nav-link {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: white;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          opacity: 0.5;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          padding: 8px 0;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: var(--cyan);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover, .nav-link.active {
          opacity: 1;
          color: var(--cyan);
        }

        .nav-link:hover::before, .nav-link.active::before {
          width: 100%;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 7px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1001;
          padding: 5px;
        }

        @media (min-width: 769px) {
          .hamburger {
            display: none;
          }
        }

        .hamburger span {
          width: 28px;
          height: 2px;
          background: var(--cyan);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .hamburger.open span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          transition: right 0.6s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 1000;
        }

        .mobile-menu.open {
          right: 0;
        }

        .mobile-link {
          font-family: 'Rajdhani', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: white;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          transition: all 0.3s;
        }

        .mobile-link:hover {
          color: var(--cyan);
          text-shadow: 0 0 30px var(--cyan-glow);
        }

        .mobile-link.active {
          color: var(--cyan);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
