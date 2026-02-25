"use client";

import { useState, useEffect } from "react";
import { mouse } from "@/lib/motion";

/**
 * Debug Panel - Dev-only component for inspecting motion variables
 * Displays: cursor velocity, proximity strength, active section
 * Only visible in development mode
 */
export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [motionData, setMotionData] = useState({
    mouseX: 0,
    mouseY: 0,
    velocity: 0,
    activeSection: "home",
  });

  // Only render in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const interval = setInterval(() => {
      const state = mouse.get();
      const activeEl = document.querySelector("[data-section].active");
      setMotionData({
        mouseX: Math.round(state.current.x),
        mouseY: Math.round(state.current.y),
        velocity: Math.round(state.normalizedSpeed * 100) / 100,
        activeSection: activeEl?.getAttribute("data-section") || "unknown",
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] font-mono text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-surface border border-border px-2 py-1 rounded hover:bg-muted transition-colors"
        aria-label="Toggle debug panel"
      >
        {isOpen ? "×" : "🔧"}
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-surface border border-border rounded p-3 min-w-[200px] shadow-lg">
          <h4 className="font-semibold text-accent mb-2 border-b border-border pb-1">
            Motion Debug
          </h4>
          <div className="space-y-1 text-muted">
            <div className="flex justify-between">
              <span>Mouse X:</span>
              <span className="text-foreground">{motionData.mouseX}px</span>
            </div>
            <div className="flex justify-between">
              <span>Mouse Y:</span>
              <span className="text-foreground">{motionData.mouseY}px</span>
            </div>
            <div className="flex justify-between">
              <span>Velocity:</span>
              <span className="text-foreground">{motionData.velocity}</span>
            </div>
            <div className="flex justify-between">
              <span>Active:</span>
              <span className="text-accent">{motionData.activeSection}</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-border text-muted/60">
            <div>--px: cursor proximity X</div>
            <div>--py: cursor proximity Y</div>
            <div>--pv: cursor velocity</div>
            <div>--pd: cursor distance</div>
          </div>
        </div>
      )}
    </div>
  );
}
