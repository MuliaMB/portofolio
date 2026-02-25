/**
 * Utility Functions
 */

import { type ClassValue, clsx } from "clsx";

/**
 * Merge class names with clsx
 * Simple utility without tailwind-merge to keep dependencies minimal
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a date range
 */
export function formatDateRange(start: Date | string, end?: Date | string | null): string {
  const startDate = formatDate(start);
  if (!end) return `${startDate} - Present`;
  return `${startDate} - ${formatDate(end)}`;
}

/**
 * Calculate years of experience from a start date
 */
export function calculateYearsExperience(startYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}

/**
 * Generate an ID from a string (for anchors)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text to a maximum length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Check if we're in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Delay execution (for animations)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
