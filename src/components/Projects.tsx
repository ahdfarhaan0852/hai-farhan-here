import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Code2, X, BarChart3, Info, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

interface ProjectsProps {
  lang: "id" | "en";
}

export const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filter, setFilter] = useState<"all" | "data" | "web" | "utility">("all");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const projectsList: ProjectItem[] = [
    {
      id: "01",
      title: "NERVE",
      descriptionID: "Orchestrating a Multi-Discipline Fitness Ecosystem Using n8n Workflow Automation and Multi-Agent AI System Based on Cross-Discipline Fatigue Modeling",
      descriptionEN: "Orchestrating a Multi-Discipline Fitness Ecosystem Using n8n Workflow Automation and Multi-Agent AI System Based on Cross-Discipline Fatigue Modeling",
      category: "utility",
      categoryLabel: "Multi-Agent AI",
      dateBadge: "FEB 2026",
      badges: ["Research Paper", "Gym Tracking", "n8n Automation", "Multi-Agent AI"],
      github: "https://github.com/ahdfarhaan0852/nerve-app",
      demo: "https://colab.research.google.com",
      demoLabelID: "Research Notebook",
      demoLabelEN: "Research Notebook"
    },
    {
      id: "02",
      title: "RSPC RECOMMENDED MENU BASED AI",
      descriptionID: "Sistem rekomendasi menu makanan berbasis AI terintegrasi untuk Rumah Sakit Puri Cinere. Menghubungkan pihak RS dan pasien.",
      descriptionEN: "Integrated AI-based meal recommendation system for Puri Cinere Hospital. Connects hospital and patients.",
      category: "utility",
      categoryLabel: "AI Recommendation",
      dateBadge: "JAN 2026",
      badges: ["AI Recommendation", "Healthcare Tech", "n8n/Python"],
      github: "https://github.com/ahdfarhaan0852/hai-farhan-here",
      demo: "https://github.com/ahdfarhaan0852/hai-farhan-here",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      id: "03",
      title: "ANALISIS BERITA OLAHRAGA (XGBOOST REGRESSOR)",
      descriptionID: "Riset analisis sentimen berita olahraga nasional menggunakan model XGBoost Regressor berbasis Python untuk memprediksi tren kesehatan masyarakat.",
      descriptionEN: "Research on national sports news sentiment analysis using XGBoost Regressor model to predict public health trends.",
      category: "data",
      categoryLabel: "Data Science & ML",
      dateBadge: "DEC 2025",
      badges: ["Data Science", "Python", "XGBoost Regressor", "SHAP"],
      github: "https://github.com/ahdfarhaan0852/hai-farhan-here",
      demo: "https://colab.research.google.com/drive/1Xiz1-UHPmQMVW2T3fnpvyNSe7G-No0-M?usp=sharing",
      demoLabelID: "Google Colab",
      demoLabelEN: "Google Colab",
      hasCaseStudy: true
    },
    {
      id: "04",
      title: "PREDIKSI MAHASISWA DROPOUT KLASIFIKASI",
      descriptionID: "Studi komparasi model prediksi klasifikasi untuk mengidentifikasi tingkat risiko mahasiswa dropout menggunakan Random Forest dan Logistic Regression.",
      descriptionEN: "Classification study for identifying student dropout risk using Random Forest and Logistic Regression.",
      category: "data",
      categoryLabel: "Machine Learning",
      dateBadge: "NOV 2025",
      badges: ["Machine Learning", "Random Forest", "Academic Analytics"],
      github: "https://github.com/ahdfarhaan0852/hai-farhan-here",
      demo: "https://colab.research.google.com/drive/1zbvh-p3AlsI6b8O8IMqiLgKxMaBi69hY?usp=sharing",
      demoLabelID: "Google Colab",
      demoLabelEN: "Google Colab"
    },
    {
      id: "05",
      title: "SISTEM TRANSAKSI KASIR BOBEE COFFEE",
      descriptionID: "Perancangan dan implementasi sistem Point-of-Sale (POS) terintegrasi menggunakan basis data MySQL.",
      descriptionEN: "Design and implementation of an integrated Point-of-Sale (POS) system using MySQL.",
      category: "utility",
      categoryLabel: "POS & Database",
      dateBadge: "OCT 2025",
      badges: ["POS System", "MySQL", "Retail Tech"],
      github: "https://github.com/ahdfarhaan0852/bobeecoffe-cashier",
      demo: "https://github.com/ahdfarhaan0852/bobeecoffe-cashier",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      id: "06",
      title: "KLASIFIKASI EMAIL SPAM NLP",
      descriptionID: "Studi komparasi NLP untuk mendeteksi email spam dengan membandingkan tingkat presisi akurasi pengenalan teks antara model SVM dengan Logistic Regression.",
      descriptionEN: "NLP study for spam email detection, comparing text classification accuracy between SVM and Logistic Regression.",
      category: "data",
      categoryLabel: "NLP & Text Mining",
      dateBadge: "SEP 2025",
      badges: ["NLP", "Text Classification", "SVM"],
      github: "https://github.com/ahdfarhaan0852/hai-farhan-here",
      demo: "https://colab.research.google.com/drive/1M1Ep1tuBAAxB3-LQaHZ0RKNOaOj60QAq?usp=sharing",
      demoLabelID: "Google Colab",
      demoLabelEN: "Google Colab"
    },
    {
      id: "07",
      title: "SISTEM REKOMENDASI BUKU HYBRID",
      descriptionID: "Sistem pencarian dan rekomendasi buku yang dikustomisasi dengan menggabungkan Collaborative Filtering dan Content-Based Filtering.",
      descriptionEN: "Customized book recommendation system combining Collaborative Filtering and Content-Based Filtering.",
      category: "data",
      categoryLabel: "Hybrid Recommender",
      dateBadge: "AUG 2025",
      badges: ["Recommendation System", "Hybrid Models"],
      github: "https://github.com/ahdfarhaan0852/hai-farhan-here",
      demo: "https://colab.research.google.com/drive/14ZmYBGphUk94Ro2Lds5Y7-yuJpyBbiLa?usp=sharing",
      demoLabelID: "Google Colab",
      demoLabelEN: "Google Colab"
    },
    {
      id: "08",
      title: "BAROKAHGROUP-WEB",
      descriptionID: "Aplikasi profil operasional web untuk manajemen Barokah Group, menyediakan sistem pemesanan terpadu kurir jastip.",
      descriptionEN: "Business profile web application for Barokah Group providing integrated shipping booking.",
      category: "web",
      categoryLabel: "Web Dev & DB",
      dateBadge: "JUL 2025",
      badges: ["Web Development", "Frontend"],
      github: "https://github.com/ahdfarhaan0852/barokahgroup-web",
      demo: "https://barokahgroup-web.vercel.app",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      id: "09",
      title: "MINORITY WEBSITE (POWERLIFTING LANDING)",
      descriptionID: "Desain dan implementasi landing page eksklusif untuk profil komunitas atlet angkat beban (Powerlifting).",
      descriptionEN: "Exclusive landing page design for a Powerlifting weightlifting community profile.",
      category: "web",
      categoryLabel: "Community Landing",
      dateBadge: "JUN 2025",
      badges: ["Tailwind CSS", "UI/UX Design"],
      github: "https://github.com/ahdfarhaan0852/mminoritystrength-web",
      demo: "https://mminoritystrength-web.vercel.app",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      id: "10",
      title: "TESZTA-WORLD-WEB (CLOTHING BRAND)",
      descriptionID: "Website e-commerce showcase portofolio interaktif untuk katalog brand clothing lokal asal Bandung.",
      descriptionEN: "Interactive e-commerce showcase website for a Bandung clothing brand catalog.",
      category: "web",
      categoryLabel: "E-Commerce Showcase",
      dateBadge: "MAY 2025",
      badges: ["E-Commerce Showcase", "Frontend Dev"],
      github: "https://github.com/ahdfarhaan0852/teszta-world",
      demo: "https://teszta-world.vercel.app",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      id: "11",
      title: "SADBOYPKU-WEB (SAAS PLAYBOX BOOKING)",
      descriptionID: "Platform SaaS sistem manajemen penjadwalan dan reservasi booking arena playbox secara real-time.",
      descriptionEN: "Real-time SaaS reservation and scheduling platform for playbox arena bookings.",
      category: "web",
      categoryLabel: "SaaS Booking Platform",
      dateBadge: "APR 2025",
      badges: ["SaaS Platform", "Booking System"],
      github: "https://github.com/ahdfarhaan0852/sedboypku-web",
      demo: "https://sedboypku-web.vercel.app",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      id: "12",
      title: "SBH-CONSTRUCTION",
      descriptionID: "Website profil perusahaan jasa konstruksi & pembangunan infrastruktur dengan etalase proyek.",
      descriptionEN: "Corporate profile website for construction & infrastructure services.",
      category: "web",
      categoryLabel: "Corporate Web",
      dateBadge: "MAR 2025",
      badges: ["Corporate Web", "Construction Showcase"],
      github: "https://github.com/ahdfarhaan0852/sbhconstruction-web",
      demo: "https://sbhconstruction-web.vercel.app",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      id: "13",
      title: "SWOLE-PLANNER",
      descriptionID: "Aplikasi produktivitas dan penjadwalan latihan fisik/gym terstruktur untuk mencatat rutinitas angkatan beban.",
      descriptionEN: "Structured fitness productivity and workout planning application.",
      category: "utility",
      categoryLabel: "Fitness Productivity",
      dateBadge: "FEB 2025",
      badges: ["Productivity App", "Task Management"],
      github: "https://github.com/ahdfarhaan0852/daily-planner",
      demo: "https://daily-planner.vercel.app",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      id: "14",
      title: "READNMOVE",
      descriptionID: "Aplikasi produktivitas dan pelacakan membaca & aktivitas fisik interaktif.",
      descriptionEN: "Interactive reading and physical activity tracking application.",
      category: "utility",
      categoryLabel: "Productivity App",
      dateBadge: "JAN 2025",
      badges: ["Productivity App", "Reading Tracker"],
      github: "https://github.com/ahdfarhaan0852/hai-farhan-here",
      demo: "https://github.com/ahdfarhaan0852/hai-farhan-here",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      id: "15",
      title: "HALAMAN PORTOFOLIO ALIF-PARCEL",
      descriptionID: "Etalase katalog parcel/hampers lebaran interaktif dengan pendekatan visual modern.",
      descriptionEN: "Interactive product catalog for Eid gift parcels/hampers.",
      category: "web",
      categoryLabel: "Retail Catalog",
      dateBadge: "DEC 2024",
      badges: ["Web Catalog", "Branding"],
      github: "https://github.com/ahdfarhaan0852/alifparcel-web",
      demo: "https://alifparcel-web.vercel.app",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    }
  ];

  const filteredProjects = projectsList.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  // Track mouse movement for 3D cursor motion
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

  // GSAP ScrollTrigger 3D Fly-Through
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(grid, {
          translateY: -progress * 400,
          translateZ: progress * 100,
          duration: 0.4,
          ease: "power1.out",
          overwrite: "auto"
        });
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full min-h-[280vh] bg-[#08080a] text-white overflow-hidden"
    >
      {/* Sticky Fullscreen 3D Viewport Controls */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16 pointer-events-none z-30">
        
        {/* Header Title & Filter Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pointer-events-auto pt-16 sm:pt-4 z-20">
          <div className="text-left bg-neutral-950/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl">
            <span className="font-mono text-xs tracking-widest text-purple-400 uppercase mb-1 block">
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
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {lang === "id" ? tab.labelID : tab.labelEN}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Slanted Perspective Grid Driven by Mouse Cursor Motion & Scroll */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10 [perspective:1200px] overflow-hidden pt-28 pb-16">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full max-w-7xl px-6 [transform-style:preserve-3d] transition-all duration-300 ease-out origin-center"
            style={{
              transform: `rotateX(${16 + mousePos.y * -10}deg) rotateY(${-14 + mousePos.x * 10}deg) rotateZ(${3 + mousePos.x * 2}deg) translateX(${mousePos.x * 20}px) translateY(${mousePos.y * -20}px)`
            }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProject(project)}
                className="group relative p-5 rounded-xl cursor-pointer bg-neutral-950/90 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-purple-500/80 hover:bg-neutral-900/95 transition-all duration-300 transform-gpu hover:-translate-y-2 hover:scale-[1.03] text-left flex flex-col justify-between min-h-[230px]"
              >
                <div>
                  {/* Top Month/Year Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif italic text-xs tracking-widest text-purple-300 font-semibold border-b border-white/20 pb-0.5">
                      {project.dateBadge}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-white tracking-tight uppercase leading-snug mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-neutral-400 font-sans line-clamp-2 leading-relaxed mb-3">
                    {lang === "id" ? project.descriptionID : project.descriptionEN}
                  </p>
                </div>

                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.badges.slice(0, 3).map((badge, bIndex) => (
                      <span
                        key={bIndex}
                        className="text-[9px] font-mono text-neutral-400 bg-neutral-900 border border-white/10 px-2 py-0.5 rounded"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-xs font-mono text-neutral-300">
                    <span className="text-purple-400 font-semibold group-hover:underline inline-flex items-center gap-1">
                      <span>{lang === "id" ? "Lihat Detail" : "View Case Study"}</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-neutral-500 text-[9px] uppercase tracking-wider flex items-center gap-0.5">
                      <span>Click</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll & Cursor Helper Indicator */}
        <div className="flex justify-between items-end w-full pointer-events-none z-20">
          <div className="font-mono text-xs text-neutral-300 flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>
              {lang === "id"
                ? "Gerakkan kursor & scroll untuk navigasi grid proyek 3D ✦"
                : "Move cursor & scroll to explore 3D project grid ✦"}
            </span>
          </div>

          <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest hidden sm:block bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            Showing {filteredProjects.length} Projects
          </div>
        </div>

      </div>

      {/* Project Detail Modal Drawer */}
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
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 p-6 flex items-center justify-between z-10">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase block mb-1">
                    {selectedProject.dateBadge} • {selectedProject.categoryLabel}
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

              {/* Modal Content Scrollable Area */}
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
                        {selectedProject.badges.map((badge, bIndex) => (
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

                {/* Modal Footer Links */}
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
                    <span>{lang === "id" ? selectedProject.demoLabelID : selectedProject.demoLabelEN}</span>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

    </section>
  );
};
