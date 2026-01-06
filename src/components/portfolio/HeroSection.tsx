import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import QAVerifiedBadge from "@/components/QAVerifiedBadge";

interface HeroSectionProps {
  variant: "untested" | "tested";
  onBugClick?: () => void;
}

const HeroSection = ({ variant, onBugClick }: HeroSectionProps) => {
  const isUntested = variant === "untested";

  return (
    <section className="relative py-12 sm:py-16 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05)_0%,transparent_50%)]" />

      <div className="container px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto lg:mx-0">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs sm:text-sm text-muted-foreground">San Francisco, CA</span>
            </div>

            {/* Title - Buggy version has wrong positioning on mobile */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 ${
                isUntested
                  ? "absolute md:relative left-0 md:left-auto top-0 md:top-auto transform translate-x-[-20%] md:translate-x-0 translate-y-[100px] md:translate-y-0 z-[-1] md:z-auto opacity-50 md:opacity-100"
                  : ""
              }`}
              onClick={isUntested ? onBugClick : undefined}
              style={isUntested ? { cursor: "pointer" } : {}}
            >
              <span className="text-foreground">Jane Doe</span>
              <br />
              <span className="text-gradient">QA Engineer</span>
              {!isUntested && (
                <span className="inline-flex ml-2 sm:ml-3 align-middle">
                  <QAVerifiedBadge
                    testName="Hero title renders correctly on all viewports"
                    testFile="Hero_Responsiveness.spec.ts"
                  />
                </span>
              )}
            </h1>

            <p className={`text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg ${isUntested ? "mt-32 md:mt-0" : ""}`}>
              Passionate about delivering bug-free experiences. 5+ years of experience
              in manual and automated testing, specializing in web and mobile applications.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
              <Button variant="default" size="default" className="gap-2 text-sm sm:text-base px-3 sm:px-4">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Contact Me</span>
              </Button>
              <Button variant="secondary" size="default" className="gap-2 text-sm sm:text-base px-3 sm:px-4">
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>LinkedIn</span>
              </Button>
              <Button variant="ghost" size="default" className="gap-2 text-sm sm:text-base px-3 sm:px-4">
                <Github className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>GitHub</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
