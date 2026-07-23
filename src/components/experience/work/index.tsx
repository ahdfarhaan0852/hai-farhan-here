import React from "react";
import { Timeline } from "./Timeline";

export const WorkSection: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      <Timeline progress={1} />
    </group>
  );
};

export default WorkSection;
