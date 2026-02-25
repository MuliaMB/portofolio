/**
 * Mouse State Manager
 * 
 * Tracks mouse position and calculates velocity in the RAF loop,
 * not in mousemove events (for consistent frame-rate-independent behavior).
 * 
 * Values are exposed as a singleton object and also written to CSS variables
 * on the document root for use in CSS-based animations.
 */

import { damp } from "./easing";

interface Point {
  x: number;
  y: number;
}

interface MouseState {
  /** Raw mouse position from events */
  target: Point;
  /** Smoothed current position (interpolated) */
  current: Point;
  /** Velocity in pixels per second */
  velocity: Point;
  /** Speed magnitude (scalar) */
  speed: number;
  /** Normalized speed (0-1, clamped) */
  normalizedSpeed: number;
  /** Whether mouse is currently over the window */
  isActive: boolean;
}

class Mouse {
  private state: MouseState = {
    target: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    speed: 0,
    normalizedSpeed: 0,
    isActive: false,
  };

  private initialized = false;
  private smoothing = 12; // Higher = faster response (5-20 range)
  private maxSpeed = 2000; // Max speed for normalization (px/s)

  /**
   * Initialize mouse tracking (call once on app mount)
   */
  init(): void {
    if (this.initialized || typeof window === "undefined") return;
    
    this.initialized = true;
    
    // Track raw mouse position
    window.addEventListener("mousemove", this.handleMouseMove, { passive: true });
    window.addEventListener("mouseenter", this.handleMouseEnter, { passive: true });
    window.addEventListener("mouseleave", this.handleMouseLeave, { passive: true });
    
    // Set initial position to center of screen
    this.state.target.x = window.innerWidth / 2;
    this.state.target.y = window.innerHeight / 2;
    this.state.current.x = this.state.target.x;
    this.state.current.y = this.state.target.y;
  }

  /**
   * Cleanup event listeners
   */
  destroy(): void {
    if (!this.initialized) return;
    
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseenter", this.handleMouseEnter);
    window.removeEventListener("mouseleave", this.handleMouseLeave);
    
    this.initialized = false;
  }

  /**
   * Update mouse state (call from RAF loop)
   */
  update(delta: number): void {
    if (!this.initialized) return;
    
    const prevX = this.state.current.x;
    const prevY = this.state.current.y;
    
    // Smooth interpolation to target position
    this.state.current.x = damp(
      this.state.current.x,
      this.state.target.x,
      this.smoothing,
      delta
    );
    this.state.current.y = damp(
      this.state.current.y,
      this.state.target.y,
      this.smoothing,
      delta
    );
    
    // Calculate velocity from smoothed movement (prevents jitter)
    if (delta > 0) {
      this.state.velocity.x = (this.state.current.x - prevX) / delta;
      this.state.velocity.y = (this.state.current.y - prevY) / delta;
      
      // Calculate speed magnitude
      this.state.speed = Math.hypot(
        this.state.velocity.x,
        this.state.velocity.y
      );
      
      // Normalize speed (0-1)
      this.state.normalizedSpeed = Math.min(this.state.speed / this.maxSpeed, 1);
    }
    
    // Validate in development
    if (process.env.NODE_ENV === "development") {
      if (Number.isNaN(this.state.speed) || !Number.isFinite(this.state.speed)) {
        console.warn("[Mouse] Invalid speed detected:", this.state.speed);
        this.state.speed = 0;
        this.state.normalizedSpeed = 0;
      }
    }
    
    // Write to CSS variables
    this.updateCSSVariables();
  }

  /**
   * Write current values to CSS custom properties
   */
  private updateCSSVariables(): void {
    if (typeof document === "undefined") return;
    
    const root = document.documentElement;
    root.style.setProperty("--mx", this.state.current.x.toFixed(1));
    root.style.setProperty("--my", this.state.current.y.toFixed(1));
    root.style.setProperty("--mv", this.state.normalizedSpeed.toFixed(3));
  }

  /**
   * Get current mouse state (read-only)
   */
  get(): Readonly<MouseState> {
    return this.state;
  }

  /**
   * Get current position
   */
  get position(): Readonly<Point> {
    return this.state.current;
  }

  /**
   * Get normalized speed (0-1)
   */
  get normalizedVelocity(): number {
    return this.state.normalizedSpeed;
  }

  private handleMouseMove = (e: MouseEvent): void => {
    this.state.target.x = e.clientX;
    this.state.target.y = e.clientY;
    this.state.isActive = true;
  };

  private handleMouseEnter = (): void => {
    this.state.isActive = true;
  };

  private handleMouseLeave = (): void => {
    this.state.isActive = false;
  };
}

// Export singleton
export const mouse = new Mouse();
