import React, { useEffect, useRef, useState } from "react";

interface LiquidRevealHeroProps {
  lang: "id" | "en";
}

export const LiquidRevealHero: React.FC<LiquidRevealHeroProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");

    const bottomCanvas = document.createElement("canvas");
    const bottomCtx = bottomCanvas.getContext("2d");

    const topCanvas = document.createElement("canvas");
    const topCtx = topCanvas.getContext("2d");

    if (!maskCtx || !bottomCtx || !topCtx) return;

    let imagesLoaded = 0;
    let animId: number;
    let isInitialized = false;

    const baseImg = new Image();
    const chromeImg = new Image();

    function onImgLoad() {
      imagesLoaded++;
      if (imagesLoaded >= 2 && !isInitialized) {
        isInitialized = true;
        initCanvas();
        animId = requestAnimationFrame(renderLoop);
      }
    }

    baseImg.onload = onImgLoad;
    chromeImg.onload = onImgLoad;

    baseImg.src = "/images/base.png";
    chromeImg.src = "/images/chrome.png";

    if (baseImg.complete && baseImg.naturalWidth !== 0) onImgLoad();
    if (chromeImg.complete && chromeImg.naturalWidth !== 0) onImgLoad();

    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      decay: number;
    }

    const particles: Particle[] = [];
    let lastPointerTime = Date.now();
    let pointerX = 0;
    let pointerY = 0;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let autoAngle = 0;

    function resize() {
      if (!container || !canvas) return;
      width = canvas.width = maskCanvas.width = bottomCanvas.width = topCanvas.width = container.clientWidth;
      height = canvas.height = maskCanvas.height = bottomCanvas.height = topCanvas.height = container.clientHeight;
    }

    function initCanvas() {
      resize();
      window.addEventListener("resize", resize);

      pointerX = width / 2;
      pointerY = height / 2;
      prevPointerX = pointerX;
      prevPointerY = pointerY;

      container?.addEventListener("pointermove", onPointerMove);
      container?.addEventListener("pointerdown", onPointerDown);
    }

    function onPointerMove(e: PointerEvent) {
      if (!container) return;
      lastPointerTime = Date.now();
      const rect = container.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;

      addParticle(pointerX, pointerY, pointerX - prevPointerX, pointerY - prevPointerY);

      prevPointerX = pointerX;
      prevPointerY = pointerY;
    }

    function onPointerDown(e: PointerEvent) {
      onPointerMove(e);
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        addParticle(
          pointerX,
          pointerY,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          Math.random() * 25 + 35
        );
      }
    }

    function addParticle(x: number, y: number, vx: number, vy: number, customRadius?: number) {
      const speed = Math.hypot(vx, vy);
      const radius = customRadius || Math.min(Math.max(speed * 2.2, 25), 75);

      particles.push({
        x,
        y,
        vx: vx * 0.15 + (Math.random() - 0.5) * 0.4,
        vy: vy * 0.15 + (Math.random() - 0.5) * 0.4,
        radius,
        maxRadius: radius * 1.2,
        alpha: 1.0,
        decay: Math.random() * 0.015 + 0.02
      });
    }

    // Scale & center portrait so full head, hair, face, and shoulders fit 100% inside screen
    function drawImageContain(targetCtx: CanvasRenderingContext2D, img: HTMLImageElement) {
      if (!img.complete || img.naturalWidth === 0) return;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      
      const maxAllowedHeight = height * (width < 640 ? 0.78 : 0.86);
      let drawHeight = maxAllowedHeight;
      let drawWidth = drawHeight * imgRatio;

      if (drawWidth > width * 0.92) {
        drawWidth = width * 0.92;
        drawHeight = drawWidth / imgRatio;
      }

      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2 + (width < 640 ? 25 : 15);

      targetCtx.clearRect(0, 0, width, height);
      targetCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    function renderLoop() {
      if (!ctx || !maskCtx || !topCtx || !bottomCtx) return;

      const now = Date.now();

      // Idle Drift Mode around the face area when no interaction
      if (now - lastPointerTime > 1200) {
        autoAngle += 0.02;
        const autoX = width * 0.5 + Math.sin(autoAngle) * (width * 0.1);
        const autoY = height * 0.42 + Math.cos(autoAngle * 0.8) * (height * 0.08);
        addParticle(autoX, autoY, Math.sin(autoAngle) * 1.5, Math.cos(autoAngle * 0.8) * 1.5, 45);
      }

      drawImageContain(topCtx, baseImg);
      drawImageContain(bottomCtx, chromeImg);

      maskCtx.clearRect(0, 0, width, height);
      maskCtx.fillStyle = "rgba(0, 0, 0, 1)";
      maskCtx.fillRect(0, 0, width, height);

      maskCtx.globalCompositeOperation = "destination-out";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.radius += (p.maxRadius - p.radius) * 0.06;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const grad = maskCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(0, 0, 0, ${p.alpha})`);
        grad.addColorStop(0.5, `rgba(0, 0, 0, ${p.alpha * 0.65})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        maskCtx.fillStyle = grad;
        maskCtx.beginPath();
        maskCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        maskCtx.fill();
      }

      maskCtx.globalCompositeOperation = "source-over";

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Step A: Draw Bottom (Revealed/Chrome) Layer
      ctx.drawImage(bottomCanvas, 0, 0);

      // Step B: Mask Top (Base) Layer
      topCtx.globalCompositeOperation = "destination-in";
      topCtx.drawImage(maskCanvas, 0, 0);
      topCtx.globalCompositeOperation = "source-over";

      // Step C: Draw Masked Top Layer onto Main Canvas
      ctx.drawImage(topCanvas, 0, 0);

      // Step D: Subtle Chromatic Fringe Offset at Reveal Edge
      if (particles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = 0.22;
        ctx.drawImage(topCanvas, -2, -1);
        ctx.drawImage(topCanvas, 2, 1);
        ctx.restore();
      }

      animId = requestAnimationFrame(renderLoop);
    }

    return () => {
      window.removeEventListener("resize", resize);
      container?.removeEventListener("pointermove", onPointerMove);
      container?.removeEventListener("pointerdown", onPointerDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden touch-none select-none bg-black text-white"
    >
      {/* Reduced Motion Static Fallback */}
      {isReducedMotion && (
        <img
          src="/images/base.png"
          alt="Ahmad Farhan"
          className="absolute inset-0 w-full h-full object-contain z-0"
        />
      )}

      {/* Interactive Liquid Canvas */}
      {!isReducedMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10 cursor-crosshair" />
      )}

      {/* Editorial Overlay Typography - Cindy Zhu Reference Style */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8 sm:p-12 lg:p-16">
        
        {/* Top Left Title Logo */}
        <div className="text-left pt-16 sm:pt-4">
          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-none">
            Ahmad Farhan<span className="text-purple-400">.</span>
          </h1>
        </div>

        {/* Bottom Bar Content */}
        <div className="flex flex-col sm:flex-row justify-between items-end gap-6 w-full">
          {/* Bottom Left Tagline & Bio */}
          <div className="max-w-md text-left">
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed tracking-wide">
              {lang === "id"
                ? "Mahasiswa Teknik Informatika UMRI & Peneliti AI / NLP. Eksplorasi batas antara intuisi manusia, kecerdasan buatan, dan sistem produktivitas."
                : "IT Student at UMRI & AI / NLP Researcher. Exploring the boundary between human intuition, engineered intelligence, and productivity systems."}
            </p>
          </div>

          {/* Bottom Right Indicator */}
          <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>(Usap Layar / Scroll)</span>
          </div>
        </div>

      </div>
    </div>
  );
};
