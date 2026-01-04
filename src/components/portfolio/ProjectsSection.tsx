import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import QAVerifiedBadge from "@/components/QAVerifiedBadge";

interface ProjectsSectionProps {
  variant: "untested" | "tested";
  onBugClick?: (bugType: string) => void;
}

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
    <section className="py-20 bg-card/50">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
            {!isUntested && (
              <span className="inline-flex ml-3 align-middle">
                <QAVerifiedBadge
                  testName="All project cards are interactive and display correct data"
                  testFile="ProjectGrid_Interaction.spec.ts"
                />
              </span>
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects where I've implemented comprehensive QA strategies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className={`group relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isUntested && isSecondCard
                    ? "cursor-not-allowed opacity-80 hover:opacity-80"
                    : "hover:border-primary/50 hover:shadow-glow cursor-pointer"
                }`}
              >
                {/* Project Image */}
                <div className="aspect-video bg-muted flex items-center justify-center text-6xl">
                  {project.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {!isUntested && (
                      <QAVerifiedBadge
                        testName={`Project card ${project.id} clickable and navigates correctly`}
                        testFile={`Project_Card_${project.id}.spec.ts`}
                      />
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Status - Shows bug in untested version */}
                  <div
                    className="flex items-center justify-between"
                    onClick={(e) => {
                      if (showDataBug) {
                        e.stopPropagation();
                        onBugClick?.("data");
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Progress:</span>
                      <span
                        className={`text-sm font-semibold ${
                          showDataBug ? "text-danger" : "text-foreground"
                        }`}
                      >
                        {showDataBug ? "NaN%" : `${project.progress}%`}
                      </span>
                      {showDataBug && (
                        <span className="text-xs text-danger">(undefined)</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={
                          isUntested && isSecondCard ? "pointer-events-none" : ""
                        }
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={
                          isUntested && isSecondCard ? "pointer-events-none" : ""
                        }
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Hover Arrow */}
                {!(isUntested && isSecondCard) && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
