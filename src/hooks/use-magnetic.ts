/**
 * useMagnetic Hook
 * 
 * Creates a magnetic effect where an element is attracted to the mouse cursor
 * within a certain radius, using spring physics for smooth movement.
 * 
 * Usage:
 *   const { ref, x, y } = useMagnetic({ strength: 0.5, radius: 200 });
 *   
 *   return (
 *     <div ref={ref} style={{ transform: `translate(${x}px, ${y}px)` }}>
 *       Hover me
 *     </div>
 *   );
 */

"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useFrame } from "./use-frame";
import { useReducedMotion } from "./use-reduced-motion";
import { mouse } from "@/lib/motion/mouse";

interface MagneticOptions {
  /** Strength of the magnetic pull (0-1 recommended). Default: 0.5 */
  strength?: number;
  /** Radius in pixels where the effect is active. Default: 100 */
  radius?: number;
  /** Spring stiffness. Default: 150 */
  stiffness?: number;
  /** Spring damping. Default: 12 */
  damping?: number;
}

interface MagneticResult<T extends HTMLElement> {
  /** Ref to attach to the target element */
  ref: React.RefObject<T | null>;
  /** Current X offset in pixels */
  x: number;
  /** Current Y offset in pixels */
  y: number;
}

export function useMagnetic<T extends HTMLElement>(
  options: MagneticOptions = {}
): MagneticResult<T> {
  const {
    strength = 0.5,
    radius = 100,
    stiffness = 150,
    damping = 12
  } = options;

  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  
  // Physics state (stored in refs to avoid re-renders during calculation)
  const position = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  
  // React state for the consumer
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const updatePhysics = useCallback(
    (_time: number, delta: number) => {
      if (!ref.current || reducedMotion) {
        return;
      }

      // 1. Calculate Target
      // We need the layout position (without transform)
      // So we subtract the current offset from the bounding rect
      const rect = ref.current.getBoundingClientRect();
      const layoutCenterX = rect.left + rect.width / 2 - position.current.x;
      const layoutCenterY = rect.top + rect.height / 2 - position.current.y;
      
      const mouseState = mouse.get();
      const dx = mouseState.current.x - layoutCenterX;
      const dy = mouseState.current.y - layoutCenterY;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        // Move target towards mouse based on strength
        target.current.x = dx * strength;
        target.current.y = dy * strength;
      } else {
        // Reset to origin
        target.current.x = 0;
        target.current.y = 0;
      }

      // 2. Apply Spring Physics (Damped Harmonic Oscillator)
      // Force = (Target - Current) * Stiffness
      const forceX = (target.current.x - position.current.x) * stiffness;
      const forceY = (target.current.y - position.current.y) * stiffness;

      // Acceleration = Force - Velocity * Damping
      const accelX = forceX - velocity.current.x * damping;
      const accelY = forceY - velocity.current.y * damping;

      // Velocity += Acceleration * dt
      velocity.current.x += accelX * delta;
      velocity.current.y += accelY * delta;

      // Position += Velocity * dt
      position.current.x += velocity.current.x * delta;
      position.current.y += velocity.current.y * delta;

      // 3. Update State if changed significantly (optimization)
      // Use a small epsilon to stop updates when settled
      const epsilon = 0.05;
      const hasMoved = 
        Math.abs(position.current.x - offset.x) > epsilon || 
        Math.abs(position.current.y - offset.y) > epsilon;
        
      if (hasMoved) {
        setOffset({
          x: position.current.x,
          y: position.current.y
        });
      }
    },
    [strength, radius, stiffness, damping, reducedMotion, offset.x, offset.y]
  );
  
  // Reset when reduced motion changes
  useEffect(() => {
    if (reducedMotion) {
      position.current = { x: 0, y: 0 };
      velocity.current = { x: 0, y: 0 };
      setOffset({ x: 0, y: 0 });
    }
  }, [reducedMotion]);

  useFrame(updatePhysics, !reducedMotion);

  return { ref, x: offset.x, y: offset.y };
}
