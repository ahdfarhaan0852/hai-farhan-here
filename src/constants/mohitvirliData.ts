import * as THREE from "three";

export interface ProjectData {
  title: string;
  date: string;
  subtext: string;
  url: string;
  category?: string;
  hasCaseStudy?: boolean;
}

export interface WorkTimelinePointData {
  point: THREE.Vector3;
  year: string;
  title: string;
  subtitle: string;
  position: "left" | "right";
}

export const AHMAD_FARHAN_PROJECTS: ProjectData[] = [
  {
    title: "NERVE",
    date: "Feb 2026",
    subtext: "Orchestrating a Multi-Discipline Fitness Ecosystem Using n8n Workflow Automation and Multi-Agent AI System Based on Cross-Discipline Fatigue Modeling.",
    url: "https://github.com/ahdfarhaan0852/nerve-app",
  },
  {
    title: "RSPC RECOMMENDED MENU AI",
    date: "Jan 2026",
    subtext: "Integrated AI-based meal recommendation system for Puri Cinere Hospital connecting RS medical inputs and patients.",
    url: "https://github.com/ahdfarhaan0852/hai-farhan-here",
  },
  {
    title: "ANALISIS BERITA OLAHRAGA",
    date: "Dec 2025",
    subtext: "Research on national sports news sentiment analysis using Python XGBoost Regressor model to predict public health trends.",
    url: "https://colab.research.google.com/drive/1Xiz1-UHPmQMVW2T3fnpvyNSe7G-No0-M?usp=sharing",
    hasCaseStudy: true,
  },
  {
    title: "PREDIKSI DROPOUT MAHASISWA",
    date: "Nov 2025",
    subtext: "Comparative classification study identifying student dropout risk using Random Forest and Logistic Regression algorithms.",
    url: "https://colab.research.google.com/drive/1zbvh-p3AlsI6b8O8IMqiLgKxMaBi69hY?usp=sharing",
  },
  {
    title: "SISTEM KASIR BOBEE COFFEE",
    date: "Oct 2025",
    subtext: "Design and implementation of an integrated Point-of-Sale (POS) system using MySQL to manage financial cycles and inventory.",
    url: "https://github.com/ahdfarhaan0852/bobeecoffe-cashier",
  },
  {
    title: "KLASIFIKASI EMAIL SPAM NLP",
    date: "Sep 2025",
    subtext: "NLP comparative study for spam email detection comparing text classification accuracy between SVM Linear Kernel and Logistic Regression.",
    url: "https://colab.research.google.com/drive/1M1Ep1tuBAAxB3-LQaHZ0RKNOaOj60QAq?usp=sharing",
  },
  {
    title: "REKOMENDASI BUKU HYBRID",
    date: "Aug 2025",
    subtext: "Customized book recommendation system combining Collaborative Filtering and Content-Based Filtering.",
    url: "https://colab.research.google.com/drive/14ZmYBGphUk94Ro2Lds5Y7-yuJpyBbiLa?usp=sharing",
  },
  {
    title: "BAROKAHGROUP-WEB",
    date: "Jul 2025",
    subtext: "Business profile web application for Barokah Group providing integrated shipping booking and customer database.",
    url: "https://barokahgroup-web.vercel.app",
  },
  {
    title: "MINORITY POWERLIFTING LANDING",
    date: "Jun 2025",
    subtext: "Exclusive landing page design for weightlifting Powerlifting community profile featuring athletic visuals.",
    url: "https://mminoritystrength-web.vercel.app",
  },
  {
    title: "TESZTA-WORLD CLOTHING BRAND",
    date: "May 2025",
    subtext: "Interactive e-commerce showcase website for a Bandung-based clothing brand catalog focusing on micro-interactions.",
    url: "https://teszta-world.vercel.app",
  },
  {
    title: "SADBOYPKU SAAS BOOKING",
    date: "Apr 2025",
    subtext: "Real-time SaaS reservation and scheduling platform for users to book playbox arena sessions online.",
    url: "https://sedboypku-web.vercel.app",
  },
  {
    title: "SBH CONSTRUCTION WEB",
    date: "Mar 2025",
    subtext: "Corporate profile website for construction & infrastructure services featuring project showcases.",
    url: "https://sbhconstruction-web.vercel.app",
  },
  {
    title: "SWOLE PLANNER",
    date: "Feb 2025",
    subtext: "Structured fitness productivity and workout planning application to log strength routines and track personal records.",
    url: "https://daily-planner.vercel.app",
  },
  {
    title: "READNMOVE",
    date: "Jan 2025",
    subtext: "Interactive reading and physical activity tracking application designed to encourage active lifestyle.",
    url: "https://github.com/ahdfarhaan0852/hai-farhan-here",
  },
  {
    title: "ALIF-PARCEL CATALOG",
    date: "Dec 2024",
    subtext: "Interactive product catalog for Eid gift parcels/hampers to support local e-retail business branding.",
    url: "https://alifparcel-web.vercel.app",
  },
];

export const AHMAD_FARHAN_WORK_TIMELINE: WorkTimelinePointData[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: "2018 - 2021",
    title: "Pondok Modern Gontor",
    subtitle: "Pendidikan Keagamaan & Ketua Gugus Depan Pramuka Gontor (400+ Anggota)",
    position: "right",
  },
  {
    point: new THREE.Vector3(-4, -3, -3),
    year: "2022 - Sekarang",
    title: "UMRI Teknik Informatika",
    subtitle: "Mahasiswa S1 Teknik Informatika - Data Science, Machine Learning Python & MySQL",
    position: "left",
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: "2023 - 2025",
    title: "Bobee Coffee - Barista & Kasir",
    subtitle: "Operasional Barista, Layanan Pelanggan, & Perancangan Sistem POS Kasir MySQL",
    position: "left",
  },
  {
    point: new THREE.Vector3(0, -1, -9),
    year: "2023 - Sekarang",
    title: "alif-parcel Retail Management",
    subtitle: "Pendiri & Pengelola Operasional Usaha Retail Lokal Parcel & Hampers Lebaran",
    position: "right",
  },
  {
    point: new THREE.Vector3(2, 0, -12),
    year: "2024 - Sekarang",
    title: "Atlet Powerlifting",
    subtitle: "Atlet Angkat Beban Nasional - Menempa Kedisiplinan & Ketahanan Fisik Atletik",
    position: "left",
  },
  {
    point: new THREE.Vector3(1, 1, -15),
    year: "2026",
    title: "Berkarya...",
    subtitle: "Data Science & AI Developer",
    position: "right",
  },
];
