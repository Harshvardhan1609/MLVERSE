import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CanvasScroll = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameCount = 40;
  
  const airbnb = { frame: 0 };

  const currentFrame = (index) => (
    `/frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    const preloadImages = () => {
      const loadedImages = [];
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        loadedImages.push(img);
      }
      setImages(loadedImages);
      
      loadedImages[0].onload = () => {
        renderFrame(0, loadedImages);
      };
    };

    const renderFrame = (index, imgList) => {
      if (!imgList[index] || !context) return;
      
      const img = imgList[index];
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
      const x = (canvasWidth / 2) - (img.width / 2) * scale;
      const y = (canvasHeight / 2) - (img.height / 2) * scale;
      
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const render = () => {
      renderFrame(airbnb.frame, images);
    };

    preloadImages();
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    gsap.to(airbnb, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      onUpdate: () => renderFrame(Math.round(airbnb.frame), images)
    });

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [images.length === 0]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="scroll-canvas" />
      
      {/* CINEMATIC OVERLAYS */}
      <div className="vignette" />
      <div className="gradient-top" />
      <div className="gradient-bottom" />
      <div className="noise" />
      
      <style jsx="true">{`
        .canvas-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: -1;
          background: #000;
          overflow: hidden;
        }
        
        .scroll-canvas {
          display: block;
          width: 100%;
          height: 100%;
          opacity: 0.7; /* Slightly dim the background frames for contrast */
          filter: contrast(1.1) brightness(0.8);
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 20%, rgba(0, 0, 0, 0.7) 100%);
          pointer-events: none;
        }

        .gradient-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 30vh;
          background: linear-gradient(to bottom, #050A1A 0%, transparent 100%);
          pointer-events: none;
        }

        .gradient-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30vh;
          background: linear-gradient(to top, #050A1A 0%, transparent 100%);
          pointer-events: none;
        }

        .noise {
          position: absolute;
          inset: 0;
          background-image: url('https://grainy-gradients.vercel.app/noise.svg');
          opacity: 0.05;
          pointer-events: none;
          mix-blend-mode: overlay;
        }
      `}</style>
    </div>
  );
};

export default CanvasScroll;
