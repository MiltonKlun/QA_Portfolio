import { ReactNode, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bug, ShieldCheck, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import SidebarNav from "./SidebarNav";

interface PortfolioLayoutProps {
  children: ReactNode;
  variant: "untested" | "tested";
}

const PortfolioLayout = ({ children, variant }: PortfolioLayoutProps) => {
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
    const sections = ["about", "experience", "projects"];
    
    const handleScroll = () => {
      // Don't update if we're programmatically scrolling
      if (isScrollingRef.current) return;
      
      const headerOffset = 120;
      let currentSection = "about";
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If top of section is at or above the detection line, it's the current section
          if (rect.top <= headerOffset) {
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Immediately set active section on click
      setActiveSection(sectionId);
      isScrollingRef.current = true;
      
      const headerOffset = 96; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
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

  return (
    <div ref={containerRef} className="min-h-screen relative">
      {/* Mouse spotlight effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 lg:block hidden"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, ${
            isUntested 
              ? "rgba(239, 68, 68, 0.07)" 
              : "rgba(34, 197, 94, 0.07)"
          }, transparent 80%)`,
        }}
      />
      {/* Status Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${
          isUntested
            ? "bg-danger/10 border-danger/30"
            : "bg-success/10 border-success/30"
        }`}
      >
        <div className="container flex items-center justify-between min-h-12 py-2 px-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-xs">
              <ArrowLeft className="w-3 h-3" />
              <span className="hidden sm:inline">Back to Lobby</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            {isUntested ? (
              <>
                <Bug className="w-4 h-4 text-danger" />
                <span className="text-xs font-medium text-danger">
                  ⚠️ UNTESTED
                </span>
                <span className="hidden md:inline px-2 py-0.5 rounded-full bg-danger/20 text-danger text-xs font-bold">
                  Known Critical Bugs: 3/3
                </span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-success" />
                <span className="text-xs font-medium text-success">
                  ✅ QA VERIFIED
                </span>
                <span className="hidden md:inline px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-bold">
                  All Tests Passing
                </span>
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
      <div className="pt-12 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-4">
            {/* Left Sidebar - Sticky on desktop */}
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
              <SidebarNav
                variant={variant}
                activeSection={activeSection}
                onNavigate={scrollToSection}
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
    </div>
  );
};

export default PortfolioLayout;
