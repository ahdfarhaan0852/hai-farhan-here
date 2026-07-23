import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { GraduationCap, Trophy, Store, Award } from "lucide-react";

interface Timeline3DViewProps {
  lang: "id" | "en";
  mousePos: { x: number; y: number };
}

interface HistoryNode {
  year: string;
  titleID: string;
  titleEN: string;
  subID: string;
  subEN: string;
  icon: any;
  pos: [number, number, number];
}

const historyData: HistoryNode[] = [
  {
    year: "2018 - 2021",
    titleID: "KMI Pondok Modern Darussalam Gontor",
    titleEN: "Pondok Modern Gontor Boarding School",
    subID: "Pendidikan Menengah Keagamaan & Kepemimpinan. Ketua Gugus Depan Pramuka Gontor memimpin 400+ anggota.",
    subEN: "Religious & Leadership Education. Gontor Scouting Front Leader managing 400+ members.",
    icon: GraduationCap,
    pos: [-8, 2, -6],
  },
  {
    year: "2022 - SEKARANG",
    titleID: "Universitas Muhammadiyah Riau (UMRI)",
    titleEN: "Universitas Muhammadiyah Riau (UMRI)",
    subID: "Mahasiswa S1 Teknik Informatika. Fokus pada Data Science, Machine Learning Python, & Database MySQL.",
    subEN: "Informatics Engineering Student. Specializing in Data Science, Machine Learning Python & MySQL Databases.",
    icon: Award,
    pos: [-3, -1, -3],
  },
  {
    year: "2023 - SEKARANG",
    titleID: "Manajemen Retail alif-parcel",
    titleEN: "alif-parcel Retail Management",
    subID: "Pendiri & pengelola operasional usaha retail lokal alif-parcel, mengelola inventaris & layanan pelanggan.",
    subEN: "Founder & operational manager of local retail business alif-parcel, managing inventory & customer service.",
    icon: Store,
    pos: [2, 1.5, 0],
  },
  {
    year: "2024 - SEKARANG",
    titleID: "Atlet Atletik Olahraga Powerlifting",
    titleEN: "Competitive Powerlifting Athlete",
    subID: "Atlet angkat beban Powerlifting nasional, menempa kedisiplinan tinggi, konsistensi, & ketahanan fisik.",
    subEN: "National Powerlifting athlete, forging high discipline, consistency, & physical resilience.",
    icon: Trophy,
    pos: [7, -1.5, 3],
  },
];

const TimelineRig: React.FC<{
  mousePos: { x: number; y: number };
  lang: "id" | "en";
}> = ({ mousePos, lang }) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // Smooth camera pan based on mouse cursor
    const targetX = mousePos.x * 3;
    const targetY = mousePos.y * 1.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 4);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 4);

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        -mousePos.x * 0.25,
        delta * 4
      );
    }
  });

  return (
    <group ref={groupRef}>
      {historyData.map((node, index) => {
        const IconComponent = node.icon;

        return (
          <group key={index} position={node.pos}>
            <Html transform distanceFactor={14} zIndexRange={[100, 0]} className="pointer-events-auto">
              <div className="w-[300px] p-6 rounded-2xl bg-neutral-950/90 backdrop-blur-xl border border-white/20 shadow-2xl hover:border-white hover:scale-105 transition-all text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif italic text-xs tracking-widest text-purple-300 font-bold border-b border-white/20 pb-0.5">
                    {node.year}
                  </span>
                  <div className="p-2 rounded-lg bg-white/10 text-purple-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-extrabold text-lg text-white tracking-tight uppercase leading-snug mb-2">
                  {lang === "id" ? node.titleID : node.titleEN}
                </h3>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {lang === "id" ? node.subID : node.subEN}
                </p>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

export const Timeline3DView: React.FC<Timeline3DViewProps> = ({ lang, mousePos }) => {
  return (
    <div className="w-full h-[75vh] relative">
      <Canvas camera={{ position: [0, 0, 13], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} />
        <TimelineRig mousePos={mousePos} lang={lang} />
      </Canvas>

      {/* Pan helper label bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-neutral-400 bg-neutral-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        <span>{lang === "id" ? "Gerakkan kursor untuk menelusuri timeline 3D riwayat hidup ›" : "Move cursor to explore 3D journey timeline ›"}</span>
      </div>
    </div>
  );
};
