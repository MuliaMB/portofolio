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
  workExperience: WorkExperience[];
}

// =============================================================================
// PROFILE DATA
// =============================================================================

export const profile: ProfileData = {
  personal: {
    name: "Mulia Abubakar",
    title: "Web Developer",
    roles: [
      "Web Developer",
      "Cloud Infrastructure",
      "Freelancers",
    ],
    location: "Indonesia, Palembang",
    bio: "Self-taught high school graduate building a career in technology. I develop skills in programming, cloud computing, and cybersecurity bug bounty. Ready to contribute to dynamic teams and real projects. My journey combines hands-on learning with practical application, focusing on web development, security research, and AI integration.",
    shortBio: "Self-taught developer building a career in tech. Bug bounty hunter by passion.",
    resumeUrl: "/resume",
    startYear: 2022,
    socialLinks: [
      {
        platform: "github",
        url: "https://github.com/MuliaMB",
        label: "GitHub",
      },
      {
        platform: "email",
        url: "muliayoga8@gmail.com",
        label: "Email",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/yoga-mulia-abubakar/",
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
      institution: "SMA Negeri 14 Palembang",
      degree: "High School Graduate",
      field: "Social",
      startYear: 2019,
      endYear: 2021,
      description: "Self-taught programming and cybersecurity alongside formal education.",
    },
    {
      institution: "Politeknik Negeri Sriwijaya",
      degree: "Graduate Management Informatics",
      field: "D4",
      startYear: 2021,
      endYear: 2025,
      description: "Currently pursuing a degree in Informatics, focusing on software engineering and artificial intelligence.",
    }
  ],

  organizations: [
    {
      name: "Himpunan Mahasiswa Informatika Manajemen Informatika Politeknik Negeri Sriwijaya",
      role: "Head Social",
      startDate: "2022-02",
      endDate: "2024-01",
      description: "Managing organizational documentation and coordinating student activities.",
    },
    {
      name: "Badan Eksekutif Mahasiswa Politeknik Negeri Sriwijaya",
      role: "Head Of Student Welfare",
      startDate: "2024-03",
      endDate: "2025-02",
      description: "Leading the club in creating digital content and covering school events.",
    },
  ],

  achievements: [
    {
      title: "Bangkit Academy - Cloud Computing",
      description: "Learning cloud computing fundamentals, including cloud architecture, services, and deployment models and doing milestone projects.",
      year: 2024,
    },

    {
      title: "Juara GCP - Season 12",
      description: "Learning and mastering Google Cloud Platform Services as a student",
      year: 2026,
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
        { name: "Node.js", level: "Proficient", yearsUsed: 2 },
        { name: "React", level: "Proficient", yearsUsed: 2 },
        { name: "Next", level: "Proficient", yearsUsed: 2 },
        { name: "PHP", level: "Proficient", yearsUsed: 2 },
        { name: "Laravel", level: "Proficient", yearsUsed: 2 },
        { name: "Python", level: "Proficient", yearsUsed: 2 },
        { name: "MySQL", level: "Familiar", yearsUsed: 1 },
        { name: "Git", level: "Proficient", yearsUsed: 2 },
        { name: "Google Colab", level: "Proficient", yearsUsed: 2 },
      ],
    },
    {
      name: "Microsoft Office & Editing tools",
      description: "Document creation and data analysis",
      skills: [
        { name: "Microsoft Word", level: "Expert", yearsUsed: 4 },
        { name: "Microsoft Excel", level: "Proficient", yearsUsed: 3 },
        { name: "Microsoft PowerPoint", level: "Expert", yearsUsed: 4 },
        { name: "Figma", level: "Familiar", yearsUsed: 1 },
        { name: "Notion", level: "Familiar", yearsUsed: 2 },
        { name: "Draw.io", level: "Familiar", yearsUsed: 2 },
      ],
    },
    {
      name: "Cloud & Infrastructure",
      description: "Cloud computing platforms and infrastructure management",
      skills: [
        { name: "Google Cloud Platform", level: "Familiar", yearsUsed: 1 },
        { name: "Linux", level: "Proficient", yearsUsed: 2 },
        { name: "Vercel", level: "Familiar", yearsUsed: 1 },
      ],
    }
  ],

  projects: [
    {
      slug: "BAPER-Bank-Perencanaan",
      title: "BAPER - Bank Perencanaan",
      description: "Full-stack restaurant web application for Padang cuisine. Built with Next.js App Router, Radix UI, and Framer Motion. Features menu system, gallery, reservations, and WCAG 2.1 accessibility compliance.",
      tags: ["Laravel", "Tailwind CSS", "My SQL", "REST API", "Role-Based Access Control"],
      featured: true,
      year: 2025,
      githubUrl: "https://pln-baper.my.id/",
    },
    {
      slug: "Plus62-Internet-Service-Provider",
      title: "Plus62 Internet Service Provider",
      description: "A self-bot for Discord that automatically sends scheduled messages to specified channels with random delays. Supports multi-account management and webhook logging.",
      tags: ["Next JS", "Tailwind CSS", "Vercel"],
      featured: true,
      year: 2025,
      githubUrl: "https://plus62.net/",
    },
    {
      slug: "Learning-Ways-Digital",
      title: "Learning Ways Digital",
      description: "Discord bot for customer support tasks including warranty claims, stock management, and providing information about payment methods and premium app terms.",
      tags: ["Next JS", "Tailwind CSS", "Vercel"],
      featured: true,
      year: 2025,
      githubUrl: "https://lways-digital.vercel.app/",
    },
    {
      slug: "sikawan-kons",
      title: "Sikawan Kons",
      description: "Portfolio v2 built with Next.js App Router, Radix UI, and Framer Motion. Features dark/light theme, accessibility compliance, and WCAG 2.1 accessibility compliance.",
      tags: ["PHP", "Laravel", "MySQL", "Laravel Cloud"],
      featured: true,
      year: 2026,
      githubUrl: "sikawan-kons.laravel.cloud",
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
    // {
    //   id: "bug-bounty-2025",
    //   title: "DPRD Prov Riau",
    //   platform: "DPRD Prov Riau",
    //   severity: "medium",
    //   date: "2025-05",
    //   description: "XML-RPC Vulnerability, user enumeration, and other security vulnerabilities. Access to wp-cron.php, server banner, and other information.",
    //   tags: ["bug bounty", "security", "vulnerability research"],
    // },
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
