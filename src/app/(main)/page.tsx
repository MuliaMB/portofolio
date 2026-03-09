/**
 * Home Page
 * 
 * Single page with all sections.
 */

import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
} from "@/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </>
  );
}
