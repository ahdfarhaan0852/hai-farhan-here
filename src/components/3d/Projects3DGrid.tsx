import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export const Projects3DGrid: React.FC<Projects3DGridProps> = ({
  projects,
  lang,
  onSelectProject
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "data" | "web" | "utility">("all");

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // GSAP ScrollTrigger 3D Slanted Perspective Progression
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;

        // 3D Perspective Plane Tilt & Fly-Through Translation
        gsap.to(grid, {
          rotateX: 16 - progress * 12,
          rotateY: -14 + progress * 16,
          rotateZ: 3 - progress * 4,
          translateY: -progress * 600,
          translateZ: progress * 120,
          duration: 0.4,
          ease: "power1.out",
          overwrite: "auto"
        });
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      id="projects-3d-wrapper"
      className="relative w-full min-h-[300vh] bg-[#08080a] text-white overflow-hidden"
    >
      {/* Sticky Fullscreen 3D Viewport Controls */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16 pointer-events-none z-30">
        
        {/* Header Title & Filter Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pointer-events-auto pt-20 sm:pt-6 z-20">
          <div className="text-left bg-neutral-950/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-1 block">
              // {lang === "id" ? "Katalog Proyek 3D" : "3D Side Projects Grid"}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-none">
              {lang === "id" ? "Katalog Proyek." : "Side Projects."}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-2xl">
            {[
              { id: "all", labelID: "Semua", labelEN: "All" },
              { id: "data", labelID: "Data & AI", labelEN: "Data & AI" },
              { id: "web", labelID: "Web Dev", labelEN: "Web Dev" },
              { id: "utility", labelID: "Produktivitas", labelEN: "Productivity" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
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

        {/* 3D Slanted Perspective Grid Viewport Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10 [perspective:1400px] overflow-hidden pt-28 pb-16">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 w-full max-w-7xl px-6 [transform-style:preserve-3d] transition-transform duration-300 origin-center"
            style={{
              transform: "rotateX(16deg) rotateY(-14deg) rotateZ(3deg)"
            }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                viewport={{ once: true }}
                onClick={() => onSelectProject(project)}
                className="group relative p-6 rounded-2xl cursor-pointer bg-neutral-950/90 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/40 hover:bg-neutral-900/95 transition-all duration-300 transform-gpu hover:-translate-y-3 hover:scale-[1.03] text-left flex flex-col justify-between min-h-[260px]"
              >
                <div>
                  {/* Top Month/Year Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif italic text-xs tracking-widest text-neutral-300 font-semibold border-b border-white/20 pb-0.5">
                      {project.dateBadge}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase leading-snug mb-3 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-neutral-400 font-sans line-clamp-3 leading-relaxed mb-4">
                    {lang === "id" ? project.descriptionID : project.descriptionEN}
                  </p>
                </div>

                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.badges.slice(0, 3).map((badge, bIndex) => (
                      <span
                        key={bIndex}
                        className="text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-white/10 px-2.5 py-0.5 rounded"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs font-mono text-neutral-300">
                    <span className="text-white font-medium group-hover:underline inline-flex items-center gap-1">
                      <span>{lang === "id" ? "Lihat Detail" : "View Case Study"}</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                    <span className="text-neutral-500 text-[10px] uppercase tracking-wider">↗ Click</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Helper Indicator */}
        <div className="flex justify-between items-end w-full pointer-events-none z-20">
          <div className="font-mono text-xs text-neutral-300 flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
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
