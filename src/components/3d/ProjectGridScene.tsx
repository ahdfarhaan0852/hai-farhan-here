import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { ProjectCard3D, type ProjectItem } from "./ProjectCard3D";

gsap.registerPlugin(ScrollTrigger);

interface ProjectGridSceneProps {
  projects: ProjectItem[];
  lang: "id" | "en";
  onSelectProject: (project: ProjectItem) => void;
}

const CameraRig: React.FC<{
  projects: ProjectItem[];
  lang: "id" | "en";
  onSelectProject: (project: ProjectItem) => void;
}> = ({ projects, lang, onSelectProject }) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    // Set initial slanted camera perspective position
    camera.position.set(0, 2, 14);
    camera.lookAt(0, 0, 0);

    const trigger = ScrollTrigger.create({
      trigger: "#projects-3d-section",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [camera]);

  // Frame loop with lerp for butter-smooth camera movement
  useFrame((_state, delta) => {
    const progress = scrollProgressRef.current;

    // Target position along 3D slanted perspective fly-through path
    const targetX = Math.sin(progress * Math.PI * 0.7) * 3;
    const targetY = 2 - progress * 18;
    const targetZ = 14 - progress * 24;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 6);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 6);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 6);

    if (groupRef.current) {
      const targetRotX = 0.22 - progress * 0.12;
      const targetRotY = -0.32 + progress * 0.18;
      const targetRotZ = 0.08 - progress * 0.04;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        delta * 6
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        delta * 6
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetRotZ,
        delta * 6
      );
    }
  });

  // 3D Matrix Grid Spacing Coordinates
  const columns = 3;
  const spacingX = 6.8;
  const spacingY = 5.2;
  const spacingZ = 3.6;

  return (
    <group ref={groupRef} rotation={[0.22, -0.32, 0.08]}>
      {projects.map((project, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);

        const x = (col - (columns - 1) / 2) * spacingX;
        const y = -row * spacingY;
        const z = -row * spacingZ + col * 0.8;

        return (
          <ProjectCard3D
            key={project.id || index}
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

export const ProjectGridScene: React.FC<ProjectGridSceneProps> = ({
  projects,
  lang,
  onSelectProject,
}) => {
  return (
    <Canvas
      camera={{ position: [0, 2, 14], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 15, 10]} intensity={1.2} />
      <CameraRig
        projects={projects}
        lang={lang}
        onSelectProject={onSelectProject}
      />
    </Canvas>
  );
};
