/**
 * Button Component
 * 
 * Primary interactive element with consistent states.
 * Supports `asChild` pattern to render as a different element (e.g., <a>).
 */

import { forwardRef, cloneElement, isValidElement, Children } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  /** Render as the child element instead of a button */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const buttonClassName = cn(
      // Base styles
      "inline-flex items-center justify-center gap-2",
      "font-medium transition-all duration-[--duration-normal]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--color-bg))]",
      "disabled:pointer-events-none disabled:opacity-50",
      "select-none",
      
      // Variants
      variant === "primary" && [
        "bg-[hsl(var(--color-accent))] text-[hsl(0_0%_0%)]",
        "hover:bg-[hsl(var(--color-accent)/0.9)]",
        "active:scale-[0.98]",
      ],
      variant === "secondary" && [
        "bg-[hsl(var(--color-surface))] text-[hsl(var(--color-text))]",
        "border border-[hsl(var(--color-border))]",
        "hover:bg-[hsl(var(--color-surface-hover))] hover:border-[hsl(var(--color-border-strong))]",
        "active:scale-[0.98]",
      ],
      variant === "ghost" && [
        "text-[hsl(var(--color-text-secondary))]",
        "hover:text-[hsl(var(--color-text))] hover:bg-[hsl(var(--color-surface))]",
      ],
      variant === "outline" && [
        "border border-[hsl(var(--color-border))]",
        "text-[hsl(var(--color-text))]",
        "hover:bg-[hsl(var(--color-surface))] hover:border-[hsl(var(--color-accent))]",
        "active:scale-[0.98]",
      ],
      
      // Sizes
      size === "sm" && "h-8 px-3 text-sm rounded-[--radius-md]",
      size === "md" && "h-10 px-4 text-sm rounded-[--radius-md]",
      size === "lg" && "h-12 px-6 text-base rounded-[--radius-lg]",
      
      className
    );

    // asChild pattern: clone the child element with button styles
    if (asChild && isValidElement(children)) {
      const child = Children.only(children) as React.ReactElement<{ className?: string }>;
      return cloneElement(child, {
        className: cn(buttonClassName, child.props.className),
      });
    }

    return (
      <button
        ref={ref}
        aria-disabled={props.disabled}
        className={buttonClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
