/**
 * useFrame Hook
 * 
 * Subscribe to the global animation loop.
 * Callback receives time (ms) and delta (seconds).
 */

"use client";

import { useEffect, useRef } from "react";
import { globalTicker } from "@/lib/motion/ticker";

type FrameCallback = (time: number, delta: number) => void;

/**
 * Subscribe to the global RAF loop
 * 
 * @param callback - Function called every frame with (time, delta)
 * @param active - Whether the subscription is active (default: true)
 */
export function useFrame(callback: FrameCallback, active: boolean = true): void {
  const savedCallback = useRef<FrameCallback>(callback);
  
  // Keep callback reference fresh without restarting subscription
  useEffect(() => {
    savedCallback.current = callback;
  });
  
  useEffect(() => {
    if (!active) return;
    
    const handler: FrameCallback = (time, delta) => {
      savedCallback.current(time, delta);
    };
    
    return globalTicker.add(handler);
  }, [active]);
}
