/**
 * Profile Content
 * 
 * All portfolio content is defined here with full TypeScript types.
 * Edit this file to customize the portfolio.
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "email" | "website";
  url: string;
  label: string;
}

export interface Stat {
  value: number | string;
  label: string;
  suffix?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number | null;
  description?: string;
}

export interface Organization {
  name: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Achievement {
  title: string;
  description: string;
  year: number;
  icon?: string;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: "Familiar" | "Proficient" | "Expert";
  yearsUsed?: number;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  description?: string;
}

export type BugSeverity = "critical" | "high" | "medium" | "low";

export interface BugHuntingEntry {
  id: string;
  title: string;
  platform: string;
  severity: BugSeverity;
  date: string;
  description: string;
  tags: string[];
  bounty?: string;
  cveId?: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ProfileData {
  personal: {
    name: string;
    title: string;
    roles: string[];
    location: string;
    bio: string;
    shortBio: string;
    avatarUrl?: string;
    resumeUrl: string;
    socialLinks: SocialLink[];
    startYear: number;
  };
  stats: Stat[];
  education: Education[];
  organizations: Organization[];
  achievements: Achievement[];
  skillCategories: SkillCategory[];
  projects: Project[];
  certificates: Certificate[];
  bugHunting: BugHuntingEntry[];
  workExperience: WorkExperience[];
}

// =============================================================================
// PROFILE DATA
// =============================================================================

export const profile: ProfileData = {
  personal: {
    name: "Muhammad Reyhan",
    title: "Cybersecurity Enthusiast",
    roles: [
      "Backend Developer",
      "Cloud & Infrastructure Management",
      "Bug Bounty Hunter",
      "Cybersecurity Enthusiast",
    ],
    location: "Pekanbaru, Riau",
    bio: "Self-taught high school graduate building a career in technology. I develop skills in programming, cloud computing, and cybersecurity bug bounty. Ready to contribute to dynamic teams and real projects. My journey combines hands-on learning with practical application, focusing on web development, security research, and AI integration.",
    shortBio: "Self-taught developer building a career in tech. Bug bounty hunter by passion.",
    resumeUrl: "/resume",
    startYear: 2022,
    socialLinks: [
      {
        platform: "github",
        url: "https://github.com/Gioxaa",
        label: "GitHub",
      },
      {
        platform: "email",
        url: "freyrey222@gmail.com",
        label: "Email",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/muhammad-reyhan-gx/",
        label: "LinkedIn",
      },
    ],
  },

  stats: [
    { value: 10, label: "Projects Shipped", suffix: "+" },
    { value: 3, label: "Years Experience", suffix: "+" },
    { value: 5, label: "Certifications", suffix: "+" },
  ],

  education: [
    {
      institution: "SMA Negeri 2 Rambah Hilir",
      degree: "High School Graduate",
      field: "Science",
      startYear: 2022,
      endYear: 2025,
      description: "Self-taught programming and cybersecurity alongside formal education.",
    },
    {
      institution: "Universitas Riau",
      degree: "Undergraduate Student Bachelor",
      field: "Informatics",
      startYear: 2025,
      endYear: null,
      description: "Currently pursuing a degree in Informatics, focusing on software engineering and artificial intelligence.",
    }
  ],

  organizations: [
    {
      name: "OSIS SMA Negeri 2 Rambah Hilir",
      role: "Secretary",
      startDate: "2023-10",
      endDate: "2024-11",
      description: "Managing organizational documentation and coordinating student activities.",
    },
    {
      name: "Computer Journalism Club",
      role: "Head of Computer Journalism",
      startDate: "2022-10",
      endDate: "2024-11",
      description: "Leading the club in creating digital content and covering school events.",
    },
    {
      name: "SMANung Intelligence Team",
      role: "Member",
      startDate: "2022-10",
      endDate: "2023-11",
      description: "Participating in academic competitions and knowledge-sharing activities.",
    },
  ],

  achievements: [
    {
      title: "3rd Place in Journalism Competition",
      description: "Rokan Hulu Regency Level",
      year: 2023,
    },
    {
      title: "3rd Place in Short Film Competition",
      description: "Rokan Hulu Regency Level",
      year: 2024,
    },
    {
      title: "3rd Place in OSN Informatics",
      description: "Rokan Hulu Regency Level - National Science Olympiad",
      year: 2024,
    },
    {
      title: "Finalist in Indonesian Debate Competition",
      description: "Riau Provincial Level",
      year: 2024,
    },
  ],

  skillCategories: [
    {
      name: "Programming",
      description: "Web development technologies and tools for building modern applications",
      skills: [
        { name: "HTML5", level: "Expert", yearsUsed: 3 },
        { name: "CSS3", level: "Expert", yearsUsed: 3 },
        { name: "JavaScript", level: "Proficient", yearsUsed: 2 },
        { name: "React", level: "Proficient", yearsUsed: 2 },
        { name: "Node.js", level: "Proficient", yearsUsed: 2 },
        { name: "Python", level: "Proficient", yearsUsed: 2 },
        { name: "MySQL", level: "Familiar", yearsUsed: 1 },
        { name: "Git", level: "Proficient", yearsUsed: 2 },
      ],
    },
    {
      name: "Cybersecurity",
      description: "Web application security testing and vulnerability research",
      skills: [
        { name: "SQL Injection", level: "Proficient", yearsUsed: 2 },
        { name: "XSS Attacks", level: "Proficient", yearsUsed: 2 },
        { name: "IDOR", level: "Proficient", yearsUsed: 2 },
        { name: "SSRF", level: "Familiar", yearsUsed: 1 },
        { name: "CSRF Token Reuse", level: "Familiar", yearsUsed: 1 },
        { name: "File Upload Bypass", level: "Familiar", yearsUsed: 1 },
        { name: "Vulnerability Assessment", level: "Proficient", yearsUsed: 2 },
        { name: "Security Headers", level: "Familiar", yearsUsed: 1 },
      ],
    },
    {
      name: "Microsoft Office & Editing",
      description: "Document creation, data analysis, and creative editing",
      skills: [
        { name: "Microsoft Word", level: "Expert", yearsUsed: 4 },
        { name: "Microsoft Excel", level: "Proficient", yearsUsed: 3 },
        { name: "Microsoft PowerPoint", level: "Expert", yearsUsed: 4 },
        { name: "Canva", level: "Proficient", yearsUsed: 2 },
        { name: "Photoshop", level: "Familiar", yearsUsed: 1 },
        { name: "Figma", level: "Familiar", yearsUsed: 1 },
        { name: "Notion", level: "Familiar", yearsUsed: 2 },
      ],
    },
    {
      name: "Cloud & Infrastructure",
      description: "Cloud computing platforms and infrastructure management",
      skills: [
        { name: "AWS", level: "Familiar", yearsUsed: 1 },
        { name: "Google Cloud", level: "Familiar", yearsUsed: 1 },
        { name: "Docker", level: "Familiar", yearsUsed: 1 },
        { name: "Digital Ocean", level: "Proficient", yearsUsed: 2 },
        { name: "Azure", level: "Familiar", yearsUsed: 1 },
        { name: "Kubernetes", level: "Familiar", yearsUsed: 1 },
        { name: "Linux", level: "Proficient", yearsUsed: 2 },
        { name: "Nginx", level: "Familiar", yearsUsed: 1 },
        { name: "Apache", level: "Familiar", yearsUsed: 1 },
        { name: "Cloudflare", level: "Familiar", yearsUsed: 1 },
        { name: "Vercel", level: "Familiar", yearsUsed: 1 },
        { name: "Netlify", level: "Familiar", yearsUsed: 1 },
        { name: "Firebase", level: "Familiar", yearsUsed: 1 },
      ],
    }
  ],

  projects: [
    {
      slug: "raso-minang-website",
      title: "Raso Minang Website",
      description: "Full-stack restaurant web application for Padang cuisine. Built with Next.js App Router, Radix UI, and Framer Motion. Features menu system, gallery, reservations, and WCAG 2.1 accessibility compliance.",
      tags: ["Next.js", "TypeScript", "Radix UI", "Framer Motion"],
      featured: true,
      year: 2026,
      githubUrl: "https://github.com/Gioxaa/raso-minang-website",
    },
    {
      slug: "discord-selfbot-scheduler",
      title: "Discord SelfBot MessageScheduler",
      description: "A self-bot for Discord that automatically sends scheduled messages to specified channels with random delays. Supports multi-account management and webhook logging.",
      tags: ["TypeScript", "discord.js-selfbot-v13", "Automation"],
      featured: true,
      year: 2026,
      githubUrl: "https://github.com/Gioxaa/Discord-SelfBot-MessageScheduler",
    },
    {
      slug: "warranty-stock-bot",
      title: "Warranty & Stock Bot Discord",
      description: "Discord bot for customer support tasks including warranty claims, stock management, and providing information about payment methods and premium app terms.",
      tags: ["Python", "discord.py", "Bot"],
      featured: true,
      year: 2024,
      githubUrl: "https://github.com/Gioxaa/WarrantyAndStockBot-Discord",
    },
    {
      slug: "portfolio-v2",
      title: "Portfolio Website",
      description: "Portfolio v2 built with Next.js App Router, Radix UI, and Framer Motion. Features dark/light theme, accessibility compliance, and WCAG 2.1 accessibility compliance.",
      tags: ["Next.js", "TypeScript", "Radix UI", "Framer Motion", "Tailwind CSS"],
      featured: true,
      year: 2026,
      githubUrl: "https://github.com/Gioxaa/portfolio-v2.git",
    },
    {
      slug: "growtopia-checker",
      title: "Growtopia Online Checker",
      description: "Python script to monitor online players in Growtopia and send notifications to Discord via webhook. Useful for server uptime monitoring.",
      tags: ["Python", "Webhooks", "Automation"],
      featured: false,
      year: 2025,
      githubUrl: "https://github.com/Gioxaa/growtopia-online-checker-webhook",
    },
    {
      slug: "discordbot-community-v2",
      title: "Discord Community Bot v2",
      description: "A modular Discord bot for community servers, featuring command handling, event management, and utility functions. Built for easy customization.",
      tags: ["JavaScript", "discord.js", "Bot"],
      featured: false,
      year: 2025,
      githubUrl: "https://github.com/Gioxaa/discordbot-community-v2",
    },
    {
      slug: "keygen-roblox",
      title: "Roblox Keygen",
      description: "Key generation system for Roblox applications with TypeScript backend.",
      tags: ["TypeScript", "Roblox", "API"],
      featured: false,
      year: 2025,
      githubUrl: "https://github.com/Gioxaa/keygen_roblox",
    },

  ],

  certificates: [
    {
      id: "journalism-2023",
      title: "3rd Place in Journalism Competition",
      issuer: "PUSPRESNAS",
      date: "2023-05",
      description: "3rd place in the Journalism Competition at Rokan Hulu Regency level.",
    },
    {
      id: "shortfilm-2024",
      title: "3rd Place in Short Film Competition",
      issuer: "PUSPRESNAS",
      date: "2024-05",
      description: "3rd place in the Short Film Competition at Rokan Hulu Regency level.",
    },
    {
      id: "osn-informatics-2024",
      title: "3rd Place in OSN Informatics",
      issuer: "PUSPRESNAS",
      date: "2024-05",
      description: "3rd place in the National Science Olympiad (Informatics) at Rokan Hulu Regency level.",
    },
    {
      id: "debate-2024",
      title: "Finalist in Indonesian Debate Competition",
      issuer: "PUSPRESNAS",
      date: "2024-09",
      description: "Finalist in the Indonesian Debate Competition at Riau Provincial level.",
    },
    {
      id: "siber-corner-2023",
      title: "Zero to Hero Security Engineer",
      issuer: "Siber Corner",
      date: "2023-10",
      description: "Comprehensive training on the basics of cyber security and Security Engineering techniques.",
    },
    {
      id: "big-geospatial-2023",
      title: "Geospatial Competition",
      issuer: "Badan Informasi Geospasial (BIG)",
      date: "2023-10",
      description: "National Geospatial Competition for high school students. Participated in mapping exercises, GIS, and spatial data analysis.",
    },
  ],

  bugHunting: [
    {
      id: "bug-bounty-2025",
      title: "DPRD Prov Riau",
      platform: "DPRD Prov Riau",
      severity: "medium",
      date: "2025-05",
      description: "XML-RPC Vulnerability, user enumeration, and other security vulnerabilities. Access to wp-cron.php, server banner, and other information.",
      tags: ["bug bounty", "security", "vulnerability research"],
    },
  ],

  workExperience: [],
};

// =============================================================================
// COMPUTED VALUES
// =============================================================================

/**
 * Calculate years of experience from profile start year
 */
export function getYearsExperience(): number {
  return new Date().getFullYear() - profile.personal.startYear;
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): Project[] {
  return profile.projects.filter((p) => p.featured);
}

/**
 * Get section IDs for navigation
 */
export const sectionIds = [
  "home",
  "about",
  "skills",
  "projects",
  "certificates",
  "security",
  "resume",
] as const;

export type SectionId = typeof sectionIds[number];

/**
 * Navigation items
 */
export const navItems: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Works & Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "security", label: "Bug Hunting" },
  { id: "resume", label: "Resume" },
];
