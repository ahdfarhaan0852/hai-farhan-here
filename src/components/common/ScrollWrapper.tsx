import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortalStore } from "../../stores/portalStore";

export const ScrollWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => !!state.activePortalId);

  useEffect(() => {
    if (!isActive) {
      camera.position.set(0, -37, 12);
      camera.rotation.set(-Math.PI / 2, 0, 0);
    }
  }, [isActive, camera]);

  useFrame((state, delta) => {
    if (!isActive) {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, 5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, -37, 5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 12, 5, delta);

      camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -Math.PI / 2, 5, delta);
      camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 90, 0.05);
      camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, 0, 5, delta);
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
