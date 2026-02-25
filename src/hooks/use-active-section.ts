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
  const observer = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    // Cleanup previous observer
    if (observer.current) {
      observer.current.disconnect();
    }
    
    // Create new observer
    observer.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0;
        let maxEntry: IntersectionObserverEntry | undefined;
        
        for (const entry of entries) {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxEntry = entry;
          }
        }
        
        // Only update if we have a sufficiently visible section
        if (maxEntry && maxRatio > 0.2) {
          setActiveSection(maxEntry.target.id);
        }
      },
      {
        // Offset to trigger when section is in the "active" zone
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    );
    
    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.current?.observe(element);
      }
    });
    
    return () => {
      observer.current?.disconnect();
    };
  }, [sectionIds]);
  
  return activeSection;
}
