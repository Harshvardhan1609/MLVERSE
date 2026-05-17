import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NeuralBackground = () => {
  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create neural nodes
    const nodeCount = 25;
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const node = document.createElement('div');
      node.className = 'neural-node';
      
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 15 + 8;
      const depth = Math.random();
      
      node.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        --depth: ${depth};
        transform: translateZ(${depth * 100}px);
      `;
      
      container.appendChild(node);
      nodes.push({ element: node, x, y, size, depth });
    }
    nodesRef.current = nodes;

    // Create connections between close nodes
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((otherNode, j) => {
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 250) {
          const line = document.createElement('div');
          line.className = 'neural-line';
          
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const length = distance;
          
          line.style.cssText = `
            left: ${node.x + node.size / 2}px;
            top: ${node.y + node.size / 2}px;
            width: ${length}px;
            transform: rotate(${angle}deg);
            opacity: ${0.3 - (distance / 800)};
          `;
          
          container.appendChild(line);
        }
      });
    });

    // Create floating data particles
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'data-particle';
      
      const x = Math.random() * width;
      const y = Math.random() * height;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;
      
      particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      `;
      
      container.appendChild(particle);
      particlesRef.current.push(particle);
    }

    // Animate nodes with GSAP
    nodes.forEach((node, i) => {
      gsap.to(node.element, {
        y: '+=30',
        yoyo: true,
        repeat: -1,
        duration: 2 + Math.random() * 2,
        ease: 'sine.inOut',
        delay: Math.random() * 2
      });

      gsap.to(node.element, {
        scale: 1.5,
        opacity: 0.8,
        yoyo: true,
        repeat: -1,
        duration: 1.5 + Math.random(),
        ease: 'sine.inOut'
      });
    });

    // Scroll-based 4D transformation
    gsap.to(container, {
      rotationX: 15,
      rotationY: -10,
      scale: 1.1,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });

    // Parallax effect on scroll
    nodes.forEach((node, i) => {
      gsap.to(node.element, {
        y: -node.y * 0.3,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      });
    });

    // Particle scroll speed
    gsap.to('.data-particle', {
      y: '-=200',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5
      }
    });

    return () => {
      nodes.forEach(n => n.element.remove());
      document.querySelectorAll('.neural-line').forEach(l => l.remove());
      particlesRef.current.forEach(p => p.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="neural-container">
      <div className="grid-overlay" />
      <div className="scanline-overlay" />
      
      <style jsx="true">{`
        .neural-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          background: linear-gradient(135deg, #050A1A 0%, #0a0f1a 50%, #050A1A 100%);
          overflow: hidden;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .scanline-overlay {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          );
          pointer-events: none;
          opacity: 0.3;
        }

        :global(.neural-node) {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.8) 0%, rgba(0, 245, 255, 0.2) 50%, transparent 70%);
          box-shadow: 
            0 0 20px rgba(0, 245, 255, 0.5),
            0 0 40px rgba(0, 245, 255, 0.3),
            0 0 60px rgba(0, 245, 255, 0.1);
          animation: nodePulse 3s ease-in-out infinite;
        }

        :global(.neural-node)::before {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1px solid rgba(0, 245, 255, 0.3);
          animation: ringExpand 2s ease-out infinite;
        }

        @keyframes nodePulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.3);
          }
          50% { 
            box-shadow: 0 0 30px rgba(0, 245, 255, 0.8), 0 0 60px rgba(0, 245, 255, 0.5), 0 0 80px rgba(0, 245, 255, 0.2);
          }
        }

        @keyframes ringExpand {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }

        :global(.neural-line) {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, rgba(0, 245, 255, 0.6), transparent);
          transform-origin: left center;
          pointer-events: none;
        }

        :global(.data-particle) {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(0, 245, 255, 0.6);
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(0, 245, 255, 0.8);
          animation: particleFloat 15s linear infinite;
        }

        :global(.data-particle)::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: inherit;
          filter: blur(2px);
        }

        @keyframes particleFloat {
          0% { 
            transform: translateY(0) translateX(0); 
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100vh) translateX(50px); 
            opacity: 0;
          }
        }

        /* Glow zones */
        .neural-container::before {
          content: '';
          position: absolute;
          top: 20%;
          left: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.08) 0%, transparent 70%);
          animation: glowPulse 8s ease-in-out infinite;
        }

        .neural-container::after {
          content: '';
          position: absolute;
          bottom: 20%;
          right: 10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 0, 110, 0.06) 0%, transparent 70%);
          animation: glowPulse 10s ease-in-out infinite reverse;
        }

        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default NeuralBackground;