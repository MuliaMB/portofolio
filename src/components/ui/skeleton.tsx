import { cn } from "@/lib/utils";

/**
 * Skeleton Primitive Component
 * 
 * A loading placeholder that mimics the shape of content.
 * Uses CSS keyframes for a custom pulse animation (0.4 -> 1 -> 0.4 opacity).
 * Respects prefers-reduced-motion by becoming static at 0.6 opacity.
 */

// Define styles as a constant to ensure consistent injection
// Using a unique class name to avoid conflicts
const SKELETON_STYLES = `
  @keyframes skeleton-pulse {
    0% { opacity: 0.4; }
    50% { opacity: 1; }
    100% { opacity: 0.4; }
  }
  
  .skeleton-primitive {
    /* Use surface-hover token which provides the correct luminance shift for both light (darker) and dark (lighter) modes */
    background-color: hsl(var(--color-surface-hover));
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton-primitive {
      animation: none !important;
      opacity: 0.6 !important;
    }
  }
`;

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <>
      <style>{SKELETON_STYLES}</style>
      <div
        className={cn(
          "skeleton-primitive",
          // Text variant default sizing
          variant === "text" && "h-4 w-full rounded-sm",
          // Shape variants
          variant === "circular" && "rounded-full",
          variant === "rectangular" && "rounded-md",
          className
        )}
        style={{
          width,
          height,
          ...style,
        }}
        {...props}
      />
    </>
  );
}
