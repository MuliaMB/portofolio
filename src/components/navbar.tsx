/**
 * Navbar Component
 * 
 * Sticky navigation with active section indicator.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { useTheme } from "@/hooks/use-theme";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { IconSun, IconMoon, IconMenu, IconX, IconTerminal } from "@/components/ui/icons";
import { navItems, sectionIds } from "@/content/profile";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection([...sectionIds]);
  const { theme, toggleTheme } = useTheme();

  // Track scroll position for background opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    },
    []
  );

  return (
    <>
      {/* Skip Link */}
      <a href="#home" className="skip-link">
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[var(--z-sticky)]",
          "transition-all duration-[--duration-normal]",
          isScrolled
            ? "bg-[hsl(var(--color-bg)/0.8)] backdrop-blur-md border-b border-[hsl(var(--color-border))]"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav
            className="flex items-center justify-between h-16 md:h-20"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="flex items-center gap-2 text-lg font-bold tracking-tight hover:text-[hsl(var(--color-accent))] transition-colors"
            >
              <IconTerminal size={20} className="text-[hsl(var(--color-accent))]" />
              <span>root@frey</span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium",
                      "transition-colors duration-[--duration-fast]",
                      activeSection === item.id
                        ? "text-[hsl(var(--color-text))]"
                        : "text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text-secondary))]"
                    )}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute inset-x-1 -bottom-px h-0.5 bg-[hsl(var(--color-accent))]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className="w-9 h-9 p-0"
              >
                {theme === "dark" ? (
                  <IconSun size={18} />
                ) : (
                  <IconMoon size={18} />
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                className="md:hidden w-9 h-9 p-0"
              >
                {isMobileMenuOpen ? (
                  <IconX size={20} />
                ) : (
                  <IconMenu size={20} />
                )}
              </Button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[calc(var(--z-sticky)-1)] bg-[hsl(var(--color-bg)/0.95)] backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <nav
            className="flex flex-col items-center justify-center h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      "text-2xl font-medium",
                      "transition-colors duration-[--duration-fast]",
                      activeSection === item.id
                        ? "text-[hsl(var(--color-accent))]"
                        : "text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-text))]"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </>
  );
}
