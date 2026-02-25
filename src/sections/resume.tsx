/**
 * Resume Section
 * 
 * Work experience timeline with download option.
 */

"use client";

import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconDownload, IconBriefcase } from "@/components/ui/icons";
import { profile } from "@/content/profile";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref } = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
}

export function ResumeSection() {
  return (
    <Section
      sectionId="resume"
      title="Resume"
      subtitle="Professional experience and career journey."
    >
      {/* Download CTA */}
      <div className="flex justify-center mb-12">
        <Button size="lg" asChild>
          <a href="/resume" target="_blank">
            <IconDownload size={18} />
            View Printable Resume
          </a>
        </Button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[hsl(var(--color-border))] -translate-x-1/2" />

        <div className="space-y-8">
          {profile.workExperience.map((work, index) => (
            <Reveal
              key={index}
              delay={index * 0.1}
              className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[hsl(var(--color-accent))] border-2 border-[hsl(var(--color-bg))] -translate-x-1/2 mt-6" />

              {/* Content */}
              <div className="ml-10 md:ml-0 md:w-1/2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-[--radius-lg] bg-[hsl(var(--color-accent-subtle))] flex items-center justify-center shrink-0">
                        <IconBriefcase className="text-[hsl(var(--color-accent))]" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{work.role}</h4>
                        <p className="text-[hsl(var(--color-accent))]">{work.company}</p>
                        <p className="text-sm text-[hsl(var(--color-text-muted))]">
                          {work.startDate} - {work.endDate || "Present"}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-[hsl(var(--color-text-secondary))] mb-4">
                      {work.description}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {work.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-[hsl(var(--color-text-secondary))] flex items-start gap-2"
                        >
                          <span className="text-[hsl(var(--color-accent))] mt-1.5">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {work.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
