import React, { useEffect } from "react";
import { CanvasLoader } from "../common/CanvasLoader";
import { ScrollWrapper } from "../common/ScrollWrapper";
import { ExperienceScene } from "../experience";
import { usePortalStore } from "../../stores/portalStore";

interface ExperienceHubProps {
  lang: "id" | "en";
}

export const ExperienceHub: React.FC<ExperienceHubProps> = () => {
  const activePortalId = usePortalStore((state) => state.activePortalId);
  const setActivePortal = usePortalStore((state) => state.setActivePortal);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePortalId) {
        setActivePortal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePortalId, setActivePortal]);

  return (
    <div id="experience" className="w-full h-screen relative bg-[#08080a]">
      {/* 3D R3F Viewport Scene matching Mohit Virli's exact repo architecture */}
      <CanvasLoader>
        <ScrollWrapper>
          <ExperienceScene />
        </ScrollWrapper>
      </CanvasLoader>

      {/* Floating Instructions & Social Footer Overlay */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-400 pointer-events-none z-20">
        <div className="flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>
            {activePortalId
              ? "Tekan tombol ESC atau klik tombol X untuk keluar portal 3D"
              : "Klik portal WORK AND EDUCATION atau SIDE PROJECTS untuk masuk ke dunia 3D ✦"}
          </span>
        </div>

        <div className="flex gap-6 uppercase tracking-widest text-[11px] pointer-events-auto bg-neutral-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <a href="https://linkedin.com/in/ahmdfaarhaan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
          <span>•</span>
          <a href="https://github.com/ahdfaarhaan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GITHUB</a>
          <span>•</span>
          <a href="https://instagram.com/_ahdfarhan_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
        </div>
      </div>
    </div>
  );
};
