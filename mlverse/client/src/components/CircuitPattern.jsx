import React from 'react';

const CircuitPattern = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-5 z-0">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 0 50 L 100 50" stroke="var(--cyan)" strokeWidth="0.5" fill="none" />
            <path d="M 50 0 L 50 100" stroke="var(--cyan)" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="2" fill="var(--cyan)" />
            <path d="M 50 50 L 80 80" stroke="var(--cyan)" strokeWidth="0.5" fill="none" />
            <circle cx="80" cy="80" r="1.5" fill="var(--cyan)" />
            <path d="M 50 50 L 20 20" stroke="var(--cyan)" strokeWidth="0.5" fill="none" />
            <circle cx="20" cy="20" r="1.5" fill="var(--cyan)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
      <style jsx="true">{`
        .absolute { position: absolute; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .w-full { width: 100%; }
        .h-full { height: 100%; }
        .pointer-events-none { pointer-events: none; }
        .overflow-hidden { overflow: hidden; }
        .opacity-5 { opacity: 0.05; }
        .z-0 { z-index: 0; }
      `}</style>
    </div>
  );
};

export default CircuitPattern;
