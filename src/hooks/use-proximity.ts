/**
 * useProximity Hook
 * 
 * Calculates proximity of an element to the mouse cursor.
 * Writes CSS variables for use in animations.
 */

"use client";

import { useRef, useCallback, useEffect } from "react";
import { useFrame } from "./use-frame";
import { useReducedMotion } from "./use-reduced-motion";
import { mouse } from "@/lib/motion/mouse";
import { proximity, clamp } from "@/lib/motion/easing";

interface ProximityOptions {
  /** Maximum radius of effect in pixels */
  radius?: number;
  /** Whether the effect is active */
  active?: boolean;
}

/**
 * Track mouse proximity to an element
 * Writes --px, --py, --pd, --pv CSS variables to the element
 * 
 * @param options - Configuration options
 * @returns Ref to attach to the target element
 */
export function useProximity<T extends HTMLElement>(
  options: ProximityOptions = {}
): React.RefObject<T | null> {
  const { radius = 300, active = true } = options;
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const isTouched = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !active) return;

    // Detect touch capability for potential optimizations
    // (hover: none) usually indicates a touch-primary device
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    const handleTouchStart = () => {
      isTouched.current = true;
      element.classList.add("is-touched");
    };

    const handleTouchEnd = () => {
      isTouched.current = false;
      element.classList.remove("is-touched");
    };

    // Passive listeners to ensure scrolling isn't blocked
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });
    element.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [active]);
  
  const updateProximity = useCallback(
    (_time: number, _delta: number) => {
      if (!ref.current || reducedMotion) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      let px, py, prox, pv;
      
      if (isTouched.current) {
        // Simulate "center" hit on touch
        px = 0;
        py = 0;
        prox = 1;
        pv = 0;
      } else {
        const mouseState = mouse.get();
        const dx = mouseState.current.x - centerX;
        const dy = mouseState.current.y - centerY;
        const dist = Math.hypot(dx, dy);
        
        // Calculate normalized proximity (0 = far, 1 = at center)
        prox = proximity(dist, radius);
        
        // Calculate relative position within element (-1 to 1)
        px = clamp(dx / (rect.width / 2), -1, 1);
        py = clamp(dy / (rect.height / 2), -1, 1);
        pv = mouseState.normalizedSpeed;
      }
      
      // Write CSS variables
      ref.current.style.setProperty("--px", px.toFixed(3));
      ref.current.style.setProperty("--py", py.toFixed(3));
      ref.current.style.setProperty("--pd", prox.toFixed(3));
      ref.current.style.setProperty("--pv", pv.toFixed(3));
    },
    [radius, reducedMotion]
  );
  
  useFrame(updateProximity, active && !reducedMotion);
  
  return ref;
}
