import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 40;
const getFrameUrl = (i) => `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;

// Preload all frames once globally
let cachedImages = null;
let isLoading = false;
let loadCallbacks = [];

function preloadFrames(onReady) {
  if (cachedImages) { onReady(cachedImages); return; }
  loadCallbacks.push(onReady);
  if (isLoading) return;
  isLoading = true;

  const imgs = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const img = new Image();
    img.src = getFrameUrl(i);
    return img;
  });

  let loaded = 0;
  imgs.forEach(img => {
    const done = () => { if (++loaded === FRAME_COUNT) { cachedImages = imgs; loadCallbacks.forEach(cb => cb(imgs)); loadCallbacks = []; } };
    img.complete ? done() : (img.onload = img.onerror = done);
  });
}

const BrainAnimation = () => {
  const canvasRef  = useRef(null);
  const wrapRef    = useRef(null);
  const stateRef   = useRef({ target: 0, current: 0, images: null, rafId: null });

  useEffect(() => {
    const canvas  = canvasRef.current;
    const wrap    = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    // Size canvas to viewport
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(stateRef.current.current); // redraw after resize
    };
    resize();
    window.addEventListener('resize', resize);

    // Draw a single (possibly fractional) frame with lerp crossfade
    function drawFrame(f) {
      const { images } = stateRef.current;
      if (!images) return;
      const lo = Math.floor(Math.max(0, Math.min(f, FRAME_COUNT - 1)));
      const hi = Math.min(lo + 1, FRAME_COUNT - 1);
      const t  = f - lo;
      const W  = canvas.width, H = canvas.height;

      const draw = (img, alpha) => {
        if (!img || !img.complete || !img.naturalWidth) return;
        const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
        const x = (W - img.naturalWidth  * scale) / 2;
        const y = (H - img.naturalHeight * scale) / 2;
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
      };

      ctx.clearRect(0, 0, W, H);
      draw(images[lo], 1);
      if (t > 0.01) draw(images[hi], t);
      ctx.globalAlpha = 1;
    }

    // Lerp loop — runs at 60fps, smoothly chases target frame
    let rafId;
    const LERP = 0.12;
    function loop() {
      const s = stateRef.current;
      const diff = s.target - s.current;
      if (Math.abs(diff) > 0.01) {
        s.current += diff * LERP;
        drawFrame(s.current);
      }
      rafId = requestAnimationFrame(loop);
    }

    preloadFrames(images => {
      stateRef.current.images = images;
      drawFrame(0); // show frame 0 immediately
      loop();       // start smooth lerp loop

      // Store only the brain's own triggers for cleanup
      const brainTriggers = [];

      // ── ScrollTrigger: Hero → About frame scrub ──
      brainTriggers.push(ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        endTrigger: '#about',
        end: 'bottom bottom',
        scrub: true,
        onUpdate(self) {
          stateRef.current.target = self.progress * (FRAME_COUNT - 1);
        },
      }));

      // ── Fade out brain when reaching projects ──
      brainTriggers.push(ScrollTrigger.create({
        trigger: '#projects',
        start: 'top 90%',
        end: 'top 30%',
        scrub: true,
        onUpdate(self) {
          gsap.set(wrap, { opacity: 1 - self.progress });
        },
        onLeave()     { gsap.set(wrap, { opacity: 0 }); },
        onEnterBack() { gsap.set(wrap, { opacity: 1 }); },
      }));

      ScrollTrigger.refresh();

      // Store triggers on stateRef for cleanup
      stateRef.current.triggers = brainTriggers;
    });

    // ── Fade in immediately on mount ──
    gsap.fromTo(wrap, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' });

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      // Only kill the brain's own ScrollTriggers — never kill all global triggers!
      if (stateRef.current.triggers) {
        stateRef.current.triggers.forEach(st => st.kill());
      }
    };
  }, []);

  return (
    <div ref={wrapRef} className="brain-wrap">
      <canvas ref={canvasRef} className="brain-canvas" />
      <div className="brain-overlay" />
      <div className="brain-vignette" />

      <style jsx="true">{`
        .brain-wrap {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          will-change: opacity;
        }

        .brain-canvas {
          width: 100%;
          height: 100%;
          display: block;
          filter: contrast(1.1) brightness(0.65) saturate(1.15);
        }

        /* top-to-bottom gradient: keep top slightly visible, darken bottom */
        .brain-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg,
              rgba(5,10,26,0.35)  0%,
              transparent         20%,
              transparent         75%,
              rgba(5,10,26,0.7)  100%);
        }

        /* edge vignette */
        .brain-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center,
            transparent 30%,
            rgba(5,10,26,0.55) 100%);
        }
      `}</style>
    </div>
  );
};

export default BrainAnimation;
export const AboutBrainAnimation = () => null;