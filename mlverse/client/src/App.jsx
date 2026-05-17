import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis'; // Fallback for GSAP ScrollSmoother (Club License)

// Components & Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Stats from './sections/Stats';
import Team from './sections/Team';
import LaunchEvent from './sections/LaunchEvent';
import Connect from './sections/Connect';
import NeuralBackground from './components/NeuralBackground';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import BrainAnimation from './components/BrainAnimation';
import Footer from './components/Footer';

import './index.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Note: GSAP ScrollSmoother requires a GSAP Club license.
 * For this implementation, we use 'Lenis' as a powerful, open-source fallback
 * that provides a similar high-end smooth scrolling experience.
 * 
 * If you have a GSAP Club license, you can swap Lenis with:
 * import { ScrollSmoother } from 'gsap/ScrollSmoother';
 * gsap.registerPlugin(ScrollSmoother);
 * ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.5 });
 */

function App() {
  const mainRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll with enhanced configuration
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchSmooth: true,
      smoothTouch: false,
      wheelMultiplier: 1.3,
      gestureOrientation: 'vertical',
      normalizeWheel: true,
    });

    // Integrate Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after a short delay to ensure layout is stable
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Loader />
      <Navbar />

      {/* Scroll Wrapper */}
      <div id="smooth-wrapper">
        <main ref={mainRef} id="smooth-content" className="app-container">
          {/* 4D GSAP Neural Network Background */}
          <NeuralBackground />

          {/* Unified Fixed Brain Animation */}
          <BrainAnimation />

          <Hero />
          <About />
          <Projects />
          <Stats />
          <Team />
          <LaunchEvent />
          <Connect />
          <Footer />
        </main>
      </div>

      <style jsx="true">{`
        .app-container {
          width: 100%;
          overflow-x: hidden;
          position: relative;
          z-index: 1;
        }

        .app-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 245, 255, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(255, 0, 110, 0.03) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>
    </>
  );
}

export default App;
