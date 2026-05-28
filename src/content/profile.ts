/**
 * Profile Content
 * * All portfolio content is defined here with full TypeScript types.
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
  // PERBAIKAN: Tambahkan tipe bugHunting di sini
  bugHunting: BugHuntingEntry[];
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
    bio: "I am a passionate learner in web development and cloud computing, focused on building modern web applications and understanding scalable cloud infrastructure.",
    shortBio: "A learner in web development and cloud computing, focused on building scalable modern apps.",
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
        url: "mailto:muliayoga8@gmail.com",
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
    { value: 6, label: "Projects", suffix: "+" },
    { value: 2, label: "Years in Tech", suffix: "+" },
    { value: 2, label: "Tech Bootcamp", suffix: "+" },
  ],

  education: [
    {
      institution: "SMA Negeri 14 Palembang",
      degree: "High School Graduate",
      field: "Social",
      startYear: 2019,
      endYear: 2021,
    },
    {
      institution: "Politeknik Negeri Sriwijaya",
      degree: "Graduate Management Informatics",
      field: "D4",
      startYear: 2021,
      endYear: 2025,
    }
  ],

  organizations: [
    {
      name: "Himpunan Mahasiswa Informatika Manajemen Informatika Politeknik Negeri Sriwijaya",
      role: "Head Social",
      startDate: "2022-02",
      endDate: "2024-01",
      description: "Leading social initiatives and strategic partnerships to raise donations for scholarships and disaster victims, both on and off-campus.",
    },
    {
      name: "Badan Eksekutif Mahasiswa Politeknik Negeri Sriwijaya",
      role: "Head Of Student Welfare",
      startDate: "2024-03",
      endDate: "2025-02",
      description: "Leading the Student Welfare department to advocate for student aspirations, diversity, and mental well-being, while managing scholarship programs and ensuring a safe environment against misconduct.",
    },
  ],

  achievements: [
    {
      title: "Bangkit Academy - Cloud Computing",
      description: "Intensive cloud computing program by Google, focusing on GCP learn professional soft skills through a collaborative Capstone Project.",
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
        { name: "Node.js", level: "Proficient", yearsUsed: 2 },
        { name: "React", level: "Proficient", yearsUsed: 2 },
        { name: "Next", level: "Proficient", yearsUsed: 2 },
        { name: "Python", level: "Proficient", yearsUsed: 2 },
        { name: "MySQL", level: "Familiar", yearsUsed: 1 },
        { name: "Git", level: "Proficient", yearsUsed: 2 },
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
        { name: "Amazon Web Services", level: "Familiar", yearsUsed: 1 },
        { name: "Linux", level: "Proficient", yearsUsed: 2 },
        { name: "Vercel", level: "Familiar", yearsUsed: 1 },
        { name: "Railway", level: "Familiar", yearsUsed: 1 },
      ],
    }
  ],

  projects: [
    {
      slug: "BAPER-Bank-Perencanaan",
      title: "BAPER - Bank Perencanaan",
      description: "project management platform for PLN UP3 Indralaya that integrates planning requests with financial tracking. It allows users to submit proposals, manage budgets, and process documents in stages, all while being monitored in real-time by supervisors.",
      tags: ["Laravel", "Tailwind CSS", "My SQL", "REST API", "Role-Based Access Control"],
      featured: true,
      year: 2025,
      githubUrl: "https://pln-baper.my.id/",
    },
    {
      slug: "Plus62-Internet-Service-Provider",
      title: "Plus62 Internet Service Provider",
      description: "ESP +62 is a high-speed Internet Service Provider (ISP) dedicated to delivering reliable connectivity and seamless digital solutions for both residential and corporate needs.",
      tags: ["Next JS", "Tailwind CSS", "Vercel"],
      featured: true,
      year: 2025,
      githubUrl: "https://plus62.net/",
    },
    {
      slug: "Learning-Ways-Digital",
      title: "Learning Ways Digital",
      description: "Learning Ways is a tech startup and software house providing end-to-end digital solutions. We specialize in developing scalable web and mobile applications, creating impactful graphic designs, and building custom machine learning models to solve complex problems through intelligent automation.",
      tags: ["Next JS", "Tailwind CSS", "Vercel"],
      featured: true,
      year: 2025,
      githubUrl: "https://lways-digital.vercel.app/",
    },
    {
      slug: "sikawan-kons",
      title: "Sikawan Kons",
      description: "SIKAWAN KONS is a financial tracking application for PLN designed to automate corporate expenditure records, ensuring transparency and accuracy in managing company funds.",
      tags: ["PHP", "Laravel", "MySQL", "Laravel Cloud"],
      featured: true,
      year: 2026,
      githubUrl: "sikawan-kons.laravel.cloud",
    },
    {
      slug: "pln-prediction",
      title: "PLN Prediction",
      description: "PLN Prediction is a peak load forecasting system for power substations. It processes electrical data—including Voltage, Amperage, and Power—using a trained Artificial Neural Network (ANN) model. Developed as my final college thesis for graduation, this project utilizes real-world datasets sourced directly from PLN.",
      tags: ["PHP", "Laravel", "Artificial Neural Network", "Google Colab", "Python", "TensorFlow", "MySQL"],
      featured: true,
      year: 2026,
      githubUrl: "https://github.com/MuliaMB/pln.git",
    },
  ],

  // certificates: [],

  workExperience: [],
  
  // PERBAIKAN: Isi dengan array kosong (atau data bug bounty kamu yang di-comment)
  certificates: [],
  bugHunting: [], 
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
];