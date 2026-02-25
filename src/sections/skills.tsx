/**
 * Skills Section
 * 
 * Skill categories displayed as clean tag clouds.
 */

"use client";

import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/content/profile";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref } = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
}

export function SkillsSection() {
  return (
    <Section
      sectionId="skills"
      title="Skills & Expertise"
      subtitle="Technologies and domains I work with."
    >
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {profile.skillCategories.map((category, index) => (
          <Reveal key={category.name} delay={index * 0.1}>
            <Card interactive proximityRadius={400} className="h-full border-[hsl(var(--color-border))]/50 bg-[hsl(var(--color-card))]/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold tracking-tight mb-3">{category.name}</h3>
                
                <p className="text-sm text-[hsl(var(--color-text-secondary))] mb-5 leading-relaxed">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill.name} 
                      variant="outline"
                      className="text-sm px-3 py-1 border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-accent))]/50 hover:text-[hsl(var(--color-accent))] transition-colors"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
