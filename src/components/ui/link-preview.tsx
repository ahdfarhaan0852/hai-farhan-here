"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 250,
  height = 160,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src: string;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Spring configuration for ultra-smooth inertia
  const springConfig = { stiffness: 180, damping: 20 };
  
  // Motion values for translation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Motion values for 3D rotation
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  // Apply smooth springs
  const translateX = useSpring(x, springConfig);
  const translateY = useSpring(y, springConfig);
  const rotateX = useSpring(rx, springConfig);
  const rotateY = useSpring(ry, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    
    // Mouse position relative to the center of the text trigger
    const mouseX = event.clientX - targetRect.left;
    const mouseY = event.clientY - targetRect.top;
    
    const px = (mouseX - targetRect.width / 2) / (targetRect.width / 2); // range -1 to 1
    const py = (mouseY - targetRect.height / 2) / (targetRect.height / 2); // range -1 to 1
    
    // Map to translation and rotation
    x.set(px * 15); // Translation offset horizontal
    y.set(py * 15); // Translation offset vertical
    rx.set(-py * 15); // Rotate X based on vertical offset (tilt up/down)
    ry.set(px * 20); // Rotate Y based on horizontal offset (tilt left/right)
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rx.set(0);
    ry.set(0);
  };

  return (
    <>
      {isMounted ? (
        <span className="hidden">
          <img
            src={src}
            width={width}
            height={height}
            loading="lazy"
            alt="hidden image"
          />
        </span>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) handleMouseLeave();
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "transition-all duration-200 border-b border-dotted cursor-pointer",
            className
          )}
          href={url}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            className="[transform-origin:var(--radix-hover-card-content-transform-origin)] z-50 pointer-events-none"
            side="top"
            align="center"
            sideOffset={15}
          >
            <AnimatePresence>
              {isOpen && (
                /* Outer div: controls falling and scale animation */
                <motion.div
                  initial={{ opacity: 0, y: -45, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    },
                  }}
                  exit={{ opacity: 0, y: 35, scale: 0.85 }}
                  className="perspective-1000 transform-style-3d"
                >
                  {/* Inner div: controls 3D tilt and spring translations */}
                  <motion.div
                    style={{
                      x: translateX,
                      y: translateY,
                      rotateX: rotateX,
                      rotateY: rotateY,
                      transformStyle: "preserve-3d",
                    }}
                    className="p-1.5 bg-brand-rose-soft/95 dark:bg-brand-plum-charcoal/95 border border-brand-rose-dust dark:border-brand-plum-muted shadow-2xl rounded-2xl backdrop-blur-md overflow-hidden"
                  >
                    <a
                      href={url}
                      className="block rounded-xl overflow-hidden pointer-events-auto border border-brand-rose-dust/30 dark:border-brand-plum-muted/30"
                      style={{ fontSize: 0 }}
                    >
                      <img
                        src={isStatic ? imageSrc : src}
                        width={width}
                        height={height}
                        className="rounded-lg object-cover pointer-events-none transform transition-transform duration-500 hover:scale-105"
                        alt="preview image"
                        style={{ width: `${width}px`, height: `${height}px` }}
                      />
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
};
