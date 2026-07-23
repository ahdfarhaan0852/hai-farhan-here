import { Edges, MeshPortalMaterial, Text, type TextProps } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import React, { useRef } from "react";
import * as THREE from "three";
import { usePortalStore } from "../../stores/portalStore";

interface GridTileProps {
  id: string;
  title: string;
  textAlign: TextProps["textAlign"];
  children: React.ReactNode;
  color: string;
  position: THREE.Vector3;
}

export const GridTile: React.FC<GridTileProps> = ({
  id,
  title,
  textAlign,
  children,
  color,
  position,
}) => {
  const titleRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Group>(null);
  const hoverBoxRef = useRef<THREE.Mesh>(null);
  const portalRef = useRef<any>(null);
  const { camera } = useThree();
  const setActivePortal = usePortalStore((state) => state.setActivePortal);
  const isActive = usePortalStore((state) => state.activePortalId === id);
  const activePortalId = usePortalStore((state) => state.activePortalId);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      exitPortal(true);
    }
  };

  const portalInto = (e: React.MouseEvent) => {
    if (isActive || activePortalId) return;
    e.stopPropagation();
    setActivePortal(id);
    document.body.style.cursor = "auto";
    const div = document.createElement("div");

    div.className = "fixed close";
    div.style.transform = "rotateX(90deg)";
    div.onclick = () => exitPortal(true);

    if (!document.querySelector(".close")) {
      document.body.appendChild(div);

      gsap.fromTo(
        div,
        {
          scale: 0,
          rotate: "-180deg",
        },
        {
          opacity: 1,
          zIndex: 10,
          transform: "rotateX(0deg)",
          scale: 1,
          duration: 1,
        }
      );
    }
    document.body.addEventListener("keydown", handleEscape);
    gsap.to(portalRef.current, {
      blend: 1,
      duration: 0.5,
    });
  };

  const exitPortal = (force = false) => {
    if (!force && !activePortalId) return;
    setActivePortal(null);

    gsap.to(camera.position, {
      x: 0,
      duration: 1,
    });

    gsap.to(camera.rotation, {
      x: -Math.PI / 2,
      y: 0,
      duration: 1,
    });

    gsap.to(portalRef.current, {
      blend: 0,
      duration: 1,
    });

    gsap.to(document.querySelector(".close"), {
      scale: 0,
      duration: 0.5,
      onComplete: () => {
        document.querySelectorAll(".close").forEach((el) => {
          el.remove();
        });
      },
    });
    document.body.removeEventListener("keydown", handleEscape);
  };

  const fontProps: Partial<TextProps> = {
    font: "./soria-font.ttf",
    maxWidth: 2,
    anchorX: "center",
    anchorY: "bottom",
    fontSize: 0.7,
    color: "white",
    textAlign: textAlign,
    fillOpacity: 1,
  };

  const onPointerOver = () => {
    if (isActive) return;
    document.body.style.cursor = "pointer";
    gsap.to(titleRef.current, {
      fillOpacity: 1,
    });
    if (gridRef.current && hoverBoxRef.current) {
      gsap.to(gridRef.current.position, { z: 0.5, duration: 0.4 });
      gsap.to(hoverBoxRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.4 });
    }
  };

  const onPointerOut = () => {
    document.body.style.cursor = "auto";
    gsap.to(titleRef.current, {
      fillOpacity: 0,
    });
    if (gridRef.current && hoverBoxRef.current) {
      gsap.to(gridRef.current.position, { z: 0, duration: 0.4 });
      gsap.to(hoverBoxRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.4 });
    }
  };

  return (
    <mesh
      ref={gridRef as any}
      position={position}
      onClick={portalInto as any}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <planeGeometry args={[4, 4, 1]} />
      <group>
        <mesh position={[0, 0, -0.01]} ref={hoverBoxRef} scale={[0, 0, 0]}>
          <boxGeometry args={[4, 4, 0.5]} />
          <meshPhysicalMaterial color="#444" transparent={true} opacity={0.3} />
          <Edges color="white" lineWidth={3} />
        </mesh>
        <Text position={[0, -1.8, 0.4]} {...fontProps} ref={titleRef as any}>
          {title}
        </Text>
      </group>
      <MeshPortalMaterial ref={portalRef} blend={0} resolution={0} blur={0}>
        <color attach="background" args={[color]} />
        {children}
      </MeshPortalMaterial>
    </mesh>
  );
};
