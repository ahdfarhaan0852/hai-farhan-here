import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { usePortalStore } from "../../stores/portalStore";
import { GridTile } from "./GridTile";
import { ProjectsSection } from "./projects";
import { WorkSection } from "./work";

export const ExperienceScene: React.FC = () => {
  const titleRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();
  const isActive = usePortalStore((state) => !!state.activePortalId);

  const fontProps = {
    font: "./soria-font.ttf",
    fontSize: 0.4,
    color: "white",
  };

  useFrame((_, delta) => {
    if (!data) return;
    const d = data.range(0.8, 0.2);
    const e = data.range(0.7, 0.2);

    if (groupRef.current && !isActive) {
      groupRef.current.position.y = d > 0 ? -1 : -30;
      groupRef.current.visible = d > 0;
    }

    if (titleRef.current) {
      titleRef.current.children.forEach((text, i) => {
        const y = Math.max(Math.min((1 - d) * (10 - i), 10), 0.5);
        text.position.y = THREE.MathUtils.damp(text.position.y, y, 7, delta);
        (text as any).fillOpacity = e;
      });
    }
  });

  const getTitle = () => {
    const title = "EXPERIENCE";
    return title.split("").map((char, i) => {
      const diff = 0.8;
      return (
        <Text key={i} {...fontProps} position={[i * diff, 2, 1]}>
          {char}
        </Text>
      );
    });
  };

  return (
    <group position={[0, -41.5, 12]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
      <group rotation={[0, 0, Math.PI / 2]}>
        <group ref={titleRef} position={[-3.6, 2, -2]}>
          {getTitle()}
        </group>

        <group position={[0, -1, 0]} ref={groupRef}>
          <GridTile
            title="WORK AND EDUCATION"
            id="work"
            color="#08080a"
            textAlign="left"
            position={new THREE.Vector3(-2, 0, 0)}
          >
            <WorkSection />
          </GridTile>
          <GridTile
            title="SIDE PROJECTS"
            id="projects"
            color="#08080a"
            textAlign="right"
            position={new THREE.Vector3(2, 0, 0)}
          >
            <ProjectsSection />
          </GridTile>
        </group>
      </group>
    </group>
  );
};

export default ExperienceScene;
