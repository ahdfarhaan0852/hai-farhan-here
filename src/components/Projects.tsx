import React, { useState } from "react";
import { ExternalLink, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectItem {
  title: string;
  descriptionID: string;
  descriptionEN: string;
  category: "data" | "web" | "utility";
  badges: string[];
  github: string;
  demo: string;
  demoLabelID: string;
  demoLabelEN: string;
}

interface ProjectsProps {
  lang: "id" | "en";
}

export const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const [filter, setFilter] = useState<"all" | "data" | "web" | "utility">("all");

  const projectsList: ProjectItem[] = [
    {
      title: "nerve",
      descriptionID: "Orchestrating a Multi-Discipline Fitness Ecosystem Using n8n Workflow Automation and Multi-Agent AI System Based on Cross-Discipline Fatigue Modeling",
      descriptionEN: "Orchestrating a Multi-Discipline Fitness Ecosystem Using n8n Workflow Automation and Multi-Agent AI System Based on Cross-Discipline Fatigue Modeling",
      category: "utility",
      badges: ["Research Paper", "Gym Tracking", "n8n Automation", "Multi-Agent AI", "Fatigue Modeling", "Fitness Tech"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://colab.research.google.com",
      demoLabelID: "Research Notebook",
      demoLabelEN: "Research Notebook"
    },
    {
      title: "RSPC Recommended Menu based AI",
      descriptionID: "Sistem rekomendasi menu makanan berbasis AI terintegrasi untuk Rumah Sakit Puri Cinere. Menghubungkan pihak RS (input diagnosis medis) dan pasien (memilih menu terfilter). Sistem mengotomatisasi penciptaan menu rekomendasi sesuai kebutuhan diet spesifik pasien dan langsung meneruskannya ke vendor pihak ketiga penerima pesanan.",
      descriptionEN: "Integrated AI-based meal recommendation system for Puri Cinere Hospital. Connects the hospital (medical diagnosis input) and patients (choosing filtered meals). Automates recommendation generation based on specific dietary needs and forwards orders directly to third-party vendors.",
      category: "utility",
      badges: ["AI Recommendation", "Healthcare Tech", "Workflow Automation", "n8n/Python", "Integration"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://github.com/ahdfaarhaan",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      title: "ANALISIS BERITA OLAHRAGA (XGBOOST REGRESSOR)",
      descriptionID: "Riset analisis sentimen berita olahraga nasional menggunakan model XGBoost Regressor berbasis Python untuk memprediksi tren kesehatan masyarakat guna mendukung akselerasi infrastruktur olahraga.",
      descriptionEN: "Research on national sports news sentiment analysis using a Python-based XGBoost Regressor model to predict public health trends for supporting sports infrastructure development.",
      category: "data",
      badges: ["Data Science", "Python", "XGBoost Regressor", "Predictive Modeling"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://colab.research.google.com",
      demoLabelID: "Google Colab",
      demoLabelEN: "Google Colab"
    },
    {
      title: "Prediksi Mahasiswa Dropout Klasifikasi",
      descriptionID: "Studi komparasi model prediksi klasifikasi untuk mengidentifikasi tingkat risiko mahasiswa dropout menggunakan algoritma Random Forest dan Logistic Regression guna mendukung sistem retensi akademik kampus.",
      descriptionEN: "A comparative classification study for identifying student dropout risk using Random Forest and Logistic Regression algorithms to support university academic retention systems.",
      category: "data",
      badges: ["Machine Learning", "Random Forest", "Logistic Regression", "Academic Analytics"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://colab.research.google.com",
      demoLabelID: "Google Colab",
      demoLabelEN: "Google Colab"
    },
    {
      title: "Sistem Transaksi Kasir Bobee Coffee",
      descriptionID: "Perancangan dan implementasi sistem Point-of-Sale (POS) terintegrasi menggunakan basis data MySQL untuk mengelola sirkulasi keuangan, inventaris harian, dan validasi transaksi secara akurat.",
      descriptionEN: "Design and implementation of an integrated Point-of-Sale (POS) system using MySQL to manage financial cycles, daily inventory, and accurate transaction validation.",
      category: "utility",
      badges: ["POS System", "MySQL", "Database Management", "Retail Tech"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://github.com/ahdfaarhaan",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      title: "barokahgroup-web",
      descriptionID: "Aplikasi profil operasional web untuk manajemen Barokah Group, menyediakan sistem pemesanan terpadu kurir jastip dan integrasi basis data pelanggan.",
      descriptionEN: "A business profile web application for Barokah Group, providing an integrated shipping booking system and customer database integration.",
      category: "web",
      badges: ["Web Development", "Frontend", "Database"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://github.com/ahdfaarhaan",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      title: "minority website (Powerlifting Landing)",
      descriptionID: "Desain dan implementasi landing page eksklusif untuk profil komunitas atlet angkat beban (Powerlifting), menonjolkan visual atletik yang agresif dan responsif.",
      descriptionEN: "Design and implementation of an exclusive landing page for a weightlifting (Powerlifting) community profile, featuring aggressive, responsive athletic visuals.",
      category: "web",
      badges: ["Tailwind CSS", "Community Platform", "UI/UX Design"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://github.com/ahdfaarhaan",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      title: "teszta-world-web (Clothing Brand)",
      descriptionID: "Website e-commerce showcase portofolio interaktif untuk katalog brand clothing lokal asal Bandung dengan penekanan pada micro-interactions dan tata letak kreatif.",
      descriptionEN: "An interactive e-commerce showcase website for a Bandung-based clothing brand catalog, focusing on micro-interactions and creative layout.",
      category: "web",
      badges: ["E-Commerce Showcase", "Frontend Dev", "Creative Design"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://github.com/ahdfaarhaan",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      title: "Sistem Rekomendasi Buku Hybrid",
      descriptionID: "Sistem pencarian dan rekomendasi buku yang dikustomisasi dengan menggabungkan Collaborative Filtering dan Content-Based Filtering untuk memprediksi kecenderungan selera membaca pengguna.",
      descriptionEN: "A customized book recommendation and search system combining Collaborative Filtering and Content-Based Filtering to predict reader preferences.",
      category: "data",
      badges: ["Recommendation System", "Hybrid Models", "Python", "Data Science"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://colab.research.google.com",
      demoLabelID: "Google Colab",
      demoLabelEN: "Google Colab"
    },
    {
      title: "swole-planner",
      descriptionID: "Aplikasi produktivitas dan penjadwalan latihan fisik/gym terstruktur untuk mencatat rutinitas angkatan beban serta mencatat perkembangan rekor personal (PR).",
      descriptionEN: "A structured fitness productivity and workout planning application to log strength routines and track personal records (PR).",
      category: "utility",
      badges: ["Productivity App", "Task Management", "CRUD System"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://github.com/ahdfaarhaan",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    },
    {
      title: "Klasifikasi Email Spam NLP",
      descriptionID: "Studi komparasi NLP untuk mendeteksi email spam dengan membandingkan tingkat presisi akurasi pengenalan teks antara model SVM (Linear Kernel) dengan Logistic Regression.",
      descriptionEN: "A comparative NLP study for spam email detection, comparing text classification accuracy between an SVM (Linear Kernel) and Logistic Regression model.",
      category: "data",
      badges: ["NLP", "Text Classification", "SVM", "Data Science"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://colab.research.google.com",
      demoLabelID: "Google Colab",
      demoLabelEN: "Google Colab"
    },
    {
      title: "halaman portofolio alif-parcel",
      descriptionID: "Etalase katalog parcel/hampers lebaran interaktif dengan pendekatan visual modern untuk mendukung kebutuhan branding bisnis e-retail lokal.",
      descriptionEN: "An interactive product catalog for Eid gift parcels/hampers with a modern visual approach to support branding for local e-retail businesses.",
      category: "web",
      badges: ["Web Catalog", "Branding", "Frontend Showcase"],
      github: "https://github.com/ahdfaarhaan",
      demo: "https://github.com/ahdfaarhaan",
      demoLabelID: "Demo Proyek",
      demoLabelEN: "Project Demo"
    }
  ];

  const filteredProjects = filter === "all" 
    ? projectsList 
    : projectsList.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 border-t border-brand-rose-dust/30 dark:border-brand-plum-muted/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Left Column: Heading & Filter */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 z-20">
          <span className="font-mono text-xs tracking-widest text-brand-lavender-soft dark:text-brand-lavender-bright uppercase mb-4 block">
            {lang === "id" ? "// hasil karya / portofolio" : "// works / portfolio"}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-neutral-900 dark:text-neutral-50 mb-8">
            {lang === "id" ? <>Katalog <br /> Proyek.</> : <>Project <br /> Catalog.</>}
          </h2>
          <div className="w-12 h-[1px] bg-brand-rose-dust dark:bg-brand-plum-muted mb-8" />
          
          {/* Filters List */}
          <div className="flex flex-col gap-3 font-mono text-sm max-w-[220px]">
            <button
              onClick={() => setFilter("all")}
              className={`text-left pb-1 transition-all duration-300 border-b cursor-pointer ${
                filter === "all" 
                  ? "border-brand-lavender-soft text-brand-lavender-soft dark:border-brand-lavender-bright dark:text-brand-lavender-bright font-bold" 
                  : "border-transparent text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              ALL PROJECTS ({projectsList.length})
            </button>
            <button
              onClick={() => setFilter("data")}
              className={`text-left pb-1 transition-all duration-300 border-b cursor-pointer ${
                filter === "data" 
                  ? "border-brand-lavender-soft text-brand-lavender-soft dark:border-brand-lavender-bright dark:text-brand-lavender-bright font-bold" 
                  : "border-transparent text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              DATA SCIENCE &amp; ML
            </button>
            <button
              onClick={() => setFilter("web")}
              className={`text-left pb-1 transition-all duration-300 border-b cursor-pointer ${
                filter === "web" 
                  ? "border-brand-lavender-soft text-brand-lavender-soft dark:border-brand-lavender-bright dark:text-brand-lavender-bright font-bold" 
                  : "border-transparent text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              WEB DEV &amp; BRANDING
            </button>
            <button
              onClick={() => setFilter("utility")}
              className={`text-left pb-1 transition-all duration-300 border-b cursor-pointer ${
                filter === "utility" 
                  ? "border-brand-lavender-soft text-brand-lavender-soft dark:border-brand-lavender-bright dark:text-brand-lavender-bright font-bold" 
                  : "border-transparent text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              PRODUCTIVITY &amp; POS
            </button>
          </div>
        </div>

        {/* Right Column: Wide Editorial List Layout (No Slideshow, High Precision) */}
        <div className="lg:col-span-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-10 w-full"
            >
              {filteredProjects.map((project, index) => {
                // Formatted index number, e.g., 01, 02
                const projectIndex = String(index + 1).padStart(2, "0");
                const categoryLabel = 
                  project.category === "data" 
                    ? "Data Science & ML" 
                    : project.category === "web" 
                      ? "Web Dev & Branding" 
                      : "Productivity & POS";

                return (
                  <div 
                    key={project.title}
                    className="border-t border-brand-rose-dust/30 dark:border-brand-plum-muted/20 pt-6 flex flex-col gap-4 text-left group"
                  >
                    {/* Index & Category Label */}
                    <div className="flex justify-between items-center font-mono text-xs text-neutral-400">
                      <span className="text-brand-lavender-soft dark:text-brand-lavender-bright font-bold">
                        #{projectIndex}
                      </span>
                      <span>{categoryLabel}</span>
                    </div>

                    {/* Project Title (Wide & Bold) */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 dark:text-neutral-50 uppercase tracking-tight leading-tight transition-colors group-hover:text-brand-lavender-soft dark:group-hover:text-brand-lavender-bright">
                      {project.title}
                    </h3>

                    {/* Badges List */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.badges.map((badge, bIndex) => (
                        <span 
                          key={bIndex} 
                          className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-brand-rose-soft/30 dark:bg-brand-plum-charcoal/30 text-neutral-600 dark:text-neutral-300 border border-brand-rose-dust/20 dark:border-brand-plum-muted/10"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                      {lang === "id" ? project.descriptionID : project.descriptionEN}
                    </p>

                    {/* CTA Links */}
                    <div className="flex gap-6 font-mono text-xs pt-2">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors font-bold"
                      >
                        <Code2 className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1.5 hover:text-brand-lavender-soft dark:hover:text-brand-lavender-bright transition-colors font-bold"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>{lang === "id" ? project.demoLabelID : project.demoLabelEN}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
