import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
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

// Minimalist 3D Card following Mohit Virli's Awwwards aesthetic
const Card3D: React.FC<{
  project: ProjectItem;
  targetPosition: [number, number, number];
  lang: "id" | "en";
  onSelect: (project: ProjectItem) => void;
}> = ({ project, targetPosition, lang, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={targetPosition}>
      <Html
        transform
        distanceFactor={18}
        zIndexRange={[100, 0]}
        className="pointer-events-auto"
      >
        <div
          onClick={() => onSelect(project)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`w-[290px] sm:w-[320px] p-5 rounded-xl cursor-pointer transition-all duration-300 transform-gpu select-none text-left backdrop-blur-md border ${
            hovered
              ? "scale-[1.04] -translate-y-2 bg-neutral-900/95 border-white/40 shadow-2xl shadow-black/90 ring-1 ring-white/20"
              : "scale-100 bg-neutral-950/85 border-white/10 shadow-xl shadow-black/70 hover:border-white/20"
          }`}
        >
          {/* Top Date Badge & Category */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-serif italic text-xs tracking-widest text-neutral-300 font-semibold border-b border-white/20 pb-0.5">
              {project.dateBadge}
            </span>
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-tight uppercase leading-snug mb-2 line-clamp-2">
            {project.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-neutral-400 font-sans line-clamp-2 leading-relaxed mb-4">
            {lang === "id" ? project.descriptionID : project.descriptionEN}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.badges.slice(0, 3).map((badge, i) => (
              <span
                key={i}
                className="text-[9px] font-mono text-neutral-400 bg-neutral-900 border border-white/10 px-2 py-0.5 rounded-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Bottom Link Action */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs font-mono text-neutral-300">
            <span className="text-white font-medium group-hover:underline inline-flex items-center gap-1">
              <span>{lang === "id" ? "Lihat Detail" : "View Case Study"}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </span>
            <span className="text-neutral-500 text-[9px] uppercase tracking-wider">↗ Click</span>
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

  useEffect(() => {
    // Set initial camera position directly facing first row of project cards
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    const trigger = ScrollTrigger.create({
      trigger: "#projects-3d-wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;

        // Smooth camera glide through the project grid as user scrolls
        gsap.to(camera.position, {
          x: Math.sin(progress * Math.PI * 0.6) * 3,
          y: -progress * 22,
          z: 15 - progress * 26,
          duration: 0.4,
          ease: "power1.out",
          overwrite: "auto"
        });

        if (groupRef.current) {
          gsap.to(groupRef.current.rotation, {
            x: 0.2 - progress * 0.1,
            y: -0.28 + progress * 0.15,
            z: 0.05 - progress * 0.03,
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

  // Wide, spacious 3D grid layout across 100vw
  const columns = 3;
  const spacingX = 10.5;
  const spacingY = 6.2;
  const spacingZ = 4.2;

  return (
    <group ref={groupRef} rotation={[0.2, -0.28, 0.05]}>
      {projects.map((project, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);

        const x = (col - (columns - 1) / 2) * spacingX;
        const y = -row * spacingY;
        const z = -row * spacingZ + col * 1.0;

        return (
          <Card3D
            key={index}
            project={project}
            targetPosition={[x, y, z]}
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
      className="relative w-full h-[320vh] bg-[#08080a] text-white overflow-hidden"
    >
      {/* Sticky Fullscreen 3D Viewport Header */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16 pointer-events-none z-10">
        
        {/* Header Title & Filter Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pointer-events-auto pt-20 sm:pt-6 z-20">
          <div className="text-left">
            <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-1 block">
              // {lang === "id" ? "Katalog Proyek 3D" : "3D Side Projects Grid"}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight uppercase">
              {lang === "id" ? "Katalog Proyek." : "Side Projects."}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-white/10 shadow-2xl">
            {[
              { id: "all", labelID: "Semua", labelEN: "All" },
              { id: "data", labelID: "Data & AI", labelEN: "Data & AI" },
              { id: "web", labelID: "Web Dev", labelEN: "Web Dev" },
              { id: "utility", labelID: "Produktivitas", labelEN: "Productivity" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  filter === tab.id
                    ? "bg-white text-black shadow-md"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {lang === "id" ? tab.labelID : tab.labelEN}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Canvas Viewport - 100vw Fullscreen */}
        <div className="absolute inset-0 pointer-events-auto z-0 w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 15], fov: 45 }}
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
          <div className="font-mono text-xs text-neutral-400 flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>
              {lang === "id"
                ? "Scroll ke bawah untuk menelusuri grid proyek 3D ✦"
                : "Scroll down to explore 3D project grid ✦"}
            </span>
          </div>

          <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest hidden sm:block bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            Showing {filteredProjects.length} Projects
          </div>
        </div>

      </div>
    </div>
  );
};
