/**
 * Bug Hunting Section
 * 
 * Security research journal with severity indicators.
 */

"use client";

import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconShield } from "@/components/ui/icons";
import { profile, type BugSeverity } from "@/content/profile";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref } = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
}

const severityOrder: BugSeverity[] = ["critical", "high", "medium", "low"];

export function BugHuntingSection() {
  // Sort by severity
  const sortedEntries = [...profile.bugHunting].sort((a, b) => {
    return severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity);
  });

  // Calculate total bounties
  const totalBounty = profile.bugHunting.reduce((sum, entry) => {
    if (entry.bounty) {
      const amount = parseInt(entry.bounty.replace(/[$,]/g, ""), 10);
      return sum + (isNaN(amount) ? 0 : amount);
    }
    return sum;
  }, 0);

  return (
    <Section
      sectionId="security"
      title="Bug Hunting Journal"
      subtitle="Responsible disclosure findings from bug bounty programs and security research."
    >
      {/* Stats */}
      <Reveal className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-4 rounded-[--radius-lg] bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] text-center">
          <div className="text-2xl font-bold text-[hsl(var(--color-critical))]">
            {profile.bugHunting.filter((b) => b.severity === "critical").length}
          </div>
          <div className="text-xs text-[hsl(var(--color-text-muted))]">Critical</div>
        </div>
        <div className="p-4 rounded-[--radius-lg] bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] text-center">
          <div className="text-2xl font-bold text-[hsl(var(--color-high))]">
            {profile.bugHunting.filter((b) => b.severity === "high").length}
          </div>
          <div className="text-xs text-[hsl(var(--color-text-muted))]">High</div>
        </div>
        <div className="p-4 rounded-[--radius-lg] bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] text-center">
          <div className="text-2xl font-bold text-[hsl(var(--color-medium))]">
            {profile.bugHunting.filter((b) => b.severity === "medium").length}
          </div>
          <div className="text-xs text-[hsl(var(--color-text-muted))]">Medium</div>
        </div>
        <div className="p-4 rounded-[--radius-lg] bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] text-center">
          <div className="text-2xl font-bold text-[hsl(var(--color-accent))]">
            ${(totalBounty / 1000).toFixed(0)}k+
          </div>
          <div className="text-xs text-[hsl(var(--color-text-muted))]">Total Bounties</div>
        </div>
      </Reveal>

      {/* Entries */}
      <div className="space-y-6">
        {sortedEntries.map((entry, index) => (
          <Reveal key={entry.id} delay={0.1 + index * 0.05}>
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[--radius-lg] bg-[hsl(var(--color-surface-hover))] flex items-center justify-center shrink-0">
                      <IconShield
                        size={20}
                        className={
                          entry.severity === "critical"
                            ? "text-[hsl(var(--color-critical))]"
                            : entry.severity === "high"
                            ? "text-[hsl(var(--color-high))]"
                            : entry.severity === "medium"
                            ? "text-[hsl(var(--color-medium))]"
                            : "text-[hsl(var(--color-low))]"
                        }
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-medium">{entry.title}</h4>
                        <Badge variant="severity" severity={entry.severity}>
                          {entry.severity.toUpperCase()}
                        </Badge>
                      </div>

                      <p className="text-sm text-[hsl(var(--color-text-secondary))] mb-3">
                        {entry.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-1 text-right shrink-0">
                    <span className="text-sm text-[hsl(var(--color-text-secondary))]">
                      {entry.platform}
                    </span>
                    <span className="text-xs text-[hsl(var(--color-text-muted))]">
                      {entry.date}
                    </span>
                    {entry.bounty && (
                      <span className="text-sm font-medium text-[hsl(var(--color-accent))]">
                        {entry.bounty}
                      </span>
                    )}
                    {entry.cveId && (
                      <span className="text-xs text-[hsl(var(--color-text-muted))]">
                        {entry.cveId}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
