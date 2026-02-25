/**
 * Motion Provider
 * 
 * Initializes the motion engine and provides context.
 */

"use client";

import { useEffect } from "react";
import { mouse } from "@/lib/motion/mouse";
import { globalTicker } from "@/lib/motion/ticker";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MotionProviderProps {
  children: React.ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    // Initialize mouse tracking
    mouse.init();

    // Add mouse update to global ticker
    const cleanup = globalTicker.add((_time, delta) => {
      mouse.update(delta);
    });

    return () => {
      cleanup();
      mouse.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
