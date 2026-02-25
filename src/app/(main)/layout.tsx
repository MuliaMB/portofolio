import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { DebugPanel } from "@/components/debug-panel";

/**
 * Main Layout - Used for pages that need navbar/footer
 * Route group (main) doesn't affect URL structure
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      <DebugPanel />
    </MotionProvider>
  );
}
