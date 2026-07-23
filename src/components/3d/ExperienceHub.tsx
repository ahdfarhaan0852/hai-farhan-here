import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, BarChart3, Code2, ExternalLink, Info } from "lucide-react";
import { Projects3DPanorama } from "./Projects3DPanorama";
import { Timeline3DView } from "./Timeline3DView";

interface ExperienceHubProps {
  lang: "id" | "en";
}

export const ExperienceHub: React.FC<ExperienceHubProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeView, setActiveView] = useState<"hub" | "work" | "projects">("hub");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Smooth mouse movement tilt tracking (-1 to 1)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = -(e.clientY / innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      id="experience"
      className="relative w-full min-h-screen bg-[#070709] text-white overflow-hidden py-16 flex flex-col justify-between"
    >
      {/* Background Starfield / Dust Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#070709] to-[#050507] pointer-events-none z-0" />
      
      {/* Header Label: E X P E R I E N C E */}
      <div className="relative z-20 pt-8 pb-4 text-center">
        <span className="font-serif tracking-[0.4em] text-xs sm:text-sm text-neutral-400 uppercase font-semibold border-b border-white/15 pb-1">
          E X P E R I E N C E
        </span>
      </div>

      {/* Main Interactive Hub (Dual Portals) */}
      <AnimatePresence mode="wait">
        {activeView === "hub" && (
          <motion.div
            key="hub"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 my-auto px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              
              {/* Left Portal: WORK AND EDUCATION */}
              <div
                onClick={() => setActiveView("work")}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/15 bg-neutral-950/80 shadow-2xl transition-all duration-500 transform-gpu hover:border-white/40"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg) translateY(${mousePos.y * -8}px)`,
                }}
              >
                {/* Artwork Canvas Background */}
                <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden bg-[#121115]">
                  <img
                    src="/images/projects/feature_importance.png"
                    alt="Work and Education Artwork"
                    className="w-full h-full object-cover opacity-45 group-hover:scale-105 group-hover:opacity-65 transition-all duration-700 filter brightness-90 contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Overlay Typography */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-left">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                        01 / HISTORY
                      </span>
                      <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white text-neutral-300 group-hover:text-black transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-wide uppercase leading-none mb-3">
                        WORK <br /> AND <br /> EDUCATION
                      </h3>
                      <p className="font-mono text-xs text-neutral-300 max-w-xs leading-relaxed">
                        Pondok Modern Gontor • UMRI Teknik Informatika • Powerlifting Athlete • alif-parcel Management
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Portal: SIDE PROJECTS */}
              <div
                onClick={() => setActiveView("projects")}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/15 bg-neutral-950/80 shadow-2xl transition-all duration-500 transform-gpu hover:border-white/40"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg) translateY(${mousePos.y * -8}px)`,
                }}
              >
                {/* Artwork Canvas Background */}
                <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden bg-[#0d1217]">
                  <img
                    src="/images/projects/shap_summary.png"
                    alt="Side Projects Artwork"
                    className="w-full h-full object-cover opacity-45 group-hover:scale-105 group-hover:opacity-65 transition-all duration-700 filter brightness-90 contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Overlay Typography */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-left">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase bg-white/10 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                        02 / KATALOG
                      </span>
                      <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white text-neutral-300 group-hover:text-black transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-wide uppercase leading-none mb-3">
                        SIDE <br /> PROJECTS
                      </h3>
                      <p className="font-mono text-xs text-neutral-300 max-w-xs leading-relaxed">
                        15+ Interactive 3D Projects (Data Science, XGBoost, n8n Multi-Agent AI, Fullstack Web)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* View 1: 3D Work & Education Timeline */}
        {activeView === "work" && (
          <motion.div
            key="work-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full min-h-[85vh] flex flex-col justify-between"
          >
            {/* Top Return Controls */}
            <div className="flex justify-between items-center px-6 sm:px-12 z-30">
              <button
                onClick={() => setActiveView("hub")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-white hover:bg-white hover:text-black transition-all"
              >
                <span>← Kembali ke Menu Hub</span>
              </button>
              <span className="font-serif italic text-sm text-neutral-400">
                Work & Education 3D Timeline
              </span>
            </div>

            {/* 3D Timeline Component */}
            <div className="w-full flex-grow relative">
              <Timeline3DView lang={lang} mousePos={mousePos} />
            </div>
          </motion.div>
        )}

        {/* View 2: 3D Side Projects Panorama */}
        {activeView === "projects" && (
          <motion.div
            key="projects-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full min-h-[85vh] flex flex-col justify-between"
          >
            {/* Top Return Controls */}
            <div className="flex justify-between items-center px-6 sm:px-12 z-30">
              <button
                onClick={() => setActiveView("hub")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-white hover:bg-white hover:text-black transition-all"
              >
                <span>← Kembali ke Menu Hub</span>
              </button>
              <span className="font-serif italic text-sm text-neutral-400">
                3D Interactive Projects Panorama
              </span>
            </div>

            {/* 3D Projects Panorama Component */}
            <div className="w-full flex-grow relative">
              <Projects3DPanorama
                lang={lang}
                mousePos={mousePos}
                onSelectProject={(proj) => setSelectedProject(proj)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Social Links (Awwwards Style) */}
      <div className="relative z-20 pt-6 pb-2 border-t border-white/10 mx-6 sm:mx-12 flex flex-wrap justify-center sm:justify-between items-center gap-4 text-xs font-mono text-neutral-400">
        <div className="flex gap-6 uppercase tracking-widest text-[11px]">
          <a href="https://linkedin.com/in/ahmdfaarhaan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
          <span>•</span>
          <a href="https://github.com/ahdfaarhaan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GITHUB</a>
          <span>•</span>
          <a href="https://instagram.com/_ahdfarhan_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
          <span>•</span>
          <a href="https://wa.me/6285351561344" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WHATSAPP</a>
        </div>
        <div className="text-neutral-500 text-[10px]">
          AHMAD FARHAN © 2026
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-left"
            >
              <div className="sticky top-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 p-6 flex items-center justify-between z-10">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase block mb-1">
                    {selectedProject.dateBadge} • {selectedProject.categoryLabel || selectedProject.category}
                  </span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-neutral-50 uppercase tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-grow">
                {selectedProject.hasCaseStudy ? (
                  <div className="space-y-8">
                    <div className="border border-purple-500/30 rounded-xl p-6 bg-purple-950/20">
                      <h4 className="font-mono text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        {lang === "id" ? "Ringkasan Abstrak Penelitian" : "Research Abstract Summary"}
                      </h4>
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed text-justify">
                        {lang === "id" ? (
                          <>
                            Penelitian ini menganalisis sentimen berita olahraga nasional berbahasa Indonesia untuk memprediksi <strong>skor tren kesehatan masyarakat</strong> (kontinu 0–100). Dengan mengekstrak data teks berita olahraga menggunakan <strong>TF-IDF Vectorizer</strong> (5.000 fitur) dan seleksi fitur <strong>SelectKBest (F-Regression)</strong> ke 1.000 fitur, model <strong>XGBoost Regressor</strong> dilatih untuk memprediksi fluktuasi minat dan sentimen publik terhadap aktivitas olahraga.
                          </>
                        ) : (
                          <>
                            This research analyzes the sentiment of Indonesian national sports news to predict <strong>public health trend scores</strong> (continuous scale 0–100). By extracting sports news text using a <strong>TF-IDF Vectorizer</strong> (5,000 features) and performing feature selection via <strong>SelectKBest (F-Regression)</strong> down to 1,000 features, an <strong>XGBoost Regressor</strong> model was trained to predict variations in public interest and sentiment towards physical fitness and athletic activities.
                          </>
                        )}
                      </p>
                    </div>

                    <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-950 flex flex-col gap-4">
                      <h4 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                        <Info className="w-4 h-4 text-purple-400" />
                        {lang === "id" ? "Metrik Evaluasi Performa Model" : "Model Performance Evaluation Metrics"}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800">
                          <span className="block text-[10px] font-mono text-neutral-400">MSE</span>
                          <span className="block text-lg font-display font-bold text-white">266.9614</span>
                        </div>
                        <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800">
                          <span className="block text-[10px] font-mono text-neutral-400">RMSE</span>
                          <span className="block text-lg font-display font-bold text-white">16.3390</span>
                        </div>
                        <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800">
                          <span className="block text-[10px] font-mono text-neutral-400">MAE</span>
                          <span className="block text-lg font-display font-bold text-white">10.6259</span>
                        </div>
                        <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800">
                          <span className="block text-[10px] font-mono text-neutral-400">R² SCORE</span>
                          <span className="block text-lg font-display font-bold text-purple-400">0.3971</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <h4 className="font-display font-bold text-lg text-white uppercase">
                        {lang === "id" ? "Visualisasi Hasil Riset" : "Research Visualizations"}
                      </h4>
                      
                      <div className="flex flex-col gap-3 border border-neutral-800 rounded-xl p-4 bg-neutral-950">
                        <span className="font-mono text-xs font-bold text-neutral-400">
                          {lang === "id" ? "1. PENTINGNYA FITUR (FEATURE IMPORTANCE)" : "1. FEATURE IMPORTANCE"}
                        </span>
                        <div className="w-full rounded-lg overflow-hidden border border-neutral-700 bg-white p-2">
                           <img 
                             src="/images/projects/feature_importance.png" 
                             alt="Feature Importance Chart" 
                             className="w-full max-h-[350px] object-contain rounded"
                           />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 border border-neutral-800 rounded-xl p-4 bg-neutral-950">
                        <span className="font-mono text-xs font-bold text-neutral-400">
                          {lang === "id" ? "2. ANALISIS SHAP BEESWARM PLOT (INTERPRETABILITAS MODEL)" : "2. SHAP SUMMARY BEESWARM PLOT (MODEL INTERPRETABILITY)"}
                        </span>
                        <div className="w-full rounded-lg overflow-hidden border border-neutral-700 bg-white p-2">
                           <img 
                             src="/images/projects/shap_summary.png" 
                             alt="SHAP Summary Plot" 
                             className="w-full max-h-[350px] object-contain rounded"
                           />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed text-justify">
                      {lang === "id" ? selectedProject.descriptionID : selectedProject.descriptionEN}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedProject.badges?.map((badge: string, bIndex: number) => (
                        <span 
                          key={bIndex} 
                          className="px-2.5 py-1 rounded text-[10px] font-mono bg-purple-950/40 text-neutral-300 border border-purple-800/30"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-neutral-900/90 backdrop-blur-md border-t border-neutral-800 p-6 flex flex-wrap gap-4 justify-end z-10">
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 font-bold text-xs font-mono bg-neutral-800 px-4 py-2.5 rounded-lg text-neutral-200 border border-neutral-700 hover:text-purple-300 transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
                <a 
                  href={selectedProject.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 bg-purple-600 text-white hover:bg-purple-700 transition-colors font-bold text-xs font-mono px-4 py-2.5 rounded-lg shadow-lg shadow-purple-600/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{lang === "id" ? selectedProject.demoLabelID || "Demo Proyek" : selectedProject.demoLabelEN || "Project Demo"}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
