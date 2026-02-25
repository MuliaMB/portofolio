/**
 * useReducedMotion Hook
 * 
 * Detects user preference for reduced motion.
 * All animations should respect this preference.
 */

"use client";

import { useState, useEffect } from "react";
import type { MotionProps } from "framer-motion";

/**
 * Type alias for Framer Motion properties to ensure consistent usage across the app.
 */
export type MotionPropType = MotionProps;

/**
 * Check if user prefers reduced motion
 * 
 * @returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    mediaQuery.addEventListener("change", handler);
    
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);
  
  return prefersReducedMotion;
}

/**
 * Utility to resolve motion props based on reduced motion preference.
 * If reduced motion is active, it strips non-opacity animations unless a custom
 * reducedMotion override is provided.
 * 
 * @param fullMotion The full set of animation props (initial, animate, exit, etc.)
 * @param isReduced Whether reduced motion is currently active
 * @param reducedMotion Optional specific props for reduced motion state
 * @returns The resolved motion props
 */
export function getMotionProps(
  fullMotion: MotionProps,
  isReduced: boolean,
  reducedMotion?: MotionProps
): MotionProps {
  if (!isReduced) return fullMotion;

  // Use custom reduced motion props if provided
  if (reducedMotion) return reducedMotion;

  // Fallback to opacity-only animations
  const fallback: MotionProps = { ...fullMotion };

  // Helper to strip non-opacity properties from an object
  const toOpacity = (target: any, defaultOpacity: number = 1) => {
    if (typeof target === "object" && target !== null && !Array.isArray(target)) {
      return { opacity: target.opacity ?? defaultOpacity };
    }
    return target;
  };

  if (fallback.initial) fallback.initial = toOpacity(fallback.initial, 0);
  if (fallback.animate) fallback.animate = toOpacity(fallback.animate, 1);
  if (fallback.exit) fallback.exit = toOpacity(fallback.exit, 0);
  if (fallback.whileHover) fallback.whileHover = toOpacity(fallback.whileHover, 1);
  if (fallback.whileTap) fallback.whileTap = toOpacity(fallback.whileTap, 1);
  if (fallback.whileInView) fallback.whileInView = toOpacity(fallback.whileInView, 1);

  return fallback;
}
