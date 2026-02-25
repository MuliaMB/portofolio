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
  CertificatesSection,
  BugHuntingSection,
  ResumeSection,
} from "@/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <BugHuntingSection />
      <ResumeSection />
    </>
  );
}
