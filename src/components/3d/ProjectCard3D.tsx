import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { ArrowUpRight, Sparkles } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  descriptionID: string;
  descriptionEN: string;
  category: "data" | "web" | "utility";
  categoryLabel: string;
  badges: string[];
  github: string;
  demo: string;
  demoLabelID: string;
  demoLabelEN: string;
  dateBadge: string;
  hasCaseStudy?: boolean;
}

interface ProjectCard3DProps {
  project: ProjectItem;
  position: [number, number, number];
  lang: "id" | "en";
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  project,
  position,
  lang,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <Html
        transform
        distanceFactor={14}
        zIndexRange={[100, 0]}
        className="pointer-events-auto"
      >
        <div
          onClick={() => onSelect(project)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`w-[300px] sm:w-[330px] p-6 rounded-2xl cursor-pointer transition-all duration-300 transform-gpu select-none text-left backdrop-blur-xl border ${
            hovered
              ? "scale-[1.05] -translate-y-2 bg-neutral-900/95 border-purple-500/80 shadow-2xl shadow-purple-500/30 ring-1 ring-purple-400/50"
              : "scale-100 bg-neutral-950/85 border-white/10 shadow-xl shadow-black/70 hover:border-white/30"
          }`}
        >
          {/* Top Date Badge & Category Pill */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-serif italic text-xs tracking-widest text-purple-300 font-semibold px-2.5 py-1 rounded-md bg-purple-950/70 border border-purple-800/40">
              {project.dateBadge}
            </span>
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10">
              {project.categoryLabel}
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
                className="text-[9px] font-mono text-neutral-400 bg-neutral-900 border border-white/10 px-2 py-0.5 rounded-full"
              >
                {badge}
              </span>
            ))}
            {project.badges.length > 3 && (
              <span className="text-[9px] font-mono text-purple-400 font-bold">
                +{project.badges.length - 3}
              </span>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs font-mono text-neutral-300">
            <span className="text-purple-400 font-semibold group-hover:underline inline-flex items-center gap-1">
              <span>{lang === "id" ? "Detail Proyek" : "View Case Study"}</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </span>
            <span className="text-neutral-500 text-[9px] uppercase tracking-wider flex items-center gap-0.5">
              <span>Click to open</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
};
