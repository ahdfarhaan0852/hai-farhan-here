import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { type ProjectItem } from "./ProjectCard3D";

interface Projects3DPanoramaProps {
  lang: "id" | "en";
  mousePos: { x: number; y: number };
  onSelectProject: (project: ProjectItem) => void;
}

const projectsData: ProjectItem[] = [
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
    descriptionID: "Studi komparasi model prediksi klasifikasi untuk mengidentifikasi tingkat risiko mahasiswa dropout menggunakan Random Forest.",
    descriptionEN: "Classification study for identifying student dropout risk using Random Forest and Logistic Regression.",
    category: "data",
    categoryLabel: "Machine Learning",
    dateBadge: "NOV 2025",
    badges: ["Machine Learning", "Random Forest", "Logistic Regression"],
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
  }
];

// Interactive Panorama Rig responding to mouse movement (Left/Right Pan)
const PanoramaRig: React.FC<{
  mousePos: { x: number; y: number };
  lang: "id" | "en";
  onSelectProject: (project: ProjectItem) => void;
}> = ({ mousePos, lang, onSelectProject }) => {
  const { camera } = useThree();
  const panoramaGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // Smooth camera panning left/right and tilt up/down based on mouse position
    const targetCameraY = mousePos.y * 1.5;
    const targetGroupRotY = -mousePos.x * 0.45;
    const targetGroupRotX = mousePos.y * 0.15;

    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraY, delta * 5);
    
    if (panoramaGroupRef.current) {
      panoramaGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        panoramaGroupRef.current.rotation.y,
        targetGroupRotY,
        delta * 5
      );
      panoramaGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        panoramaGroupRef.current.rotation.x,
        targetGroupRotX,
        delta * 5
      );
    }
  });

  // Position project nodes in a curved cylindrical panorama arc (Matching Image 3)
  const radius = 14;

  return (
    <group ref={panoramaGroupRef}>
      {projectsData.map((project, index) => {
        const total = projectsData.length;
        const angle = ((index - (total - 1) / 2) / total) * (Math.PI * 0.75);

        const x = Math.sin(angle) * radius;
        const z = -Math.cos(angle) * radius + 11;
        const y = (index % 2 === 0 ? 1 : -1) * 1.6;

        return (
          <group key={project.id} position={[x, y, z]} rotation={[0, -angle * 0.8, 0]}>
            <Html transform distanceFactor={14} zIndexRange={[100, 0]} className="pointer-events-auto">
              <div
                onClick={() => onSelectProject(project)}
                className="w-[280px] p-5 rounded-xl cursor-pointer bg-neutral-950/90 backdrop-blur-xl border border-white/20 shadow-2xl hover:border-white hover:scale-105 hover:bg-neutral-900 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif italic text-xs text-purple-300 font-semibold border-b border-white/20 pb-0.5">
                    {project.dateBadge}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {project.categoryLabel}
                  </span>
                </div>
                <h4 className="font-display font-extrabold text-base text-white tracking-tight uppercase leading-snug mb-2 line-clamp-1">
                  {project.title}
                </h4>
                <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed mb-3 font-sans">
                  {lang === "id" ? project.descriptionID : project.descriptionEN}
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[11px] font-mono text-purple-400 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <span>{lang === "id" ? "Lihat Detail" : "View Project"}</span>
                    <Sparkles className="w-3 h-3" />
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

export const Projects3DPanorama: React.FC<Projects3DPanoramaProps> = ({
  lang,
  mousePos,
  onSelectProject,
}) => {
  return (
    <div className="w-full h-[75vh] relative">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} />
        <PanoramaRig mousePos={mousePos} lang={lang} onSelectProject={onSelectProject} />
      </Canvas>
      
      {/* Pan helper label bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-neutral-400 bg-neutral-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        <span>{lang === "id" ? "Gerakkan kursor ke kiri & kanan untuk panning panorama 3D › PAN ‹" : "Move cursor left & right to pan 3D panorama › PAN ‹"}</span>
      </div>
    </div>
  );
};
