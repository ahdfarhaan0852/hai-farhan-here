import { Text } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import { GridTile } from "./GridTile";
import { ProjectsSection } from "./projects";
import { WorkSection } from "./work";

export const ExperienceScene: React.FC = () => {
  const titleRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  const fontProps = {
    font: "./soria-font.ttf",
    fontSize: 0.45,
    color: "white",
    fillOpacity: 1,
  };

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
