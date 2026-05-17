/**
 * useActiveSection Hook
 * 
 * Tracks which section is currently most visible in the viewport.
 * Uses IntersectionObserver for performance.
 */

"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Track the currently active section based on scroll position
 * 
 * @param sectionIds - Array of section element IDs to observe
 * @returns The ID of the currently active section
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "");
  
  // Track visibility of all sections
  const visibleSections = useRef<Record<string, number>>({});
  
  // Create stringified version of sectionIds to use as dependency
  // to avoid re-running effect when the array reference changes
  const sectionIdsStr = sectionIds.join(',');

  useEffect(() => {
    // Reset visible sections
    visibleSections.current = {};
    const ids = sectionIdsStr.split(',').filter(Boolean);
    
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Update the intersection ratio for each changed entry
        entries.forEach((entry) => {
          visibleSections.current[entry.target.id] = entry.intersectionRatio;
        });

        // Find the section with the highest intersection ratio
        let maxRatio = 0;
        let mostVisibleSection = "";

        Object.entries(visibleSections.current).forEach(([id, ratio]) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleSection = id;
          }
        });

        // Only update if we have a sufficiently visible section
        if (mostVisibleSection && maxRatio > 0.1) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        // Offset to trigger when section is in the "active" zone
        // Adjust these values if your navbar height changes
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );
    
    // Observe all sections
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      observer.disconnect();
    };
  }, [sectionIdsStr]);
  
  return activeSection;
}
