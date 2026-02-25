/**
 * Badge Component
 * 
 * Small status indicator with severity variants.
 */

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { BugSeverity } from "@/content/profile";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "severity";
  severity?: BugSeverity;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", severity, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-[--radius-full]",
          "text-xs font-medium",
          "transition-colors duration-[--duration-fast]",
          
          // Default variant
          variant === "default" && [
            "bg-[hsl(var(--color-accent-subtle))]",
            "text-[hsl(var(--color-accent))]",
          ],
          
          // Outline variant
          variant === "outline" && [
            "border border-[hsl(var(--color-border))]",
            "text-[hsl(var(--color-text-secondary))]",
          ],
          
          // Severity variants
          variant === "severity" && severity === "critical" && [
            "bg-[hsl(var(--color-critical)/0.15)]",
            "text-[hsl(var(--color-critical))]",
            "border border-[hsl(var(--color-critical)/0.3)]",
          ],
          variant === "severity" && severity === "high" && [
            "bg-[hsl(var(--color-high)/0.15)]",
            "text-[hsl(var(--color-high))]",
            "border border-[hsl(var(--color-high)/0.3)]",
          ],
          variant === "severity" && severity === "medium" && [
            "bg-[hsl(var(--color-medium)/0.15)]",
            "text-[hsl(var(--color-medium))]",
            "border border-[hsl(var(--color-medium)/0.3)]",
          ],
          variant === "severity" && severity === "low" && [
            "bg-[hsl(var(--color-low)/0.15)]",
            "text-[hsl(var(--color-low))]",
            "border border-[hsl(var(--color-low)/0.3)]",
          ],
          
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
