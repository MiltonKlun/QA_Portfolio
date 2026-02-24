import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle } from "lucide-react";
import BugHint from "@/components/BugHint";

interface ProjectsSectionProps {
  variant: "untested" | "tested";
  onBugClick?: (bugType: string) => void;
  showHint?: boolean;
  showChecks?: boolean;
  foundBugs?: Set<string>;
}


const projects = [
  {
    id: 1,
    title: "Test Automation Suite",
    description: "Test automation framework tailored for PG Original.",
    image: <img src="/pg_logo.webp" alt="PG Logo" width={64} height={64} loading="lazy" className="w-12 h-12 sm:w-16 sm:h-16 object-contain opacity-90 hover:opacity-100 transition-opacity" />,
    tags: ["Playwright", "Python", "POM"],
    status: "Completed",
    progress: 100,
    link: "https://github.com/MiltonKlun/PG_Original_POM"
  },
  {
    id: 2,
    title: "CSA Pharma Framework",
    description: "Compliance-focused testing framework for pharmaceutical systems (GAMP5).",
    image: "💊",
    tags: ["Compliance", "Validation", "GAMP5"],
    status: "In Progress",
    progress: 75,
    link: "https://github.com/MiltonKlun/CSA_Pharma_Framework"
  },
  {
    id: 3,
    title: "Pombot",
    description: "Serverless Telegram bot with sales, expenses, and stock management.",
    image: <img src="/pg_logo.webp" alt="PG Logo" width={64} height={64} loading="lazy" className="w-12 h-12 sm:w-16 sm:h-16 object-contain opacity-90 hover:opacity-100 transition-opacity" />,
    tags: ["AWS-Lambda", "CI/CD", "API"],
    status: "Completed",
    progress: 100,
    link: "https://github.com/MiltonKlun/Pombot_PG_Original"
  },
];

const ProjectsSection = ({ variant, onBugClick, showHint, showChecks, foundBugs }: ProjectsSectionProps) => {
  const isUntested = variant === "untested";
  const [isCorrupted, setIsCorrupted] = useState(false);

  useEffect(() => {
    if (isUntested) {
      const timer = setTimeout(() => {
        setIsCorrupted(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsCorrupted(false);
    }
  }, [isUntested]);

  return (
    <section id="experience" className="scroll-mt-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group"
      >
        {/* Mobile section title */}
        <h2 className="lg:hidden text-sm font-bold uppercase tracking-widest text-foreground mb-6 flex items-center justify-between group/mobile">
          Experience
          {!isUntested && (
            <button
              onClick={() => onBugClick?.("data")}
              className={`w-5 h-5 rounded-full bg-success/20 border border-success/40 flex items-center justify-center hover:bg-success/30 transition-all duration-300 ${showChecks ? "opacity-100" : "opacity-0 group-hover/mobile:opacity-100"
                }`}
              title="Project data verified"
            >
              <CheckCircle className="w-3 h-3 text-success" />
            </button>
          )}
        </h2>

        {/* Desktop verified tick */}
        {!isUntested && (
          <button
            onClick={() => onBugClick?.("data")}
            className={`hidden lg:flex absolute top-1 -right-8 w-5 h-5 rounded-full bg-success/20 border border-success/40 items-center justify-center hover:bg-success/30 transition-all duration-300 z-10 ${showChecks ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            title="Project data verified"
          >
            <CheckCircle className="w-3 h-3 text-success" />
          </button>
        )}

        {/* Experience List */}
        <div className="space-y-6">
          {projects.map((project, index) => {
            const isSecondCard = index === 1;
            const isBugInteracting = isUntested && isSecondCard;

            return (
              <motion.a
                key={project.id}
                href={isBugInteracting ? undefined : project.link}
                target="_blank"
                rel="noopener noreferrer"
                role={isBugInteracting ? "button" : "link"}
                tabIndex={0}
                aria-label={isBugInteracting ? "Trigger data corruption bug" : `Go to ${project.title} repository`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ opacity: { delay: index * 0.1 }, y: { delay: index * 0.1 } }}
                onClick={(e) => {
                  if (isBugInteracting) {
                    e.preventDefault();
                    onBugClick?.("data");
                  }
                }}
                onKeyDown={(e) => {
                  if (isBugInteracting && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onBugClick?.("data");
                  }
                }}
                className={`block group relative p-4 sm:p-6 rounded-lg transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary ${isBugInteracting
                  ? "hover:bg-card/80 cursor-pointer"
                  : "hover:bg-card/80 cursor-pointer hover:shadow-lg hover:scale-[1.01]"
                  }`}
              >

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Project Image */}
                  <div className="flex-shrink-0 w-full sm:w-32 h-20 sm:h-20 bg-muted rounded-lg flex items-center justify-center text-3xl">
                    {project.image}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="text-base font-semibold group-hover:text-primary">
                        {project.title}
                        <ExternalLink className="inline-block ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      {isUntested && isSecondCard && (
                        <div className="relative w-4 h-4 mt-1">
                          <BugHint
                            visible={!!showHint && (!foundBugs?.has("data") || !foundBugs?.has("functional"))}
                            className="left-0 top-0"
                          />
                        </div>
                      )}
                    </div>

                    <p className="text-muted-foreground text-sm mb-3">
                      {isUntested && index === 1 && isCorrupted ? (
                        <span className="text-danger font-mono font-bold animate-pulse">[object Object]</span>
                      ) : (
                        project.description
                      )}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>


                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
