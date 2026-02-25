/**
 * Noise Functions
 * 
 * Simple noise implementations for ambient animations.
 * No external libraries required.
 */

/**
 * Simple 1D noise using sine waves
 * Creates organic-looking periodic motion
 * 
 * @param t - Time value (typically time * speed)
 * @returns Value between -1 and 1
 */
export function simpleNoise(t: number): number {
  return (
    Math.sin(t) * 0.5 +
    Math.sin(t * 2.1) * 0.25 +
    Math.sin(t * 0.5) * 0.25
  );
}

/**
 * 2D noise for more complex patterns
 * Uses offset to create independent x/y values
 * 
 * @param t - Time value
 * @param offsetX - X offset for variation
 * @param offsetY - Y offset for variation
 */
export function noise2D(
  t: number,
  offsetX: number = 0,
  offsetY: number = 100
): { x: number; y: number } {
  return {
    x: simpleNoise(t + offsetX),
    y: simpleNoise(t + offsetY),
  };
}

/**
 * Fractal Brownian Motion (fBm)
 * Combines multiple octaves of noise for more natural-looking results
 * 
 * @param t - Time value
 * @param octaves - Number of octaves (more = more detail, but slower)
 * @param persistence - How much each octave contributes (0.5 typical)
 */
export function fbm(
  t: number,
  octaves: number = 4,
  persistence: number = 0.5
): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;
  
  for (let i = 0; i < octaves; i++) {
    value += amplitude * simpleNoise(t * frequency);
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= 2;
  }
  
  return value / maxValue;
}

/**
 * Ambient drift values for floating elements
 * Returns x, y, and rotation values suitable for transforms
 * 
 * @param time - Current time (from RAF loop)
 * @param speed - Animation speed multiplier (0.1 = slow, 1 = fast)
 * @param intensity - Movement intensity (pixels for x/y, degrees for rotation)
 */
export function ambientDrift(
  time: number,
  speed: number = 0.3,
  intensity: { x: number; y: number; rotation: number } = {
    x: 10,
    y: 10,
    rotation: 3,
  }
): { x: number; y: number; rotation: number } {
  const t = time * 0.001 * speed; // Convert to seconds and apply speed
  
  return {
    x: fbm(t, 3, 0.5) * intensity.x,
    y: fbm(t + 50, 3, 0.5) * intensity.y,
    rotation: fbm(t + 100, 2, 0.5) * intensity.rotation,
  };
}

/**
 * Pulsing value for subtle scale/opacity animations
 * 
 * @param time - Current time
 * @param speed - Pulse speed
 * @param min - Minimum value
 * @param max - Maximum value
 */
export function pulse(
  time: number,
  speed: number = 1,
  min: number = 0.9,
  max: number = 1.1
): number {
  const t = time * 0.001 * speed;
  const normalized = (Math.sin(t) + 1) / 2; // 0 to 1
  return min + normalized * (max - min);
}
