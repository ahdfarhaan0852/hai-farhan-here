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
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollProgressRef.current = Math.min(1, Math.max(0, window.scrollY / totalScroll));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    const progress = scrollProgressRef.current;

    // Smooth range calculations mapped to native window scroll progress
    const a = Math.max(0, Math.min(1, progress / 0.3));
    const b = Math.max(0, Math.min(1, (progress - 0.3) / 0.3));
    const d = Math.max(0, Math.min(1, (progress - 0.6) / 0.4));

    if (!isActive) {
      camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -0.5 * Math.PI * a, 5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, -37 * b, 7, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 5 + 10 * d, 7, delta);

      camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 90, 0.05);
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
