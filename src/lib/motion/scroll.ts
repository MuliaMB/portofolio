/**
 * Scroll State Manager
 * 
 * Tracks scroll position, velocity, and progress in the RAF loop.
 * Subscribes to globalTicker for smooth updates and CSS variable writing.
 * 
 * Values are exposed via the singleton `scroll` instance and CSS variables:
 * --scroll-y: Current scroll position (px)
 * --scroll-progress: Normalized scroll progress (0-1)
 * --sv: Scroll velocity (px/s)
 * --scroll-dir: Scroll direction (1 = down, -1 = up, 0 = idle)
 */

import { globalTicker } from "./ticker";
import { damp, clamp } from "./easing";

interface ScrollState {
  /** Raw scroll position from window */
  target: number;
  /** Smoothed current position */
  current: number;
  /** Scroll velocity in px/s */
  velocity: number;
  /** Normalized progress (0-1) */
  progress: number;
  /** Scroll direction: 1 (down), -1 (up), 0 (idle) */
  direction: 1 | -1 | 0;
  /** Maximum scrollable distance */
  max: number;
}

class Scroll {
  private state: ScrollState = {
    target: 0,
    current: 0,
    velocity: 0,
    progress: 0,
    direction: 0,
    max: 0,
  };

  private initialized = false;
  private cleanupTicker: (() => void) | null = null;
  
  // Configuration
  private smoothing = 12; // Higher = faster response (matches mouse.ts)
  private velocityThreshold = 5; // Minimum velocity to register direction

  /**
   * Initialize scroll tracking
   */
  init(): void {
    if (this.initialized || typeof window === "undefined") return;
    
    this.initialized = true;
    
    // Initial measurements
    this.measure();
    this.state.target = window.scrollY;
    this.state.current = this.state.target;
    
    // Add event listeners
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("resize", this.handleResize, { passive: true });
    
    // Subscribe to global ticker
    this.cleanupTicker = globalTicker.add(this.handleTick);
    
    // Initial CSS update
    this.updateCSSVariables();
  }

  /**
   * Cleanup listeners and subscriptions
   */
  destroy(): void {
    if (!this.initialized) return;
    
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
    
    if (this.cleanupTicker) {
      this.cleanupTicker();
      this.cleanupTicker = null;
    }
    
    this.initialized = false;
  }

  /**
   * Manually refresh dimensions (useful if content changes size)
   */
  refresh(): void {
    if (!this.initialized) return;
    this.measure();
    this.handleScroll(); // Update target immediately
  }

  /**
   * Get current state (read-only)
   */
  get(): Readonly<ScrollState> {
    return this.state;
  }

  // --- Internals ---

  private measure(): void {
    if (typeof document === "undefined") return;
    this.state.max = document.documentElement.scrollHeight - window.innerHeight;
  }

  private handleScroll = (): void => {
    this.state.target = window.scrollY;
  };

  private handleResize = (): void => {
    this.measure();
  };

  private handleTick = (_time: number, delta: number): void => {
    // If delta is effectively zero (paused), skip to prevent divide-by-zero or NaNs
    if (delta <= 0.001) return;

    const prevY = this.state.current;

    // Smooth damp to target
    this.state.current = damp(
      this.state.current,
      this.state.target,
      this.smoothing,
      delta
    );

    // Calculate velocity
    // Velocity = distance / time
    this.state.velocity = (this.state.current - prevY) / delta;

    // Calculate direction (with threshold to prevent flickering at rest)
    if (Math.abs(this.state.velocity) > this.velocityThreshold) {
      this.state.direction = this.state.velocity > 0 ? 1 : -1;
    } else {
      this.state.direction = 0;
    }

    // Calculate progress
    // Guard against 0 max scroll (short pages)
    if (this.state.max > 0) {
      this.state.progress = clamp(this.state.current / this.state.max, 0, 1);
    } else {
      this.state.progress = 0; // Or 1? 0 is safer.
    }

    // Validation
    if (process.env.NODE_ENV === "development") {
      if (Number.isNaN(this.state.velocity)) {
        this.state.velocity = 0;
      }
    }

    this.updateCSSVariables();
  };

  private updateCSSVariables(): void {
    if (typeof document === "undefined") return;
    
    const root = document.documentElement;
    // --scroll-y: Current smoothed scroll position
    root.style.setProperty("--scroll-y", this.state.current.toFixed(2));
    // --scroll-progress: 0 to 1
    root.style.setProperty("--scroll-progress", this.state.progress.toFixed(4));
    // --sv: Scroll Velocity
    root.style.setProperty("--sv", this.state.velocity.toFixed(2));
    // --scroll-dir: 1, -1, or 0
    root.style.setProperty("--scroll-dir", this.state.direction.toString());
  }
}

export const scroll = new Scroll();
export type { ScrollState };
