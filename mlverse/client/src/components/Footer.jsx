import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-scanlines" />
      
      <div className="footer-content">
        <p className="copyright">
          © 2025 <span>SIN School of AI</span> · <span>SIN Education</span> & Technology Pvt. Ltd.
        </p>

        <div className="social-links">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="social-circle" />
          ))}
        </div>
      </div>

      <style jsx="true">{`
        .footer {
          position: relative;
          padding: 3rem 6%;
          background: linear-gradient(180deg, transparent 0%, rgba(5, 10, 26, 0.8) 30%);
          border-top: 1px solid rgba(0, 245, 255, 0.08);
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 20%;
          right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          opacity: 0.3;
        }

        .footer-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.05),
            rgba(0, 0, 0, 0.05) 2px,
            transparent 2px,
            transparent 4px
          );
          opacity: 0.05;
          pointer-events: none;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          position: relative;
          z-index: 1;
        }

        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .copyright {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--white-dim);
          letter-spacing: 0.15em;
          text-align: center;
        }

        .copyright span {
          color: var(--cyan);
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-circle {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }

        .social-circle::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          border: 1px solid transparent;
          transition: border-color 0.4s;
        }

        .social-circle:hover {
          border-color: var(--cyan);
          background: rgba(0, 245, 255, 0.08);
          box-shadow: 0 0 20px var(--cyan-glow), 0 0 40px var(--cyan-glow);
          transform: translateY(-4px);
        }

        .social-circle:hover::before {
          border-color: var(--cyan);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
