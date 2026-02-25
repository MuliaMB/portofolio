/**
 * Scroll to Top Button
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IconChevronUp } from "@/components/ui/icons";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-[var(--z-sticky)]"
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 p-0 rounded-full shadow-lg"
          >
            <IconChevronUp size={20} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
