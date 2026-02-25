/**
 * Motion Engine
 * 
 * Custom animation system using a single global RAF loop.
 * No external animation libraries required.
 */

export { globalTicker } from "./ticker";
export { mouse } from "./mouse";
export { scroll, type ScrollState } from "./scroll";
export {
  lerp,
  damp,
  clamp,
  mapRange,
  mapRangeClamped,
  distance,
  proximity,
  Easing,
} from "./easing";
export {
  simpleNoise,
  noise2D,
  fbm,
  ambientDrift,
  pulse,
} from "./noise";
