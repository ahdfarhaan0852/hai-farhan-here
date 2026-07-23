import React, { useEffect, useRef, useState } from "react";

interface LiquidRevealHeroProps {
  lang: "id" | "en";
}

export const LiquidRevealHero: React.FC<LiquidRevealHeroProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Offscreen canvases for masking & rendering layers
    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");

    const bottomCanvas = document.createElement("canvas");
    const bottomCtx = bottomCanvas.getContext("2d");

    const topCanvas = document.createElement("canvas");
    const topCtx = topCanvas.getContext("2d");

    if (!maskCtx || !bottomCtx || !topCtx) return;

    // Load Image Layers
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

    baseImg.onerror = () => console.error("Failed to load /images/base.jpg");
    chromeImg.onerror = () => console.error("Failed to load /images/chrome.jpg");

    baseImg.src = "/images/base.jpg";
    chromeImg.src = "/images/chrome.jpg";

    // Handle instant cache loads
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
        const speed = Math.random() * 6 + 2;
        addParticle(
          pointerX,
          pointerY,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          Math.random() * 40 + 50
        );
      }
    }

    function addParticle(x: number, y: number, vx: number, vy: number, customRadius?: number) {
      const speed = Math.hypot(vx, vy);
      const radius = customRadius || Math.min(Math.max(speed * 3.5, 45), 140);

      particles.push({
        x,
        y,
        vx: vx * 0.15 + (Math.random() - 0.5) * 0.5,
        vy: vy * 0.15 + (Math.random() - 0.5) * 0.5,
        radius,
        maxRadius: radius * 1.3,
        alpha: 1.0,
        decay: Math.random() * 0.015 + 0.018
      });
    }

    function drawImageCover(targetCtx: CanvasRenderingContext2D, img: HTMLImageElement) {
      if (!img.complete || img.naturalWidth === 0) return;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const screenRatio = width / height;
      let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

      if (screenRatio > imgRatio) {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        drawHeight = height;
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      }

      targetCtx.clearRect(0, 0, width, height);
      targetCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    function renderLoop() {
      if (!ctx || !maskCtx || !topCtx || !bottomCtx) return;

      const now = Date.now();

      // Idle Drift Mode (when no user interaction for > 1.2s)
      if (now - lastPointerTime > 1200) {
        autoAngle += 0.02;
        const autoX = width * 0.5 + Math.sin(autoAngle) * (width * 0.25);
        const autoY = height * 0.45 + Math.cos(autoAngle * 0.7) * (height * 0.2);
        addParticle(autoX, autoY, Math.sin(autoAngle) * 2, Math.cos(autoAngle * 0.7) * 2, 85);
      }

      // Draw Top & Bottom Images to offscreen buffers
      drawImageCover(topCtx, baseImg);
      drawImageCover(bottomCtx, chromeImg);

      // Clear Mask Canvas to solid white (fully opaque mask)
      maskCtx.clearRect(0, 0, width, height);
      maskCtx.fillStyle = "rgba(0, 0, 0, 1)";
      maskCtx.fillRect(0, 0, width, height);

      // Erase mask where particles are located (reveal bottom layer)
      maskCtx.globalCompositeOperation = "destination-out";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.radius += (p.maxRadius - p.radius) * 0.05;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const grad = maskCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(0, 0, 0, ${p.alpha})`);
        grad.addColorStop(0.5, `rgba(0, 0, 0, ${p.alpha * 0.7})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        maskCtx.fillStyle = grad;
        maskCtx.beginPath();
        maskCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        maskCtx.fill();
      }

      maskCtx.globalCompositeOperation = "source-over";

      // Composite Rendering on Main Canvas
      ctx.fillStyle = "#030712";
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
        ctx.globalAlpha = 0.25;

        // Red Channel Shift (-2, -1)
        ctx.drawImage(topCanvas, -2, -1);
        // Cyan/Blue Channel Shift (+2, +1)
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
      className="relative w-full h-[100svh] overflow-hidden touch-none select-none bg-slate-950"
    >
      {/* Reduced Motion Static Fallback */}
      {isReducedMotion && (
        <img
          src="/images/base.jpg"
          alt="Ahmad Farhan"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Interactive Liquid Canvas */}
      {!isReducedMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10" />
      )}

      {/* Overlay UI & Typography */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-radial from-transparent via-slate-950/40 to-slate-950/85">
        <div className="flex justify-between items-center w-full">
          <div className="font-display font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-400 uppercase">
            FARHAN
          </div>
          <div className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/70 backdrop-blur-md border border-purple-500/30 text-xs font-semibold text-purple-300 tracking-wider uppercase shadow-xl">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span>Interactive Liquid Hero</span>
          </div>
        </div>

        <div className="max-w-2xl mb-4 text-left">
          <span className="font-mono text-xs font-bold tracking-widest text-purple-400 uppercase mb-2 block">
            • {lang === "id" ? "Pengenalan Interaktif" : "Interactive Showcase"}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-none mb-3 text-shadow">
            AHMAD <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">FARHAN</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-sans mb-6">
            {lang === "id"
              ? "Mahasiswa Teknik Informatika UMRI, Peneliti AI & Natural Language Processing, serta Pengembang Sistem Produktivitas Lintas Disiplin."
              : "IT Student at UMRI, AI & Natural Language Processing Researcher, and Cross-Discipline Productivity Systems Developer."}
          </p>
          <div className="inline-flex items-center gap-3 font-mono text-xs text-slate-400 bg-slate-900/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800">
            <span className="text-purple-400 animate-bounce">✦</span>
            <span>
              {lang === "id"
                ? "Geser kursor / sentuh layar untuk melihat efek liquid reveal"
                : "Move pointer or touch screen to reveal fluid liquid layer"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
