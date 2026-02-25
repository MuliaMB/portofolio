/**
 * External Link Component
 * 
 * Secure external links with proper rel attributes.
 */

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Show external link icon */
  showIcon?: boolean;
}

export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ className, href, children, showIcon = false, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-1",
          "text-[hsl(var(--color-accent))] hover:underline",
          "transition-colors duration-[--duration-fast]",
          className
        )}
        {...props}
      >
        {children}
        {showIcon && (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    );
  }
);

ExternalLink.displayName = "ExternalLink";
