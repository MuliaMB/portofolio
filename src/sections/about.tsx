/**
 * About Section
 * 
 * Education, organization experience, and achievements.
 */

"use client";

import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { IconGraduationCap, IconBriefcase, IconAward } from "@/components/ui/icons";
import { profile } from "@/content/profile";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function AboutSection() {
  const { ref: eduRef } = useScrollReveal<HTMLDivElement>({ delay: 0 });
  const { ref: orgRef } = useScrollReveal<HTMLDivElement>({ delay: 0.1 });
  const { ref: achieveRef } = useScrollReveal<HTMLDivElement>({ delay: 0.2 });

  return (
    <Section
      sectionId="about"
      title="About Me"
      subtitle={profile.personal.bio}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Education */}
        <div className="space-y-4" ref={eduRef}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[--radius-lg] bg-[hsl(var(--color-accent-subtle))] flex items-center justify-center">
              <IconGraduationCap className="text-[hsl(var(--color-accent))]" size={20} />
            </div>
            <h3 className="text-lg font-semibold">Education</h3>
          </div>

          <div className="space-y-4">
            {profile.education.map((edu, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h4 className="font-medium">{edu.degree}</h4>
                  <p className="text-sm text-[hsl(var(--color-text-secondary))]">{edu.field}</p>
                  <p className="text-sm text-[hsl(var(--color-accent))] mt-1">{edu.institution}</p>
                  <p className="text-xs text-[hsl(var(--color-text-muted))] mt-2">
                    {edu.startYear} - {edu.endYear || "Present"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Organizations */}
        <div className="space-y-4" ref={orgRef}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[--radius-lg] bg-[hsl(var(--color-accent-subtle))] flex items-center justify-center">
              <IconBriefcase className="text-[hsl(var(--color-accent))]" size={20} />
            </div>
            <h3 className="text-lg font-semibold">Organizations</h3>
          </div>

          <div className="space-y-4">
            {profile.organizations.map((org, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h4 className="font-medium">{org.role}</h4>
                  <p className="text-sm text-[hsl(var(--color-accent))]">{org.name}</p>
                  <p className="text-sm text-[hsl(var(--color-text-secondary))] mt-2">
                    {org.description}
                  </p>
                  <p className="text-xs text-[hsl(var(--color-text-muted))] mt-2">
                    {org.startDate.split("-")[0]} - {org.endDate?.split("-")[0] || "Present"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-4 md:col-span-2 lg:col-span-1" ref={achieveRef}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[--radius-lg] bg-[hsl(var(--color-accent-subtle))] flex items-center justify-center">
              <IconAward className="text-[hsl(var(--color-accent))]" size={20} />
            </div>
            <h3 className="text-lg font-semibold">Key Achievements</h3>
          </div>

          <div className="space-y-4">
            {profile.achievements.map((achievement, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-[hsl(var(--color-text-secondary))] mt-1">
                        {achievement.description}
                      </p>
                    </div>
                    <span className="text-xs text-[hsl(var(--color-text-muted))] whitespace-nowrap">
                      {achievement.year}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
