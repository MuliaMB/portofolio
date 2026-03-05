import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wormyy",
  description:
    "I am a passionate learner in web development and cloud computing, focused on building modern web applications and understanding scalable cloud infrastructure.",
  keywords: [
    "Web developer",
    "portfolio",
    "indonesia",
  ],
  authors: [{ name: "Yoga Mulia" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Wormyy",
    description:
      "a passionate learner in web development and cloud computing",
    siteName: "Wormy Portfolio",
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
