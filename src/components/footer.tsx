/**
 * Footer Component
 */

import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";
import { IconGitHub, IconLinkedIn, IconTwitter } from "@/components/ui/icons";
import { profile } from "@/content/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialIcons = {
    github: IconGitHub,
    linkedin: IconLinkedIn,
    twitter: IconTwitter,
  };

  return (
    <footer className="border-t border-[hsl(var(--color-border))] py-8 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[hsl(var(--color-text-muted))]">
            &copy; {currentYear} {profile.personal.name}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            {profile.personal.socialLinks
              .filter((link) => link.platform !== "email")
              .map((link) => {
                const Icon = socialIcons[link.platform as keyof typeof socialIcons];
                if (!Icon) return null;
                
                return (
                  <ExternalLink
                    key={link.platform}
                    href={link.url}
                    aria-label={link.label}
                    className="text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))]"
                  >
                    <Icon size={20} />
                  </ExternalLink>
                );
              })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
