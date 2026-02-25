/**
 * Section Component
 * 
 * Page section wrapper with consistent spacing and ID for navigation.
 */

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** ID for anchor navigation */
  sectionId?: string;
  /** Section title */
  title?: string;
  /** Section subtitle/description */
  subtitle?: string;
  /** Container size */
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  /** Remove vertical padding */
  flush?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      sectionId,
      title,
      subtitle,
      containerSize = "lg",
      flush = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={sectionId}
        className={cn(
          "relative",
          !flush && "py-16 md:py-24 lg:py-32",
          className
        )}
        aria-labelledby={title ? `${sectionId}-title` : undefined}
        {...props}
      >
        <Container size={containerSize}>
          {(title || subtitle) && (
            <header className="mb-12 md:mb-16">
              {title && (
                <h2
                  id={`${sectionId}-title`}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-4 text-lg text-[hsl(var(--color-text-secondary))] max-w-2xl">
                  {subtitle}
                </p>
              )}
            </header>
          )}
          {children}
        </Container>
      </section>
    );
  }
);

Section.displayName = "Section";
