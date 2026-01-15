import { useState } from "react";
import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import AboutSection from "@/components/portfolio/AboutSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import QAReportModal from "@/components/QAReportModal";

type BugType = "navigation" | "social" | "techStack" | "data" | "responsive";

const bugDetails: Record<
  BugType,
  {
    title: string;
    description: string;
    impact: string;
    severity: "critical" | "high" | "medium";
  }
> = {
  navigation: {
    title: "Navigation Scroll Handler Not Implemented",
    description:
      "Clicking on the sidebar navigation buttons (About, Experience, Projects) does not scroll to the corresponding section. The click handler is attached but the scrollToSection function fails silently.",
    impact:
      "Users cannot navigate the portfolio efficiently, leading to frustration and a 60% increase in page abandonment. Recruiters may skip this candidate entirely.",
    severity: "critical",
  },
  social: {
    title: "Social Media Links Return 404/Broken",
    description:
      "All social media contact links (Email, LinkedIn, GitHub) fail to open or redirect to error pages. The href attributes contain malformed URLs.",
    impact:
      "Potential employers and recruiters cannot contact the candidate. This results in 100% loss of networking opportunities and job offers.",
    severity: "critical",
  },
  techStack: {
    title: "Tech Stack Icons Missing - Null Reference Error",
    description:
      "Several technology icons fail to render due to missing image references. The tooltip text also returns undefined, showing blank tooltips on hover.",
    impact:
      "Recruiters cannot assess the candidate's technical skills. Without visibility into the tech stack, the candidate appears unqualified, losing 80% of interview opportunities.",
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
  responsive: {
    title: "Text Overflow on Mobile Viewport",
    description:
      "The About section text has incorrect CSS styling causing text to overflow its container on mobile devices. Font size is not responsive and text-wrap properties are misconfigured.",
    impact:
      "40% of users access portfolios from mobile devices. Broken layout makes the content unreadable, causing immediate bounce and lost opportunities.",
    severity: "critical",
  },
};

const UntestedPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBug, setCurrentBug] = useState<BugType>("navigation");

  const handleBugClick = (bugType: string) => {
    setCurrentBug(bugType as BugType);
    setModalOpen(true);
  };

  return (
    <PortfolioLayout variant="untested" onBugClick={handleBugClick}>
      <AboutSection variant="untested" onBugClick={() => handleBugClick("responsive")} />
      <TechStackSection variant="untested" onBugClick={() => handleBugClick("techStack")} />
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
