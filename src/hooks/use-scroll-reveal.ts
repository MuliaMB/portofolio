"use client";

import { useState, useEffect, useRef } from "react";
import { globalTicker } from "@/lib/motion/ticker";
import { damp } from "@/lib/motion/easing";
import { useReducedMotion } from "./use-reduced-motion";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number; // Delay in seconds
  speed?: number; // Smoothing factor (default: 15)
  distance?: number; // Distance to translate (default: 20)
}

/**
 * useScrollReveal Hook
 * 
 * Reveals an element when it scrolls into view with a smooth dampening animation.
 * Respects reduced motion preferences by disabling translation.
 * 
 * @param options - Configuration options for the reveal effect
 * @returns { ref, isVisible } - Attach ref to the element you want to animate
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  rootMargin = "0px",
  delay = 0,
  speed = 12,
  distance = 20,
}: UseScrollRevealOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  // Animation state refs (mutable to avoid re-renders during animation loop)
  const state = useRef({
    opacity: 0,
    y: prefersReducedMotion ? 0 : distance,
  });
  
  const target = useRef({
    opacity: 0,
    y: prefersReducedMotion ? 0 : distance,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Initialize state based on current visibility and reduced motion
    // This handles prop updates or motion preference changes gracefully
    const initialY = prefersReducedMotion ? 0 : distance;
    
    // If not yet visible, ensure we are at the starting position
    if (!isVisible) {
      state.current.y = initialY;
      target.current.y = initialY;
      state.current.opacity = 0;
      target.current.opacity = 0;
      
      // Apply initial styles immediately to prevent flash
      element.style.opacity = "0";
      element.style.transform = `translate3d(0, ${initialY}px, 0)`;
    } else {
      // If already visible, ensure target is at 0
      target.current.opacity = 1;
      target.current.y = 0;
    }

    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Calculate delay in ms
          const delayMs = delay * 1000;
          
          timeoutId = setTimeout(() => {
            setIsVisible(true);
            target.current.opacity = 1;
            target.current.y = 0;
          }, delayMs);
        } else {
          clearTimeout(timeoutId);
          setIsVisible(false);
          target.current.opacity = 0;
          target.current.y = prefersReducedMotion ? 0 : distance;
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Animation loop using globalTicker
    const cleanupTicker = globalTicker.add((_time, delta) => {
      // Damp values towards target
      // Using a slightly higher speed for opacity can feel snappier, but uniform is fine
      state.current.opacity = damp(state.current.opacity, target.current.opacity, speed, delta);
      state.current.y = damp(state.current.y, target.current.y, speed, delta);

      // Apply styles
      if (ref.current) {
        // Rounding opacity to 3 decimals and translation to 2 decimals for cleaner DOM
        ref.current.style.opacity = state.current.opacity.toFixed(3);
        ref.current.style.transform = `translate3d(0, ${state.current.y.toFixed(2)}px, 0)`;
      }
    });

    return () => {
      observer.disconnect();
      cleanupTicker();
      clearTimeout(timeoutId);
    };
  }, [threshold, rootMargin, delay, speed, distance, prefersReducedMotion]); // Dependencies ensuring updates

  return { ref, isVisible };
}
