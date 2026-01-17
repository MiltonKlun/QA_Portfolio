import { motion } from "framer-motion";
import { ExternalLink, CheckCircle } from "lucide-react";
import QAVerifiedBadge from "@/components/QAVerifiedBadge";

interface ProjectsSectionProps {
  variant: "untested" | "tested";
  onBugClick?: (bugType: string) => void;
}

const isTested = (variant: string) => variant === "tested";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full test suite for a high-traffic e-commerce platform with 50K+ daily users.",
    image: "🛒",
    tags: ["Selenium", "Cypress", "API Testing"],
    status: "Completed",
    progress: 100,
  },
  {
    id: 2,
    title: "Healthcare App",
    description: "HIPAA-compliant mobile testing for a patient management system.",
    image: "🏥",
    tags: ["Appium", "Security Testing", "HIPAA"],
    status: "In Progress",
    progress: 75, // Will show as "undefined" in untested
  },
  {
    id: 3,
    title: "FinTech Dashboard",
    description: "Automated regression testing for a real-time financial analytics dashboard.",
    image: "📊",
    tags: ["Jest", "Playwright", "Performance"],
    status: "Completed",
    progress: 100,
  },
];

const ProjectsSection = ({ variant, onBugClick }: ProjectsSectionProps) => {
  const isUntested = variant === "untested";

  return (
    <section id="projects" className="scroll-mt-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Mobile section title */}
        <h2 className="lg:hidden text-sm font-bold uppercase tracking-widest text-foreground mb-6 sticky top-0 bg-background/80 backdrop-blur-sm py-4 -mx-4 px-4">
          Projects
        </h2>

        {/* Subtle verified tick for Projects section - positioned at top right */}
        {!isUntested && (
          <button
            onClick={() => onBugClick?.("data")}
            className="absolute -top-2 right-0 w-5 h-5 rounded-full bg-success/20 border border-success/40 flex items-center justify-center hover:bg-success/30 transition-colors z-10"
            title="Project data verified"
          >
            <CheckCircle className="w-3 h-3 text-success" />
          </button>
        )}

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project, index) => {
            const isSecondCard = index === 1;
            const showDataBug = isUntested && index === 1;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  if (isUntested && isSecondCard) {
                    onBugClick?.("functional");
                  } else if (isUntested && showDataBug) {
                    onBugClick?.("data");
                  }
                }}
                className={`group relative p-4 sm:p-6 rounded-lg transition-all duration-300 ${
                  isUntested && isSecondCard
                    ? "cursor-not-allowed opacity-80"
                    : "hover:bg-card/80 cursor-pointer"
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
                      <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                        <ExternalLink className="inline-block ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-sm mb-3">
                      {project.description}
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

                    {/* Progress - Shows bug in untested version */}
                    {showDataBug && (
                      <div
                        className="mt-3 flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBugClick?.("data");
                        }}
                      >
                        <span className="text-xs text-muted-foreground">Progress:</span>
                        <span className="text-sm font-semibold text-danger">NaN%</span>
                        <span className="text-xs text-danger">(undefined)</span>
                      </div>
                    )}
                    
                    {/* Shows fixed status in tested version for the second card */}
                    {isTested(variant) && index === 1 && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Progress:</span>
                        <span className="text-sm font-semibold text-foreground">{project.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
