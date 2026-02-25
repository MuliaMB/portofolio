import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Reyhan | Self-taught Developer & Security Enthusiast",
  description:
    "Self-taught developer passionate about programming, cybersecurity, and prompt engineering. Building tools and exploring the intersection of AI and security.",
  keywords: [
    "self-taught developer",
    "security enthusiast",
    "prompt engineering",
    "cybersecurity",
    "portfolio",
    "indonesia",
  ],
  authors: [{ name: "Muhammad Reyhan" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Muhammad Reyhan | Self-taught Developer & Security Enthusiast",
    description:
      "Self-taught developer passionate about programming, cybersecurity, and prompt engineering.",
    siteName: "Muhammad Reyhan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Reyhan | Self-taught Developer & Security Enthusiast",
    description:
      "Self-taught developer passionate about programming, cybersecurity, and prompt engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Root Layout - Base HTML structure only
 * Navbar/Footer handled by (main) route group layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        {children}
        <NoiseOverlay />
      </body>
    </html>
  );
}
