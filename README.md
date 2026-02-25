# Muhammad Reyhan — Portfolio

<div align="center">

Personal portfolio website showcasing my projects, skills, and journey as a self-taught developer and cybersecurity enthusiast.

[![Live Demo](https://img.shields.io/badge/▶_Live_Demo-Visit_Site-2ea44f?style=for-the-badge)](https://portfolio-v2-mauve-kappa.vercel.app/)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-E91E63?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## Features

| Feature | Description |
|---------|-------------|
| **7 Content Sections** | Hero, About, Skills, Projects, Certificates, Bug Hunting, Resume |
| **Dark/Light Theme** | Automatic system detection with smooth toggle transition |
| **Print-Ready Resume** | Clean `/resume` page optimized for PDF export |
| **Smooth Animations** | Custom motion engine with proximity-reactive UI elements |
| **Fully Responsive** | Mobile-first design that looks great on all devices |
| **Accessible** | WCAG 2.1 compliant with keyboard navigation & ARIA labels |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion + Custom RAF Engine |
| Fonts | Geist Sans & Mono |
| Deployment | Vercel |

---

## Project Structure

```
portfolio-v2/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable UI components
│   ├── content/         # Profile data (profile.ts)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities & helpers
│   └── sections/        # Page sections
├── tests/               # E2E tests
└── README.md
```

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/Gioxaa/portfolio-v2.git
cd portfolio-v2

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

---

## Customization

All content is in one file: [`src/content/profile.ts`](./src/content/profile.ts)

```typescript
export const profile = {
  personal: {
    name: "Your Name",
    title: "Your Title",
    bio: "Your bio...",
    socialLinks: [...],
  },
  skills: [...],
  projects: [...],
  certificates: [...],
};
```

---

## Deployment

### Vercel (Recommended)

1. Fork this repository
2. Import to [Vercel](https://vercel.com/new)
3. Deploy

### Other Platforms

Build and deploy the `.next` folder to Netlify, Cloudflare Pages, or any static hosting.

---

## License

MIT License — feel free to use this as a template for your own portfolio.

---

<div align="center">

**[Muhammad Reyhan](https://github.com/Gioxaa)** · [Portfolio](https://portfolio-v2-mauve-kappa.vercel.app/) · [Email](mailto:freyrey222@gmail.com) · [LinkedIn](https://www.linkedin.com/in/muhammad-reyhan-gx/)

</div>
