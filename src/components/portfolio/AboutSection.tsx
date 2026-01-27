import { motion } from "framer-motion";
import QAVerifiedBadge from "@/components/QAVerifiedBadge";
import { CheckCircle } from "lucide-react";

interface AboutSectionProps {
  variant: "untested" | "tested";
  onBugClick?: () => void;
}

const AboutSection = ({ variant, onBugClick }: AboutSectionProps) => {
  const isUntested = variant === "untested";
  const isTested = variant === "tested";

  return (
    <section id="about" className="scroll-mt-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Mobile section title */}
        <h2 className="lg:hidden text-sm font-bold uppercase tracking-widest text-foreground mb-6 sticky top-0 bg-background/80 backdrop-blur-sm py-4 -mx-4 px-4">
          About Me
        </h2>

        {/* Subtle verified tick for About section - positioned at top right */}
        {isTested && (
          <button
            onClick={onBugClick}
            className="absolute -top-2 right-0 md:-right-8 w-5 h-5 rounded-full bg-success/20 border border-success/40 flex items-center justify-center hover:bg-success/30 transition-colors z-10"
            title="Responsive text verified"
          >
            <CheckCircle className="w-3 h-3 text-success" />
          </button>
        )}

        <div
          className={`space-y-4 ${isUntested ? "cursor-pointer" : ""}`}
          onClick={isUntested ? onBugClick : undefined}
        >
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
