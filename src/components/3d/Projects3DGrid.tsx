import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export interface ProjectItem {
  title: string;
  descriptionID: string;
  descriptionEN: string;
  category: "data" | "web" | "utility";
  badges: string[];
  github: string;
  demo: string;
  demoLabelID: string;
  demoLabelEN: string;
  dateBadge: string;
  hasCaseStudy?: boolean;
}

interface Projects3DGridProps {
  projects: ProjectItem[];
  lang: "id" | "en";
  onSelectProject: (project: ProjectItem) => void;
}

// Sub-component for individual 3D HTML Card with staggered scroll entrance motion
const Card3D: React.FC<{
  project: ProjectItem;
  targetPosition: [number, number, number];
  index: number;
  progress: number;
  lang: "id" | "en";
  onSelect: (project: ProjectItem) => void;
}> = ({ project, targetPosition, index, progress, lang, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  // Staggered entrance animation calculated from scroll progress & card index
  const staggerDelay = index * 0.035;
  const cardProgress = Math.max(0, Math.min(1, (progress - staggerDelay) * 3.5));
  
  // Interpolated entrance scale, opacity, and Z depth shift
  const scale = 0.6 + cardProgress * 0.4;
  const opacity = cardProgress;
  const currentZ = targetPosition[2] - (1 - cardProgress) * 5;

  return (
    <group position={[targetPosition[0], targetPosition[1], currentZ]} scale={[scale, scale, scale]}>
      <Html
        transform
        distanceFactor={16}
        zIndexRange={[100, 0]}
        className="pointer-events-auto"
        style={{
          opacity: opacity,
          transition: "opacity 0.4s ease-out, transform 0.3s ease-out"
        }}
      >
        <div
          onClick={() => onSelect(project)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`w-[290px] sm:w-[320px] p-5 rounded-2xl cursor-pointer transition-all duration-300 transform-gpu select-none text-left backdrop-blur-2xl border ${
            hovered
              ? "scale-105 -translate-y-2 bg-slate-900/95 border-purple-500/90 shadow-2xl shadow-purple-500/40 ring-1 ring-purple-400/50"
              : "scale-100 bg-slate-950/85 border-slate-800/80 shadow-xl shadow-black/70 hover:border-slate-700"
          }`}
        >
          {/* Top Month/Year Badge */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] font-bold tracking-widest text-purple-300 uppercase px-2.5 py-1 rounded-md bg-purple-950/70 border border-purple-800/50">
              {project.dateBadge}
            </span>
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/70">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display font-extrabold text-base sm:text-lg text-white tracking-tight uppercase leading-snug mb-2 line-clamp-2">
            {project.title}
          </h3>

          {/* Description snippet */}
          <p className="text-[11px] text-neutral-300 font-sans line-clamp-2 leading-relaxed mb-3">
            {lang === "id" ? project.descriptionID : project.descriptionEN}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.badges.slice(0, 3).map((badge, i) => (
              <span
                key={i}
                className="text-[9px] font-mono text-neutral-400 bg-slate-900 border border-slate-800/80 px-2 py-0.5 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[11px] font-mono">
            <span className="text-purple-400 font-semibold group-hover:underline inline-flex items-center gap-1">
              <span>{lang === "id" ? "Detail Proyek" : "View Details"}</span>
              <Sparkles className="w-3 h-3" />
            </span>
            <span className="text-neutral-500 text-[9px]">Click to open ↗</span>
          </div>
        </div>
      </Html>
    </group>
  );
};

// 3D Camera & Grid Rig Controller Driven by GSAP ScrollTrigger
const SceneRig: React.FC<{
  projects: ProjectItem[];
  lang: "id" | "en";
  onSelectProject: (project: ProjectItem) => void;
}> = ({ projects, lang, onSelectProject }) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initial camera position & slant angle
    camera.position.set(0, 1.5, 14);
    camera.lookAt(0, 0, 0);

    const trigger = ScrollTrigger.create({
      trigger: "#projects-3d-wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        // Smooth slanted camera fly-through path along the 3D grid
        gsap.to(camera.position, {
          x: Math.sin(progress * Math.PI * 0.7) * 2.5,
          y: 1.5 - progress * 16,
          z: 14 - progress * 22,
          duration: 0.4,
          ease: "power1.out",
          overwrite: "auto"
        });

        if (groupRef.current) {
          // Dynamic slanted perspective tilt (rotation-x, rotation-y)
          gsap.to(groupRef.current.rotation, {
            x: 0.22 - progress * 0.12,
            y: -0.32 + progress * 0.18,
            z: 0.08 - progress * 0.04,
            duration: 0.4,
            ease: "power1.out",
            overwrite: "auto"
          });
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, [camera]);

  // Generous 3D grid spacing to prevent overlapping
  const columns = 3;
  const spacingX = 6.8;
  const spacingY = 5.4;
  const spacingZ = 3.6;

  return (
    <group ref={groupRef} rotation={[0.22, -0.32, 0.08]}>
      {projects.map((project, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);

        const x = (col - (columns - 1) / 2) * spacingX;
        const y = -row * spacingY;
        const z = -row * spacingZ + col * 0.8;

        return (
          <Card3D
            key={index}
            project={project}
            targetPosition={[x, y, z]}
            index={index}
            progress={scrollProgress}
            lang={lang}
            onSelect={onSelectProject}
          />
        );
      })}
    </group>
  );
};

export const Projects3DGrid: React.FC<Projects3DGridProps> = ({
  projects,
  lang,
  onSelectProject
}) => {
  const [filter, setFilter] = useState<"all" | "data" | "web" | "utility">("all");

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <div
      id="projects-3d-wrapper"
      className="relative w-full h-[320vh] bg-slate-950 text-white"
    >
      {/* Sticky Fullscreen 3D Viewport Header */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16 pointer-events-none z-10">
        
        {/* Header Title & Filter Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pointer-events-auto pt-20 sm:pt-6 z-20">
          <div className="text-left bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80">
            <span className="font-mono text-xs font-bold tracking-widest text-purple-400 uppercase mb-1 block">
              // {lang === "id" ? "Katalog Proyek 3D" : "3D Side Projects Grid"}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase">
              {lang === "id" ? "Portofolio Proyek." : "Project Portfolio."}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl">
            {[
              { id: "all", labelID: "Semua", labelEN: "All" },
              { id: "data", labelID: "Data & AI", labelEN: "Data & AI" },
              { id: "web", labelID: "Web Dev", labelEN: "Web Dev" },
              { id: "utility", labelID: "Produktivitas", labelEN: "Productivity" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  filter === tab.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "text-neutral-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {lang === "id" ? tab.labelID : tab.labelEN}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Canvas Viewport */}
        <div className="absolute inset-0 pointer-events-auto z-0">
          <Canvas
            camera={{ position: [0, 1.5, 14], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full"
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 15, 10]} intensity={1.2} />
            <SceneRig
              projects={filteredProjects}
              lang={lang}
              onSelectProject={onSelectProject}
            />
          </Canvas>
        </div>

        {/* Scroll Helper Bottom Indicator */}
        <div className="flex justify-between items-end w-full pointer-events-none z-20">
          <div className="font-mono text-xs text-neutral-300 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>
              {lang === "id"
                ? "Scroll ke bawah untuk menelusuri grid proyek 3D ✦"
                : "Scroll down to fly through 3D project grid ✦"}
            </span>
          </div>

          <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest hidden sm:block bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
            Showing {filteredProjects.length} Projects
          </div>
        </div>

      </div>
    </div>
  );
};
