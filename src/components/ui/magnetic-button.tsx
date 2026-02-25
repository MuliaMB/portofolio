"use client";

import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps extends ButtonProps {
  /** Whether the magnetic effect is enabled. Default: true */
  magnetic?: boolean;
  /** Strength of the magnetic pull (0-1). Default: 0.5 */
  strength?: number;
  /** Radius in pixels where the effect is active. Default: 100 */
  radius?: number;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ 
    magnetic = true, 
    strength = 0.5, 
    radius = 100, 
    className, 
    style, 
    disabled, 
    ...props 
  }, ref) => {
    // Determine effective strength - disabled buttons shouldn't move
    const effectiveStrength = disabled ? 0 : strength;
    const isMagnetic = magnetic && !disabled;

    const { ref: magneticRef, x, y } = useMagnetic<HTMLButtonElement>({
      strength: effectiveStrength,
      radius,
    });

    // Combine refs to ensure both the hook and the parent get access to the element
    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        // Update magnetic ref
        if (magneticRef) {
          (magneticRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
        
        // Update forwarded ref
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [magneticRef, ref]
    );

    const transformStyle = isMagnetic 
      ? { transform: `translate3d(${x}px, ${y}px, 0)` }
      : {};

    return (
      <Button
        ref={setRefs}
        className={cn("will-change-transform", className)}
        style={{ ...style, ...transformStyle }}
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
      />
    );
  }
);

MagneticButton.displayName = "MagneticButton";
