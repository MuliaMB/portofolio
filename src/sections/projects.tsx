/**
 * Projects Section
 * 
 * Project cards with proximity effects.
 */

"use client";

import { Section } from "@/components/ui/section";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "@/components/ui/external-link";
import { IconGitHub, IconExternalLink } from "@/components/ui/icons";
import { profile } from "@/content/profile";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref } = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
}

export function ProjectsSection() {
  const projects = profile.projects;

  return (
    <Section
      sectionId="projects"
      title="Works & Projects"
      subtitle="A selection of projects I've built, from security tools to infrastructure automation."
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-fr grid-flow-dense">
        {projects.map((project, index) => {
          const isFeatured = project.featured;
          
          return (
            <Reveal 
              key={project.slug} 
              delay={index * 0.1}
              className={cn(
                "col-span-1",
                isFeatured ? "md:col-span-8" : "md:col-span-4"
              )}
            >
              <Card 
                interactive={isFeatured} 
                proximityRadius={350} 
                variant={isFeatured ? "glass" : "default"}
                className="h-full flex flex-col"
              >
                <CardContent className={cn("flex-grow", isFeatured ? "p-6" : "p-4")}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h4 className={cn("font-semibold", isFeatured ? "text-xl" : "text-lg")}>
                      {project.title}
                    </h4>
                    {isFeatured && (
                      <span className="text-sm text-[hsl(var(--color-text-muted))] shrink-0">
                        {project.year}
                      </span>
                    )}
                  </div>

                  <p className={cn(
                    "text-[hsl(var(--color-text-secondary))] mb-4",
                    isFeatured ? "leading-relaxed" : "text-sm line-clamp-3"
                  )}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, isFeatured ? undefined : 3).map((tag) => (
                      <Badge key={tag} variant="outline" className={cn(!isFeatured && "text-xs px-2 py-0.5")}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {isFeatured && (
                  <CardFooter className="border-t border-[hsl(var(--color-border))] p-4 mt-auto">
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <ExternalLink
                          href={project.githubUrl}
                          className="text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))]"
                        >
                          <IconGitHub size={18} />
                          <span className="text-sm ml-1">Code</span>
                        </ExternalLink>
                      )}
                      {project.liveUrl && (
                        <ExternalLink
                          href={project.liveUrl}
                          className="text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))]"
                        >
                          <IconExternalLink size={18} />
                          <span className="text-sm ml-1">Live</span>
                        </ExternalLink>
                      )}
                    </div>
                  </CardFooter>
                )}
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
