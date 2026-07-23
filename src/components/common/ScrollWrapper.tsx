import React from "react";
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortalStore } from "../../stores/portalStore";

export const ScrollWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { camera } = useThree();
  const data = useScroll();
  const isActive = usePortalStore((state) => !!state.activePortalId);

  useFrame((state, delta) => {
    if (data) {
      const a = data.range(0, 0.3);
      const b = data.range(0.3, 0.5);
      const d = data.range(0.85, 0.18);

      if (!isActive) {
        camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -0.5 * Math.PI * a, 5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, -37 * b, 7, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 5 + 10 * d, 7, delta);
      }

      if (!isActive) {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 90, 0.05);
      }
    }
  });

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <>
      {childrenArray.map((child, index) => (
        <group key={index}>{child}</group>
      ))}
    </>
  );
};
