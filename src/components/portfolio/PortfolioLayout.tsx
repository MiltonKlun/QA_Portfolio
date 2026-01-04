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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 border-b backdrop-blur-md ${
          isUntested
            ? "bg-danger/10 border-danger/30"
            : "bg-success/10 border-success/30"
        }`}
      >
        <div className="container flex items-center justify-between h-14 px-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Lobby
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            {isUntested ? (
              <>
                <Bug className="w-5 h-5 text-danger" />
                <span className="text-sm font-medium text-danger">
                  ⚠️ UNTESTED MODE ACTIVE
                </span>
                <span className="hidden sm:inline px-2 py-1 rounded-full bg-danger/20 text-danger text-xs font-bold">
                  Known Critical Bugs: 3/3
                </span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-success">
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

      {/* Content */}
      <main>{children}</main>
    </div>
  );
};

export default PortfolioLayout;
