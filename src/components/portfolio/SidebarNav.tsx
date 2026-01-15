import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarNavProps {
  variant: "untested" | "tested";
  activeSection: string;
  onNavigate: (section: string) => void;
  onSocialClick?: (e: React.MouseEvent) => void;
}

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const SidebarNav = ({ variant, activeSection, onNavigate, onSocialClick }: SidebarNavProps) => {
  const isUntested = variant === "untested";

  return (
    <div className="flex flex-col h-full">
      {/* Header Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 lg:mb-12"
      >
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-2">
          <span className="text-foreground">Jane Doe</span>
        </h1>
        <h2 className="text-lg lg:text-xl font-semibold text-gradient mb-4">
          QA Engineer
        </h2>
        <p className="text-sm lg:text-base text-muted-foreground max-w-xs">
          I build reliable, bug-free digital experiences for the web.
        </p>
      </motion.div>

      {/* Navigation - Only visible on large screens */}
      <nav className="hidden lg:block mb-auto">
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
                className={`group flex items-center gap-4 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    activeSection === item.id
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
        className="mt-8 lg:mt-auto pt-8"
      >
        <div className="flex items-center gap-4">
          <a
            href="mailto:jane@example.com"
            onClick={onSocialClick}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 lg:w-6 lg:h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onSocialClick}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 lg:w-6 lg:h-6" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onSocialClick}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 lg:w-6 lg:h-6" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default SidebarNav;
