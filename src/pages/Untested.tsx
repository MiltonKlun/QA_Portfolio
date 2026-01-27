import { useState } from "react";
import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import AboutSection from "@/components/portfolio/AboutSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import QAReportModal from "@/components/QAReportModal";
import CompletionModal from "@/components/CompletionModal";
import SEO from "@/components/SEO";

type BugType = "name" | "social" | "techStack" | "data" | "responsive";

const bugDetails: Record<
  BugType,
  {
    title: string;
    description: string;
    impact: string;
    severity: "critical" | "high" | "medium";
    reproductionSteps: string[];
  }
> = {
  name: {
    title: "NullReferenceException: Portfolio Owner Name",
    description:
      "The 'ownerName' variable is uninitialized at runtime, causing a rendering failure in the Hero component. The fallback placeholder '[Missing Name]' is displayed instead of the expected string value.",
    impact:
      "Critical Identity Failure. Recruiters cannot associate the portfolio with a candidate, leading to a 100% drop-off rate in potential contact inquiries.",
    severity: "critical",
    reproductionSteps: [
      "Navigate to the Landing Page",
      "Observe the Hero section headline",
      "Verify that the name field displays '[Missing Name]'",
      "Check console for 'Uncaught TypeError: Cannot read properties of undefined (reading 'name')'"
    ]
  },
  social: {
    title: "Broken Link: Social Media Navigation",
    description:
      "Social media anchor tags contain malformed href attributes (e.g., 'http:///' or undefined schema). Clicking result in 404 errors or dead interactions.",
    impact:
      "Zero Conversion. Communication channels are severed, preventing stakeholders from accessing GitHub repositories or LinkedIn profiles.",
    severity: "critical",
    reproductionSteps: [
      "Click the 'Connect' button in the Sidebar",
      "Attempt to click the LinkedIn icon",
      "Observe that the browser incorrectly redirects to a 404 page or does not react",
      "Inspect the element to confirm invalid href attribute"
    ]
  },
  techStack: {
    title: "Resource Load Error: Tech Stack Icons",
    description:
      "Image assets for the technology grid fail to load due to incorrect relative paths. Tooltip event handlers also throw undefined errors on hover.",
    impact:
      "Skill Verification Block. Hiring managers cannot visually verify the candidate's technical proficiency.",
    severity: "high",
    reproductionSteps: [
      "Scroll to the 'Tech Stack' section",
      "Observe broken image icons",
      "Hover over any icon placeholder",
      "Note inability to read tooltips describing the technology"
    ]
  },
  data: {
    title: "Type Coercion Error: Object Object",
    description:
      "The system attempted to render a raw Javascript object directly into the JSX tree, resulting in '[object Object]' being displayed. This indicates a missing data transformation layer or incorrect API response handling.",
    impact:
      "Perceived Quality Degradation. UI appears broken and untrustworthy, suggesting a lack of basic data validation standards.",
    severity: "medium",
    reproductionSteps: [
      "Locate the 'Projects' section",
      "Check the 'Completion Status' progress bar",
      "Verify the label reads '[object Object]' instead of a integer value"
    ]
  },
  responsive: {
    title: "Layout Overflow: Mobile Viewport (CSS)",
    description:
      "Text content in the About section lacks 'word-wrap' or 'overflow-wrap' properties, causing horizontal overflow breakage on viewports widths < 375px.",
    impact:
      "Mobile Usability Violation. Content is unreadable on standard mobile devices, violating WCAG 1.4.10 (Reflow), leading to immediate user bounce.",
    severity: "high",
    reproductionSteps: [
      "Resize browser window to iPhone SE dimensions (375x667)",
      "Navigate to the About section",
      "Observe text extending beyond the viewport boundary",
      "Verify horizontal scrollbar appearance"
    ]
  },
};

const UntestedPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [completionModalOpen, setCompletionModalOpen] = useState(false);
  const [currentBug, setCurrentBug] = useState<BugType>("name");
  const [hasShownCompletion, setHasShownCompletion] = useState(false);
  const [foundBugs, setFoundBugs] = useState<Set<string>>(new Set());

  const handleBugClick = (bugType: string) => {
    // Only open modal if bugType exists in bugDetails
    if (bugType in bugDetails) {
      setCurrentBug(bugType as BugType);
      setModalOpen(true);

      // Add unique bug to found set
      setFoundBugs(prev => {
        const newSet = new Set(prev);
        newSet.add(bugType);
        return newSet;
      });
    }
  };

  const handleReportClose = () => {
    setModalOpen(false);
    // If all bugs are found (5), open completion modal ONLY if not shown before
    if (foundBugs.size === 5 && !hasShownCompletion) {
      setHasShownCompletion(true);
      setTimeout(() => setCompletionModalOpen(true), 300);
    }
  };

  return (
    <PortfolioLayout variant="untested" onBugClick={handleBugClick} bugCount={foundBugs.size}>
      <SEO title="Milton Klun | QA Automation Engineer" />
      <AboutSection variant="untested" onBugClick={() => handleBugClick("responsive")} />
      <TechStackSection variant="untested" onBugClick={() => handleBugClick("techStack")} />
      <ProjectsSection variant="untested" onBugClick={handleBugClick} />

      <QAReportModal
        isOpen={modalOpen}
        onClose={handleReportClose}
        bugTitle={bugDetails[currentBug].title}
        bugDescription={bugDetails[currentBug].description}
        businessImpact={bugDetails[currentBug].impact}
        severity={bugDetails[currentBug].severity}
      />

      <CompletionModal
        isOpen={completionModalOpen}
        onClose={() => setCompletionModalOpen(false)}
      />
    </PortfolioLayout>
  );
};

export default UntestedPage;
