/**
 * Certificates Section
 * 
 * Certificate gallery with modal details.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconX, IconExternalLink, IconAward } from "@/components/ui/icons";
import { ExternalLink } from "@/components/ui/external-link";
import { profile, type Certificate } from "@/content/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref } = useScrollReveal<HTMLDivElement>({ delay });
  return <div ref={ref} className={className}>{children}</div>;
}

export function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <Section
      sectionId="certificates"
      title="Certifications"
      subtitle="Professional certifications validating expertise across security, cloud, and infrastructure domains."
    >
      {/* Certificate Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {profile.certificates.map((cert, index) => (
          <Reveal key={cert.id} delay={index * 0.05}>
            <Card
              className="cursor-pointer hover:border-[hsl(var(--color-accent)/0.5)] transition-colors h-full"
              onClick={() => setSelectedCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCert(cert);
                }
              }}
            >
              <CardContent className="p-4">
                <div className="w-10 h-10 rounded-[--radius-lg] bg-[hsl(var(--color-accent-subtle))] flex items-center justify-center mb-3">
                  <IconAward className="text-[hsl(var(--color-accent))]" size={20} />
                </div>
                <h4 className="font-medium text-sm leading-tight mb-2 line-clamp-2">
                  {cert.title}
                </h4>
                <p className="text-xs text-[hsl(var(--color-text-secondary))]">
                  {cert.issuer}
                </p>
                <p className="text-xs text-[hsl(var(--color-text-muted))] mt-1">
                  {cert.date}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
              className="fixed inset-0 z-[var(--z-overlay)] bg-[hsl(0_0%_0%/0.8)]"
              onClick={() => setSelectedCert(null)}
            />

            {/* Modal Content */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[var(--z-modal)] md:max-w-lg md:w-full"
            >
              <Card className="h-full md:h-auto overflow-auto">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-[--radius-xl] bg-[hsl(var(--color-accent-subtle))] flex items-center justify-center">
                      <IconAward className="text-[hsl(var(--color-accent))]" size={24} />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCert(null)}
                      aria-label="Close modal"
                      className="w-8 h-8 p-0"
                    >
                      <IconX size={18} />
                    </Button>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{selectedCert.title}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge>{selectedCert.issuer}</Badge>
                    <span className="text-sm text-[hsl(var(--color-text-muted))]">
                      {selectedCert.date}
                    </span>
                  </div>

                  {selectedCert.description && (
                    <p className="text-[hsl(var(--color-text-secondary))] mb-4">
                      {selectedCert.description}
                    </p>
                  )}

                  {selectedCert.credentialId && (
                    <p className="text-sm text-[hsl(var(--color-text-muted))] mb-4">
                      Credential ID: {selectedCert.credentialId}
                    </p>
                  )}

                  {selectedCert.credentialUrl && (
                    <ExternalLink
                      href={selectedCert.credentialUrl}
                      className="inline-flex items-center gap-2"
                    >
                      <IconExternalLink size={16} />
                      Verify Credential
                    </ExternalLink>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Section>
  );
}
