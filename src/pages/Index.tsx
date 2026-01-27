import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ShieldCheck, Bug, CheckCircle } from "lucide-react";

import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <SEO title="Milton Klun | QA Automation Engineer" />
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-danger/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-success/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="text-foreground block">Welcome to my</span>
          <span className="text-gradient">QA Portfolio</span>
        </motion.h1>

        {/* Choice Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full"
        >
          {/* Untested Card */}
          <div className="group relative p-3 sm:p-8 rounded-2xl glass border border-danger/20 hover:border-danger/50 transition-all duration-300 hover:shadow-danger/20 hover:shadow-2xl h-full cursor-default">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--danger)/0.1)_0%,transparent_70%)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-2xl bg-danger/10 flex items-center justify-center mb-3 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Bug className="w-5 h-5 sm:w-8 sm:h-8 text-danger" />
              </div>

              <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
                <AlertTriangle className="w-3 h-3 sm:w-5 sm:h-5 text-danger" />
                <h2 className="text-lg sm:text-2xl font-bold text-danger">Untested Version</h2>
              </div>

              <p className="text-xs sm:text-base text-muted-foreground mb-4 sm:mb-8 flex-grow">
                Experience a product without QA intervention, when potential bugs slip through to production.
              </p>

              <Link to="/untested" className="w-full block">
                <Button variant="dangerOutline" size="lg" className="w-full text-sm sm:text-lg h-9 sm:h-11">
                  <AlertTriangle className="w-3 h-3 sm:w-5 sm:h-5 mr-2" />
                  Launch Untested
                </Button>
              </Link>
            </div>
          </div>

          {/* Tested Card */}
          <div className="group relative p-3 sm:p-8 rounded-2xl glass border border-success/20 hover:border-success/50 transition-all duration-300 hover:shadow-success/20 hover:shadow-2xl h-full cursor-default">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--success)/0.1)_0%,transparent_70%)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-2xl bg-success/10 flex items-center justify-center mb-3 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8 text-success" />
              </div>

              <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
                <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5 text-success" />
                <h2 className="text-lg sm:text-2xl font-bold text-success">Verified Version</h2>
              </div>

              <p className="text-xs sm:text-base text-muted-foreground mb-4 sm:mb-8 flex-grow">
                See the stable product after my quality assurance process.
                Every feature tested and verified.
              </p>

              <Link to="/tested" className="w-full block">
                <Button variant="successOutline" size="lg" className="w-full text-sm sm:text-lg h-9 sm:h-11">
                  <ShieldCheck className="w-3 h-3 sm:w-5 sm:h-5 mr-2" />
                  Launch Verified
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
