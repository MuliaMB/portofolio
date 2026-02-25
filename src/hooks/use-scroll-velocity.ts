"use client";

import { useEffect, useRef } from "react";
import { globalTicker } from "@/lib/motion/ticker";
import { damp } from "@/lib/motion/easing";

const MAX_SPEED = 1000; // px/s
const SMOOTHING = 12;   // consistent with mouse tracking

export function useScrollVelocity() {
  const state = useRef({
    currentY: 0,
    velocity: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize with current scroll position to prevent jump
    state.current.currentY = window.scrollY;

    const onTick = (_time: number, delta: number) => {
      const targetY = window.scrollY;
      const prevY = state.current.currentY;

      // Smooth the scroll position first
      // This creates a "laggy" scroll value that we use to derive velocity
      // damp() uses exponential smoothing independent of frame rate
      state.current.currentY = damp(prevY, targetY, SMOOTHING, delta);

      // Calculate velocity based on the smoothed movement
      // This filters out micro-jitter from high-frequency scroll events
      if (delta > 0) {
        state.current.velocity = (state.current.currentY - prevY) / delta;
      }

      // Normalize velocity (0 to 1)
      // We take absolute value because scrolling up gives negative velocity
      const normalized = Math.min(Math.abs(state.current.velocity) / MAX_SPEED, 1);

      // Write to CSS variable for purely CSS-driven animations
      document.documentElement.style.setProperty("--sv", normalized.toFixed(3));
    };

    const cleanup = globalTicker.add(onTick);

    return () => {
      cleanup();
      // Optional: Reset velocity on unmount? 
      // Keeping it as-is might be safer to avoid style jumps if multiple components use it
      // but usually this hook is used once at the root layout.
    };
  }, []);
}
