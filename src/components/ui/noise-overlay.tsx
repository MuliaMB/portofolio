import { cn } from "@/lib/utils";

interface NoiseOverlayProps {
  className?: string;
  opacity?: number;
}

export function NoiseOverlay({ className, opacity = 0.05 }: NoiseOverlayProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[9999] h-full w-full select-none mix-blend-overlay",
        className
      )}
      style={{ opacity }}
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}
