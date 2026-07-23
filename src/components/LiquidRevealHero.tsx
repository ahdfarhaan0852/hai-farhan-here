import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

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
          Math.random() * 35 + 45
        );
      }
    }

    function addParticle(x: number, y: number, vx: number, vy: number, customRadius?: number) {
      const speed = Math.hypot(vx, vy);
      const radius = customRadius || Math.min(Math.max(speed * 3, 35), 110);

      particles.push({
        x,
        y,
        vx: vx * 0.15 + (Math.random() - 0.5) * 0.4,
        vy: vy * 0.15 + (Math.random() - 0.5) * 0.4,
        radius,
        maxRadius: radius * 1.25,
        alpha: 1.0,
        decay: Math.random() * 0.018 + 0.02
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

      if (now - lastPointerTime > 1200) {
        autoAngle += 0.025;
        const autoX = width * 0.5 + Math.sin(autoAngle) * (width * 0.3);
        const autoY = height * 0.5 + Math.cos(autoAngle * 0.8) * (height * 0.25);
        addParticle(autoX, autoY, Math.sin(autoAngle) * 2, Math.cos(autoAngle * 0.8) * 2, 70);
      }

      drawImageCover(topCtx, baseImg);
      drawImageCover(bottomCtx, chromeImg);

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

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(bottomCanvas, 0, 0);

      topCtx.globalCompositeOperation = "destination-in";
      topCtx.drawImage(maskCanvas, 0, 0);
      topCtx.globalCompositeOperation = "source-over";

      ctx.drawImage(topCanvas, 0, 0);

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
    <div className="w-full min-h-[90vh] flex items-center justify-center pt-24 pb-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Information & Typography (lg:col-span-7) */}
        <div className="lg:col-span-7 text-left flex flex-col items-start gap-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-rose-soft/40 dark:bg-brand-plum-charcoal/50 border border-brand-rose-dust/30 dark:border-brand-plum-muted/20 font-mono text-xs font-bold tracking-widest text-brand-lavender-soft dark:text-brand-lavender-bright uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === "id" ? "Perkenalan Singkat" : "Personal Introduction"}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tighter leading-[0.95] uppercase">
            AHMAD <br />
            <span className="text-brand-lavender-soft dark:text-brand-lavender-bright">FARHAN.</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 font-sans max-w-xl text-justify">
            {lang === "id"
              ? "Mahasiswa Teknik Informatika di Universitas Muhammadiyah Riau yang aktif mengelola usaha retail alif-parcel. Memiliki kegemaran berolahraga dengan minat mendalam di cabang Powerlifting, serta memiliki dedikasi kepemimpinan kuat melalui perjalanan panjang di organisasi kepramukaan."
              : "IT student at Universitas Muhammadiyah Riau who actively manages the alif-parcel retail business. Highly passionate about strength training with a deep focus on Powerlifting, combined with a strong leadership background forged through extensive scouting organizations."}
          </p>

          <div className="flex flex-wrap gap-4 items-center pt-2">
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-mono font-bold text-xs sm:text-sm tracking-wider uppercase hover:opacity-90 transition-opacity shadow-lg"
            >
              <span>{lang === "id" ? "Pelajari Selengkapnya" : "Learn More"}</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-brand-rose-dust/40 dark:border-brand-plum-muted/30 font-mono text-xs text-neutral-500 dark:text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{lang === "id" ? "Geser kursor pada foto ✦" : "Hover photo for reveal ✦"}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Portrait Card Container (lg:col-span-5) */}
        <div className="lg:col-span-5 flex justify-center items-center w-full">
          <div
            ref={containerRef}
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-brand-rose-dust/40 dark:border-brand-plum-muted/30 shadow-2xl shadow-purple-900/10 touch-none select-none group bg-slate-900"
          >
            {/* Reduced Motion Static Fallback */}
            {isReducedMotion && (
              <img
                src="/images/base.png"
                alt="Ahmad Farhan Portrait"
                className="w-full h-full object-cover"
              />
            )}

            {/* Interactive Canvas */}
            {!isReducedMotion && (
              <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
            )}

            {/* Subtle Inner Glass Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-white/10 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        </div>

      </div>
    </div>
  );
};
