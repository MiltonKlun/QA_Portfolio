import { ReactNode, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bug, ShieldCheck, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import SidebarNav from "./SidebarNav";
import MobileNav from "./MobileNav";
import ParticleGrid from "@/components/ParticleGrid";

interface PortfolioLayoutProps {
  children: ReactNode;
  variant: "untested" | "tested";
  onBugClick?: (bugType: string) => void;
  bugCount?: number;
  totalBugs?: number;
  showHints?: boolean;
  onToggleHints?: () => void;
  showChecks?: boolean;
  onToggleChecks?: () => void;
  foundBugs?: Set<string>;
}

const PortfolioLayout = ({
  children,
  variant,
  onBugClick,
  bugCount = 0,
  totalBugs = 5,
  showHints = false,
  onToggleHints,
  showChecks = false,
  onToggleChecks,
  foundBugs
}: PortfolioLayoutProps) => {
  const isUntested = variant === "untested";
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Track mouse position for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ["about", "skills", "experience"];

    let sectionOffsets: { id: string; top: number }[] = [];
    let pageHeight = 0;
    let viewportHeight = 0;

    const calculateOffsets = () => {
      sectionOffsets = sections.map((id) => {
        const element = document.getElementById(id);
        return { id, top: element ? element.offsetTop : 0 };
      });
      pageHeight = document.documentElement.scrollHeight;
      viewportHeight = window.innerHeight;
    };

    // Calculate initial offsets
    calculateOffsets();

    const handleScroll = () => {
      // Don't update if we're programmatically scrolling
      if (isScrollingRef.current) return;

      // Check if we're at the bottom of the page
      const isAtBottom = viewportHeight + window.scrollY >= pageHeight - 50;

      if (isAtBottom) {
        setActiveSection("experience");
        return;
      }

      const headerOffset = 120;
      let currentSection = "about";
      const scrollY = window.scrollY;

      for (const section of sectionOffsets) {
        // If current scroll position is past the section's top (minus header buffer)
        if (scrollY >= section.top - headerOffset) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    // Recalculate offsets on resize to maintain accuracy
    window.addEventListener("resize", calculateOffsets);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Set initial state
    handleScroll();

    return () => {
      window.removeEventListener("resize", calculateOffsets);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Immediately set active section on click
      setActiveSection(sectionId);
      isScrollingRef.current = true;

      const headerOffset = 96; // Account for fixed header
      const offsetPosition = element.offsetTop - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Re-enable observer after scroll completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  const handleNameClick = () => {
    if (onBugClick) {
      onBugClick("name");
    }
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    // BUG for untested: Social links don't work
    if (isUntested && onBugClick) {
      e.preventDefault();
      onBugClick("social");
    }
    // Verified for tested: Show success modal
    if (!isUntested && onBugClick) {
      e.preventDefault();
      onBugClick("social");
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative">
      {/* Particle Grid Background */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <ParticleGrid />
      </div>

      {/* Mouse spotlight effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 lg:block hidden"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, ${isUntested
            ? "rgba(239, 68, 68, 0.07)"
            : "rgba(34, 197, 94, 0.07)"
            }, transparent 80%)`,
        }}
      />
      {/* Status Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${isUntested
          ? "bg-danger/10 border-danger/30"
          : "bg-success/10 border-success/30"
          }`}
      >
        <div className="container flex items-center justify-between min-h-12 py-2 px-4">
          <Link to="/" aria-label="Back to Home">
            <Button variant="ghost" size="sm" className="gap-2 text-xs" aria-label="Back to Home">
              <ArrowLeft className="w-3 h-3" />
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            {isUntested ? (
              <>
                <Bug className="w-4 h-4 text-danger" />
                <span className="text-xs font-medium text-danger">
                  UNTESTED
                </span>
                <span className="px-2 py-0.5 rounded-full bg-danger/20 text-danger text-xs font-bold">
                  Bugs Found: {bugCount}/{totalBugs}
                </span>

                {/* Hints Toggle */}
                {onToggleHints && (
                  <button
                    onClick={onToggleHints}
                    className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${showHints
                      ? "bg-danger text-white border-danger"
                      : "bg-transparent text-danger/70 border-danger/30 hover:bg-danger/10"
                      }`}
                    title={showHints ? "Hide bug hints" : "Show bug hints"}
                  >
                    {showHints ? "HINTS ON" : "HINTS"}
                  </button>
                )}
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-success" />
                <span className="text-xs font-medium text-success">
                  VERIFIED
                </span>
                <span className="hidden md:inline px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-bold">
                  All Tests Passing
                </span>

                {/* Checks Toggle */}
                {onToggleChecks && (
                  <button
                    onClick={onToggleChecks}
                    className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${showChecks
                      ? "bg-success text-white border-success"
                      : "bg-transparent text-success/70 border-success/30 hover:bg-success/10"
                      }`}
                    title={showChecks ? "Hide verified checks" : "Show verified checks"}
                  >
                    {showChecks ? "CHECKS ON" : "CHECKS"}
                  </button>
                )}
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       bg-background/50 border border-border/20
                       text-muted-foreground/50 hover:text-muted-foreground/80
                       transition-all duration-300"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Main Layout */}
      <div className="pt-12 min-h-screen relative z-10 pb-20 lg:pb-0">
        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-4">
            {/* Left Sidebar - Sticky on desktop */}
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
              <SidebarNav
                variant={variant}
                activeSection={activeSection}
                onNavigate={scrollToSection}
                onSocialClick={handleSocialClick}
                onNameClick={handleNameClick}
                showHint={showHints}
                foundBugs={foundBugs}
                showChecks={showChecks}
              />
            </header>

            {/* Right Content - Scrollable */}
            <main className="pt-12 lg:w-1/2 lg:py-24">
              <div className="space-y-24 lg:space-y-36">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Stick to bottom on small screens */}
      <MobileNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
        variant={variant}
      />
    </div>
  );
};

export default PortfolioLayout;
