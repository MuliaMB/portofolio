/**
 * Hero Section
 * 
 * Landing section with animated role rotation and stats.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { IconArrowRight, IconMapPin, IconGitHub, IconLinkedIn } from "@/components/ui/icons";
import { profile, getYearsExperience } from "@/content/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useFrame } from "@/hooks/use-frame";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ambientDrift } from "@/lib/motion/noise";

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const accentRef = useRef<HTMLDivElement>(null);

  // Rotate through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.personal.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Ambient drift for background accent
  useFrame((time) => {
    if (!accentRef.current || reducedMotion) return;
    const drift = ambientDrift(time, 0.2, { x: 30, y: 30, rotation: 0 });
    accentRef.current.style.transform = `translate(${drift.x}px, ${drift.y}px)`;
  }, !reducedMotion);

  // Compute years experience dynamically
  const yearsExp = getYearsExperience();
  const stats = profile.stats.map((stat) => {
    if (stat.label === "Years Experience") {
      return { ...stat, value: yearsExp };
    }
    return stat;
  });

  const { ref: statsRef } = useScrollReveal<HTMLDivElement>({ delay: 0.5 });

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section sectionId="home" flush className="min-h-screen flex items-center relative overflow-hidden" aria-label="Introduction">
      {/* Background accent */}
      <div
        ref={accentRef}
        className="absolute top-1/4 -right-32 w-96 h-96 bg-[hsl(var(--color-accent)/0.08)] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] text-sm text-[hsl(var(--color-text-secondary))]">
              <IconMapPin size={14} className="text-[hsl(var(--color-accent))]" />
              {profile.personal.location}
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block">{profile.personal.name.split(" ")[0]}</span>
              <span className="block text-[hsl(var(--color-text-secondary))]">
                {profile.personal.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            {/* Rotating roles */}
            <div className="h-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={reducedMotion ? {} : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reducedMotion ? {} : { y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg md:text-xl text-[hsl(var(--color-accent))] font-medium"
                >
                  {profile.personal.roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bio */}
            <p className="text-lg text-[hsl(var(--color-text-secondary))] max-w-lg leading-relaxed">
              {profile.personal.shortBio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={handleScrollToProjects}>
                View Projects
                <IconArrowRight size={18} />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={profile.personal.resumeUrl}>Download Resume</a>
              </Button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-4">
              {profile.personal.socialLinks.map((link) => {
                if (link.platform === "github") {
                  return (
                    <ExternalLink
                      key={link.platform}
                      href={link.url}
                      aria-label={link.label}
                      className="text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))]"
                    >
                      <IconGitHub size={24} />
                    </ExternalLink>
                  );
                }
                if (link.platform === "linkedin") {
                  return (
                    <ExternalLink
                      key={link.platform}
                      href={link.url}
                      aria-label={link.label}
                      className="text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))]"
                    >
                      <IconLinkedIn size={24} />
                    </ExternalLink>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="lg:justify-self-end" ref={statsRef}>
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 md:p-6 rounded-[--radius-xl] bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))]"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--color-accent))]">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="mt-2 text-xs md:text-sm text-[hsl(var(--color-text-muted))] whitespace-nowrap">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
