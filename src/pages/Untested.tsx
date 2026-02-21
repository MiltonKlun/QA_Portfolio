import { useState } from "react";
import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import AboutSection from "@/components/portfolio/AboutSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import QAReportModal from "@/components/QAReportModal";
import CompletionModal from "@/components/CompletionModal";
import SEO from "@/components/SEO";
import { AriaLiveRegion } from "@/components/AriaLiveRegion";

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
      "Check network tab for 404 errors on image requests"
    ]
  },
  data: {
    title: "[object Object] Cast Exception",
    description:
      "A JavaScript object is being directly rendered into the DOM without proper stringification or data extraction, resulting in the '[object Object]' string literal.",
    impact:
      "Data Corruption. Project details are unreadable, undermining the candidate's claims of technical competence.",
    severity: "high",
    reproductionSteps: [
      "Scroll to the 'Experience' section",
      "Locate the 'Healthcare App' project card",
      "Wait 2 seconds or observe the description text",
      "Verify the description renders as '[object Object]'"
    ]
  },
  responsive: {
    title: "CSS Rule Violation: Text Overflow",
    description:
      "Missing 'word-wrap' or 'overflow: hidden' CSS properties on the container element cause long text strings to break out of their bounds on smaller viewports.",
    impact:
      "Visual Breakage. The UI becomes horizontally scrollable (breaking mobile layout) and text overlaps adjacent elements, creating an unpolished appearance.",
    severity: "medium",
    reproductionSteps: [
      "Navigate to the 'About Me' section",
      "Resize browser window or use mobile view",
      "Observe the 'Test Automation Expert' text overflowing the right boundary of the card"
    ]
  }
};

const Untested = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [completionModalOpen, setCompletionModalOpen] = useState(false);
  const [currentBug, setCurrentBug] = useState<BugType>("name");
  const [hasShownCompletion, setHasShownCompletion] = useState(false);
  const [foundBugs, setFoundBugs] = useState<Set<string>>(new Set());
  const [showHints, setShowHints] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleBugClick = (bugType: string) => {
    setCurrentBug(bugType as BugType);
    setModalOpen(true);
    setAnnouncement(`Bug found: ${bugDetails[bugType as BugType].title}. Report modal opened.`);

    if (!foundBugs.has(bugType)) {
      setFoundBugs((prev) => {
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

  const isBugFound = (bugType: string) => foundBugs.has(bugType);

  return (
    <PortfolioLayout
      variant="untested"
      onBugClick={handleBugClick}
      bugCount={foundBugs.size}
      showHints={showHints}
      onToggleHints={() => setShowHints(!showHints)}
      foundBugs={foundBugs}
    >
      <SEO title="Milton Klun | QA Automation Engineer" />
      <AboutSection
        variant="untested"
        onBugClick={() => handleBugClick("responsive")}
        showHint={showHints && !isBugFound("responsive")}
      />
      <TechStackSection
        variant="untested"
        onBugClick={() => handleBugClick("techStack")}
        showHint={showHints && !isBugFound("techStack")}
      />
      <ProjectsSection
        variant="untested"
        onBugClick={handleBugClick}
        showHint={showHints}
        foundBugs={foundBugs}
      />

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
      
      <AriaLiveRegion message={announcement} />
    </PortfolioLayout>
  );
};

export default Untested;
