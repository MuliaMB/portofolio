/**
 * Global RAF Ticker
 * 
 * A singleton animation loop that all motion components subscribe to.
 * This prevents multiple RAF loops and ensures consistent frame timing.
 * 
 * Usage:
 *   import { globalTicker } from '@/lib/motion/ticker';
 *   const cleanup = globalTicker.add((time, delta) => { ... });
 *   // Call cleanup() to unsubscribe
 */

type TickerCallback = (time: number, delta: number) => void;

class Ticker {
  private callbacks = new Set<TickerCallback>();
  private frameId: number | null = null;
  private lastTime = 0;
  private isRunning = false;

  /**
   * Start the animation loop if not already running
   */
  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.tick(this.lastTime);
  }

  /**
   * Stop the animation loop
   */
  stop(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    this.isRunning = false;
  }

  /**
   * Add a callback to the animation loop
   * @returns Cleanup function to remove the callback
   */
  add(callback: TickerCallback): () => void {
    this.callbacks.add(callback);
    
    // Auto-start when first callback is added
    if (this.callbacks.size === 1) {
      this.start();
    }
    
    return () => this.remove(callback);
  }

  /**
   * Remove a callback from the animation loop
   */
  remove(callback: TickerCallback): void {
    this.callbacks.delete(callback);
    
    // Auto-stop when no callbacks remain
    if (this.callbacks.size === 0) {
      this.stop();
    }
  }

  /**
   * Get the current number of subscribers
   */
  get subscriberCount(): number {
    return this.callbacks.size;
  }

  /**
   * The main animation loop
   */
  private tick = (time: number): void => {
    // Calculate delta time in seconds
    const rawDelta = (time - this.lastTime) / 1000;
    this.lastTime = time;
    
    // Cap delta to prevent huge jumps if tab was inactive
    // Max 100ms (10fps minimum) to handle tab switching gracefully
    const delta = Math.min(rawDelta, 0.1);
    
    // Validate delta in development
    if (process.env.NODE_ENV === "development") {
      if (Number.isNaN(delta) || !Number.isFinite(delta)) {
        console.warn("[Ticker] Invalid delta detected:", delta);
        this.frameId = requestAnimationFrame(this.tick);
        return;
      }
    }
    
    // Execute all callbacks
    this.callbacks.forEach((callback) => {
      try {
        callback(time, delta);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("[Ticker] Callback error:", error);
        }
      }
    });
    
    // Schedule next frame
    this.frameId = requestAnimationFrame(this.tick);
  };
}

// Export singleton instance
export const globalTicker = new Ticker();
