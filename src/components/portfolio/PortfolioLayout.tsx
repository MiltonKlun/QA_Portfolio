import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bug, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioLayoutProps {
  children: ReactNode;
  variant: "untested" | "tested";
}

const PortfolioLayout = ({ children, variant }: PortfolioLayoutProps) => {
  const isUntested = variant === "untested";

  return (
    <div className="min-h-screen relative">
      {/* Status Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 py-4"
      >
        <div className="container flex flex-col items-center px-4">
          <Link to="/" className="absolute left-4 top-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Lobby
            </Button>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 text-center mt-10 sm:mt-0">
            {isUntested ? (
              <>
                <Bug className="w-5 h-5 text-danger" />
                <span className="text-sm font-medium text-danger">
                  ⚠️ UNTESTED MODE ACTIVE
                </span>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  Known Critical Bugs: 3/3
                </span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-success">
                  ✅ QA VERIFIED MODE
                </span>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  All Tests Passing
                </span>
              </>
            )}
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main>{children}</main>
    </div>
  );
};

export default PortfolioLayout;
