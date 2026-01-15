import { motion } from "framer-motion";
import QAVerifiedBadge from "@/components/QAVerifiedBadge";

interface AboutSectionProps {
  variant: "untested" | "tested";
  onBugClick?: () => void;
}

const AboutSection = ({ variant, onBugClick }: AboutSectionProps) => {
  const isUntested = variant === "untested";

  return (
    <section id="about" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Mobile section title */}
        <h2 className="lg:hidden text-sm font-bold uppercase tracking-widest text-foreground mb-6 sticky top-0 bg-background/80 backdrop-blur-sm py-4 -mx-4 px-4">
          About
        </h2>

        <div
          className={`space-y-4 ${isUntested ? "cursor-pointer" : ""}`}
          onClick={isUntested ? onBugClick : undefined}
        >
          {/* BUG: Responsive text issue for untested variant */}
          <p className={`leading-relaxed ${
            isUntested 
              ? "text-muted-foreground text-[18px] sm:text-base leading-[1.2] tracking-[-0.5px] overflow-hidden whitespace-nowrap text-ellipsis sm:whitespace-normal sm:overflow-visible border-r-2 border-danger sm:border-none" 
              : "text-muted-foreground"
          }`}>
            I'm a QA Engineer passionate about crafting reliable, bug-free digital experiences 
            that blend thorough testing with user-focused quality assurance. My favorite work 
            lies at the intersection of{" "}
            <span className="text-foreground font-medium">development and quality</span>, 
            ensuring that software not only works but works exceptionally well.
          </p>

          <p className={`leading-relaxed ${
            isUntested 
              ? "text-muted-foreground text-[17px] sm:text-base" 
              : "text-muted-foreground"
          }`}>
            Currently, I'm a Senior QA Engineer at{" "}
            <span className="text-foreground font-medium">TechCorp</span>, specializing in 
            test automation. I contribute to building and maintaining automated test suites 
            that ensure our platform meets the highest quality standards and delivers 
            exceptional user experiences.
          </p>

          <p className={`leading-relaxed ${
            isUntested 
              ? "text-muted-foreground" 
              : "text-muted-foreground"
          }`}>
            In the past, I've had the opportunity to test software across a variety of 
            settings — from{" "}
            <span className="text-foreground font-medium">fintech startups</span> and{" "}
            <span className="text-foreground font-medium">healthcare applications</span> to{" "}
            <span className="text-foreground font-medium">e-commerce platforms</span> and{" "}
            <span className="text-foreground font-medium">enterprise solutions</span>.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            In my spare time, I'm usually exploring new testing frameworks, contributing 
            to open-source QA tools, or diving deep into performance optimization techniques.
          </p>

          {/* Visual Bug Indicator for untested */}
          {isUntested && (
            <div className="mt-4 p-3 rounded-lg border border-danger/30 bg-danger/5">
              <p className="text-xs text-danger font-mono">
                ⚠️ CSS Error: text-overflow and responsive sizing misconfigured
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Click anywhere in this section to view bug report
              </p>
            </div>
          )}

          {!isUntested && (
            <div className="pt-2">
              <QAVerifiedBadge
                testName="About section content renders correctly"
                testFile="About_Content.spec.ts"
              />
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
