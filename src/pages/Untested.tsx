import { useState } from "react";
import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import AboutSection from "@/components/portfolio/AboutSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import QAReportModal from "@/components/QAReportModal";

type BugType = "ui" | "functional" | "data";

const bugDetails: Record<
  BugType,
  {
    title: string;
    description: string;
    impact: string;
    severity: "critical" | "high" | "medium";
  }
> = {
  ui: {
    title: "Hero Section Layout Break on Mobile",
    description:
      "The main title text is absolutely positioned incorrectly, causing it to overlap with other elements and become nearly invisible on mobile viewports (< 768px).",
    impact:
      "Users on mobile devices cannot read the primary value proposition, leading to 40% higher bounce rates and lost conversion opportunities.",
    severity: "critical",
  },
  functional: {
    title: "Project Card Click Handler Not Bound",
    description:
      "The second project card has no onClick handler attached. The element appears interactive (cursor, hover states) but clicking does nothing.",
    impact:
      "Users cannot access project details, reducing portfolio engagement by 25% and making the candidate appear less credible.",
    severity: "critical",
  },
  data: {
    title: "Progress Value Returns NaN",
    description:
      "The progress percentage displays 'NaN%' due to an undefined variable being passed to the calculation function without proper null checking.",
    impact:
      "Displays unprofessional, broken UI to potential employers. Indicates lack of data validation and error handling practices.",
    severity: "high",
  },
};

const UntestedPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBug, setCurrentBug] = useState<BugType>("ui");

  const handleBugClick = (bugType: string) => {
    setCurrentBug(bugType as BugType);
    setModalOpen(true);
  };

  return (
    <PortfolioLayout variant="untested">
      <AboutSection variant="untested" onBugClick={() => handleBugClick("ui")} />
      <TechStackSection variant="untested" />
      <ProjectsSection variant="untested" onBugClick={handleBugClick} />

      <QAReportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        bugTitle={bugDetails[currentBug].title}
        bugDescription={bugDetails[currentBug].description}
        businessImpact={bugDetails[currentBug].impact}
        severity={bugDetails[currentBug].severity}
      />
    </PortfolioLayout>
  );
};

export default UntestedPage;
