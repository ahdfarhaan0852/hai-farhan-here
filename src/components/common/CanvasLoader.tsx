import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";

export const CanvasLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const canvasStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100vw",
    height: "100vh",
    pointerEvents: "auto",
    zIndex: 0,
  };

  const noiseOverlayStyle: React.CSSProperties = {
    backgroundBlendMode: "soft-light",
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 600 600\'%3E%3Cfilter id=\'a\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23a)\'/%3E%3C/svg%3E")',
    backgroundRepeat: "repeat",
    backgroundSize: "100px",
  };

  return (
    <div className="w-full relative bg-[#08080a]" style={noiseOverlayStyle}>
      <Canvas
        className="base-canvas"
        shadows
        style={canvasStyle}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 15, 10]} intensity={1.2} />

          {children}

          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
};
