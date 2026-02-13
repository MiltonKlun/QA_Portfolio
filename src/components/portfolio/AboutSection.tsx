import { motion } from "framer-motion";
import QAVerifiedBadge from "@/components/QAVerifiedBadge";
import { CheckCircle } from "lucide-react";
import BugHint from "@/components/BugHint";

interface AboutSectionProps {
  variant: "untested" | "tested";
  onBugClick?: () => void;
  showHint?: boolean;
  showChecks?: boolean;
}

const AboutSection = ({ variant, onBugClick, showHint, showChecks }: AboutSectionProps) => {
  const isUntested = variant === "untested";
  const isTested = variant === "tested";

  return (
    <section id="about" className="scroll-mt-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group"
      >
        {/* Mobile section title */}
        <h2 className="lg:hidden text-sm font-bold uppercase tracking-widest text-foreground mb-6 flex items-center justify-between group/mobile">
          About Me
          {isTested && (
            <button
              onClick={onBugClick}
              className={`w-5 h-5 rounded-full bg-success/20 border border-success/40 flex items-center justify-center hover:bg-success/30 transition-all duration-300 ${showChecks ? "opacity-100" : "opacity-0 group-hover/mobile:opacity-100"
                }`}
              title="Responsive text verified"
            >
              <CheckCircle className="w-3 h-3 text-success" />
            </button>
          )}
          {isUntested && (
            <div
              className="relative w-5 h-5 flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onBugClick?.();
              }}
            >
              <BugHint visible={!!showHint} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}
        </h2>

        {/* Desktop verified tick */}
        {isTested && (
          <button
            onClick={onBugClick}
            className={`hidden lg:flex absolute top-1 -right-8 w-5 h-5 rounded-full bg-success/20 border border-success/40 items-center justify-center hover:bg-success/30 transition-all duration-300 z-10 ${showChecks ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            title="Responsive text verified"
          >
            <CheckCircle className="w-3 h-3 text-success" />
          </button>
        )}

        <div
          className={`space-y-4 relative ${isUntested ? "cursor-pointer" : ""}`}
          onClick={isUntested ? onBugClick : undefined}
        >
          <div className="hidden lg:block">
            <BugHint visible={!!showHint} className="-left-8 top-2" />
          </div>
          {/* BUG: Responsive text issue for untested variant */}
          <p className={`leading-relaxed ${isUntested
            ? "text-muted-foreground text-[18px] sm:text-base leading-[1.2] tracking-[-0.5px] overflow-hidden whitespace-nowrap text-ellipsis sm:whitespace-normal sm:overflow-visible border-r-2 border-danger sm:border-none"
            : "text-lg text-muted-foreground"
            }`}>
            I'm a QA Automation Engineer passionate about crafting resilient digital experiences that blend thorough testing with user-focused quality assurance. I bring a quality-first mindset to software engineering, creating automated solutions that ensure stability in data-driven and regulated environments.
          </p>

          <p className={`leading-relaxed ${isUntested
            ? "text-[21px] sm:text-[22px] leading-relaxed text-muted-foreground/90"
            : "text-lg text-muted-foreground"
            }`}>
            My technical focus spans the full development lifecycle: from building scalable Playwright-based testing frameworks (POM) for e-commerce, to designing serverless chatbots and financial systems that centralize business data across multiple platforms.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Currently, I'm architecting an AI Testing framework that leverages custom-crafted skills, rules, and workflow pipelines to automate complex validation scenarios.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
