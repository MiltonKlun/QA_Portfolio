import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bug, ShieldCheck, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

interface PortfolioLayoutProps {
  children: ReactNode;
  variant: "untested" | "tested";
}

const PortfolioLayout = ({ children, variant }: PortfolioLayoutProps) => {
  const isUntested = variant === "untested";
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen relative">
      {/* Status Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`relative z-10 border-b backdrop-blur-md ${
          isUntested
            ? "bg-danger/10 border-danger/30"
            : "bg-success/10 border-success/30"
        }`}
      >
        <div className="container flex flex-col sm:flex-row items-center justify-center min-h-14 py-2 sm:py-0 px-4 relative gap-2 sm:gap-0">
          <Link to="/" className="sm:absolute sm:left-4 order-2 sm:order-1">
            <Button variant="ghost" size="sm" className="gap-2 text-xs sm:text-sm">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Back to Lobby</span>
              <span className="xs:hidden">Back</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2 flex-wrap justify-center">
            {isUntested ? (
              <>
                <Bug className="w-4 h-4 sm:w-5 sm:h-5 text-danger" />
                <span className="text-xs sm:text-sm font-medium text-danger">
                  ⚠️ UNTESTED MODE ACTIVE
                </span>
                <span className="hidden sm:inline px-2 py-1 rounded-full bg-danger/20 text-danger text-xs font-bold">
                  Known Critical Bugs: 3/3
                </span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                <span className="text-xs sm:text-sm font-medium text-success">
                  ✅ QA VERIFIED MODE
                </span>
                <span className="hidden sm:inline px-2 py-1 rounded-full bg-success/20 text-success text-xs font-bold">
                  All Tests Passing
                </span>
              </>
            )}
          </div>
        </div>
      </motion.header>

      {/* Theme Toggle - below banner */}
      <div className="absolute right-3 sm:right-6 top-[80px] sm:top-[72px] z-10">
        <button
          onClick={toggleTheme}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center
                     bg-background/50 border border-border/20
                     shadow-[inset_0_4px_12px_hsl(var(--foreground)/0.08),inset_0_-2px_6px_hsl(var(--background)/0.5)]
                     text-muted-foreground/50 hover:text-muted-foreground/80
                     transition-all duration-300 ease-out
                     hover:shadow-[inset_0_4px_16px_hsl(var(--foreground)/0.12),inset_0_-2px_8px_hsl(var(--background)/0.6)]
                     focus:outline-none"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300" />
          ) : (
            <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Content */}
      <main>{children}</main>
    </div>
  );
};

export default PortfolioLayout;
