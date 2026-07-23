import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortalStore } from "../../stores/portalStore";

export const ScrollWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => !!state.activePortalId);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("experience");
      if (el) {
        const rect = el.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable > 0) {
          const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
          scrollProgressRef.current = progress;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    const progress = scrollProgressRef.current;

    if (!isActive) {
      const targetY = -37 + (progress * 2);
      const targetZ = 12 + (progress * 1.5);

      camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, 5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 5, delta);

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
