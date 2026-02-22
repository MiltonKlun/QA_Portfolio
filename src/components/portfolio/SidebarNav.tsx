import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Mail, Linkedin, Github, CheckCircle } from "lucide-react";
import BugHint from "@/components/BugHint";



interface SidebarNavProps {
  variant: "untested" | "tested";
  activeSection: string;
  onNavigate: (section: string) => void;
  onSocialClick?: (e: React.MouseEvent) => void;
  onNameClick?: () => void;
  showHint?: boolean;
  showChecks?: boolean;
  foundBugs?: Set<string>;
}

const navItems = [
  { id: "about", label: "About Me" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },

];

const SidebarNav = ({ variant, activeSection, onNavigate, onSocialClick, onNameClick, showHint, showChecks, foundBugs }: SidebarNavProps) => {
  const isUntested = variant === "untested";
  const [buggyName, setBuggyName] = useState("[Missing Name]");

  useEffect(() => {
    if (isUntested) {
      const glitches = ["null", "undefined", "NaN", "[Object]", "Error", "void"];
      // Start flickering
      const interval = setInterval(() => {
        setBuggyName(glitches[Math.floor(Math.random() * glitches.length)]);
      }, 100);

      // Stop after 1.5 seconds and settle on the bug
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setBuggyName("[Missing Name]");
      }, 1500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setBuggyName("Milton Klun");
    }
  }, [isUntested]);

  return (
    <div className="flex flex-col h-full">
      {/* Header Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 lg:mb-12"
      >
        <div className="flex items-center gap-3 lg:gap-5">
          {isUntested ? (
            <h1
              role="button"
              tabIndex={0}
              aria-label="Trigger corrupted name bug"
              className="text-4xl lg:text-5xl font-extrabold mb-2 cursor-pointer text-danger/50 italic relative inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              onClick={onNameClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onNameClick?.();
                }
              }}
              title="Click to see bug details"
            >
              <span className="opacity-40">{buggyName}</span>
              <BugHint visible={!!showHint && !foundBugs?.has("name")} className="-right-6 top-1/2 -translate-y-1/2" />
            </h1>
          ) : (
            <div className="group flex items-center gap-3">

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-2 flex items-center">
                <span className="text-foreground">Milton Klun</span>
              </h1>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onNameClick?.();
                }}
                className={`w-5 h-5 rounded-full bg-success/20 border border-success/40 flex items-center justify-center hover:bg-success/30 transition-all duration-300 mt-1 ${showChecks ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                title="Name display verified"
              >
                <CheckCircle className="w-3 h-3 text-success" />
              </button>
            </div>
          )}
        </div>
        <h2 className="text-lg lg:text-xl font-semibold text-gradient mb-2">
          QA Automation Engineer
        </h2>

      </motion.div>

      {/* Navigation - Only visible on large screens */}
      <nav className="hidden lg:block mb-auto relative">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <button
                onClick={() => onNavigate(item.id)}
                className={`group flex items-center gap-4 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeSection === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <span
                  className={`h-px transition-all duration-300 ${activeSection === item.id
                    ? "w-16 bg-foreground"
                    : "w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-foreground"
                    }`}
                />
                {item.label}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 lg:mt-auto pt-8 flex flex-col gap-6"
      >
        <div className="flex items-center gap-4 lg:gap-6 relative" data-testid="social-links-container">
          {isUntested ? (
            <>
              <a
                href="http:///"
                onClick={(e) => { e.preventDefault(); onSocialClick?.(e); }}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Mail className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
              <a
                href="http:///"
                onClick={(e) => { e.preventDefault(); onSocialClick?.(e); }}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="LinkedIn (bug)"
              >
                <Linkedin className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
              <a
                href="http:///"
                onClick={(e) => { e.preventDefault(); onSocialClick?.(e); }}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="GitHub (bug)"
              >
                <Github className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
              <div className="relative w-4 h-4 ml-2">
                <BugHint visible={!!showHint && !foundBugs?.has("social")} className="top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </>
          ) : (
            <div className="group flex items-center gap-6">
              <a
                href="mailto:miltonericklun@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/milton-klun/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
              <a
                href="https://github.com/MiltonKlun"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
              {/* Verified tick next to GitHub with same spacing */}
              <button
                onClick={(e) => onSocialClick?.(e)}
                className={`w-5 h-5 rounded-full bg-success/20 border border-success/40 flex items-center justify-center hover:bg-success/30 transition-all duration-300 ${showChecks ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                title="Social links verified"
              >
                <CheckCircle className="w-3 h-3 text-success" />
              </button>
            </div>
          )}
        </div>


      </motion.div>
    </div>
  );
};

export default SidebarNav;
