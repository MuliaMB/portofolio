/**
 * Card Component
 * 
 * Container with proximity-reactive effects.
 */

"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useProximity } from "@/hooks/use-proximity";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable proximity field effects */
  interactive?: boolean;
  /** Proximity detection radius */
  proximityRadius?: number;
  /** Visual variant of the card */
  variant?: "default" | "glass";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, proximityRadius = 300, variant = "default", children, role = "article", ...props }, ref) => {
    const proximityRef = useProximity<HTMLDivElement>({
      radius: proximityRadius,
      active: interactive,
    });
    const reducedMotion = useReducedMotion();

    // Merge refs
    const mergedRef = (node: HTMLDivElement | null) => {
      (proximityRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    return (
      <div
        ref={interactive ? mergedRef : ref}
        role={role}
        className={cn(
          "relative overflow-hidden rounded-[--radius-lg] transition-all duration-[--duration-normal]",
          variant === "default" && "bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))]",
          variant === "glass" && [
            "glass",
            "shadow-[inset_0_1px_0_0_hsl(var(--color-text)/0.05)]",
          ],
          interactive && !reducedMotion && [
            "proximity-field",
            "will-change-transform",
            "touch-manipulation",
            // Subtle transform based on proximity
            "[transform:perspective(1000px)_rotateX(calc(var(--py)*-2deg))_rotateY(calc(var(--px)*2deg))_translateZ(calc(var(--pd)*5px))]",
            // Border glow on proximity
            "[box-shadow:0_0_calc(var(--pd)*30px)_hsl(var(--color-accent)/calc(var(--pd)*0.15))]",
            // Enhanced feedback on touch
            "[&.is-touched]:border-[hsl(var(--color-accent)/0.5)]",
          ],
          className
        )}
        {...props}
      >
        {interactive && !reducedMotion && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: "var(--pd)",
              background: `radial-gradient(600px circle at calc((var(--px) + 1) * 50%) calc((var(--py) + 1) * 50%), hsl(var(--color-accent) / 0.15), transparent 40%)`,
              willChange: "background, opacity",
            }}
          />
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[hsl(var(--color-text-secondary))]", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 p-6", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";
