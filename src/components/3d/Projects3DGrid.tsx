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

// Sub-component for individual 3D HTML Card
const Card3D: React.FC<{
  project: ProjectItem;
  position: [number, number, number];
  lang: "id" | "en";
  onSelect: (project: ProjectItem) => void;
}> = ({ project, position, lang, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <Html
        transform
        distanceFactor={9}
        zIndexRange={[100, 0]}
        className="pointer-events-auto"
      >
        <div
          onClick={() => onSelect(project)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`w-[320px] sm:w-[350px] p-6 rounded-2xl cursor-pointer transition-all duration-300 transform-gpu select-none text-left backdrop-blur-xl border ${
            hovered
              ? "scale-105 -translate-y-2 bg-slate-900/90 border-purple-500/70 shadow-2xl shadow-purple-500/30"
              : "scale-100 bg-slate-950/80 border-slate-800/80 shadow-lg shadow-black/50 hover:border-slate-700"
          }`}
        >
          {/* Top Month/Year Badge */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] font-bold tracking-widest text-purple-400 uppercase px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-800/40">
              {project.dateBadge}
            </span>
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/60">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase leading-snug mb-2 line-clamp-2">
            {project.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-neutral-300 font-sans line-clamp-3 leading-relaxed mb-4">
            {lang === "id" ? project.descriptionID : project.descriptionEN}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.badges.slice(0, 3).map((badge, i) => (
              <span
                key={i}
                className="text-[10px] font-mono text-neutral-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full"
              >
                {badge}
              </span>
            ))}
            {project.badges.length > 3 && (
              <span className="text-[10px] font-mono text-purple-400">
                +{project.badges.length - 3}
              </span>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs font-mono">
            <span className="text-purple-400 font-semibold group-hover:underline inline-flex items-center gap-1">
              <span>{lang === "id" ? "Detail Proyek" : "View Details"}</span>
              <Sparkles className="w-3 h-3" />
            </span>
            <span className="text-neutral-500 text-[10px]">Click to open ↗</span>
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
    // Initial camera position & slant angle
    camera.position.set(0, 2, 12);
    camera.lookAt(0, 0, 0);

    const trigger = ScrollTrigger.create({
      trigger: "#projects-3d-wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;

        // Slanted camera fly-through path along the 3D grid
        gsap.to(camera.position, {
          x: Math.sin(progress * Math.PI * 0.8) * 3,
          y: 2 - progress * 14,
          z: 12 - progress * 18,
          duration: 0.5,
          ease: "power1.out",
          overwrite: "auto"
        });

        if (groupRef.current) {
          // Dynamic slanted perspective tilt (rotation-x, rotation-y)
          gsap.to(groupRef.current.rotation, {
            x: 0.25 - progress * 0.15,
            y: -0.35 + progress * 0.2,
            z: 0.1 - progress * 0.05,
            duration: 0.5,
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

  // Generate 3D grid layout coordinates for projects (Columns x Rows)
  const columns = 3;
  const spacingX = 4.8;
  const spacingY = 3.8;
  const spacingZ = 2.2;

  return (
    <group ref={groupRef} rotation={[0.25, -0.35, 0.1]}>
      {projects.map((project, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);

        const x = (col - (columns - 1) / 2) * spacingX;
        const y = -row * spacingY;
        const z = -row * spacingZ + col * 0.6;

        return (
          <Card3D
            key={index}
            project={project}
            position={[x, y, z]}
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
      className="relative w-full h-[280vh] bg-slate-950 text-white"
    >
      {/* Sticky Fullscreen 3D Viewport Header */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16 pointer-events-none z-10">
        
        {/* Header Title & Filter Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pointer-events-auto pt-16 sm:pt-4">
          <div className="text-left">
            <span className="font-mono text-xs font-bold tracking-widest text-purple-400 uppercase mb-1 block">
              // {lang === "id" ? "Katalog Proyek 3D" : "3D Side Projects Grid"}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase">
              {lang === "id" ? "Portofolio Proyek." : "Project Portfolio."}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl">
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
            camera={{ position: [0, 2, 12], fov: 45 }}
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
        <div className="flex justify-between items-end w-full pointer-events-none z-10">
          <div className="font-mono text-xs text-neutral-400 flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>
              {lang === "id"
                ? "Scroll ke bawah untuk menelusuri grid proyek 3D ✦"
                : "Scroll down to fly through 3D project grid ✦"}
            </span>
          </div>

          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest hidden sm:block">
            Showing {filteredProjects.length} Projects
          </div>
        </div>

      </div>
    </div>
  );
};
