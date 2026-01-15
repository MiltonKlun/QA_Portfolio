import { useState } from "react";
import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import AboutSection from "@/components/portfolio/AboutSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import QAVerifiedModal from "@/components/QAVerifiedModal";

type BugType = "navigation" | "social" | "techStack" | "data" | "responsive";

const fixedBugDetails: Record<
  BugType,
  {
    title: string;
    description: string;
    solution: string;
  }
> = {
  navigation: {
    title: "Navigation Scroll Handler Not Implemented",
    description:
      "Clicking on the sidebar navigation buttons (About, Experience, Projects) did not scroll to the corresponding section.",
    solution:
      "Implemented smooth scroll behavior with proper section targeting. Added scroll offset to account for fixed header and ensured all navigation links correctly reference their target sections.",
  },
  social: {
    title: "Social Media Links Return 404/Broken",
    description:
      "All social media contact links (Email, LinkedIn, GitHub) failed to open or redirected to error pages.",
    solution:
      "Fixed malformed URLs and validated all href attributes. Added proper mailto: protocol for email and ensured all external links open correctly in new tabs.",
  },
  techStack: {
    title: "Tech Stack Icons Missing - Null Reference Error",
    description:
      "Several technology icons failed to render due to missing image references with undefined tooltips.",
    solution:
      "Added proper image imports and null checks for all tech stack icons. Implemented fallback rendering and ensured all tooltip texts display correctly on hover.",
  },
  data: {
    title: "Progress Value Returns NaN",
    description:
      "The progress percentage displayed 'NaN%' due to undefined variable without proper null checking.",
    solution:
      "Added proper data validation and default values. Implemented null checking before calculations and ensured progress displays correct percentage values.",
  },
  responsive: {
    title: "Text Overflow on Mobile Viewport",
    description:
      "The About section text had incorrect CSS causing overflow on mobile devices.",
    solution:
      "Fixed responsive typography with proper breakpoint handling. Added correct text-wrap properties and ensured content is readable across all device sizes.",
  },
};

const TestedPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBug, setCurrentBug] = useState<BugType>("navigation");

  const handleVerifiedClick = (bugType: string) => {
    setCurrentBug(bugType as BugType);
    setModalOpen(true);
  };

  return (
    <PortfolioLayout variant="tested" onBugClick={handleVerifiedClick}>
      <AboutSection variant="tested" onBugClick={() => handleVerifiedClick("responsive")} />
      <TechStackSection variant="tested" onBugClick={() => handleVerifiedClick("techStack")} />
      <ProjectsSection variant="tested" onBugClick={handleVerifiedClick} />

      <QAVerifiedModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        bugTitle={fixedBugDetails[currentBug].title}
        bugDescription={fixedBugDetails[currentBug].description}
        solution={fixedBugDetails[currentBug].solution}
      />
    </PortfolioLayout>
  );
};

export default TestedPage;
