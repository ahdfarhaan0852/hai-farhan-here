import React from "react";
import { ProjectsCarousel } from "./ProjectsCarousel";

export const ProjectsSection: React.FC = () => {
  return (
    <group position={[0, -2, 0]}>
      <ProjectsCarousel />
    </group>
  );
};

export default ProjectsSection;
