import { useState } from "react";
import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import AboutSection from "@/components/portfolio/AboutSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import QAVerifiedModal from "@/components/QAVerifiedModal";
import SEO from "@/components/SEO";
import { AriaLiveRegion } from "@/components/AriaLiveRegion";

type BugType = "name" | "social" | "techStack" | "data" | "responsive";

const fixedBugDetails: Record<
  BugType,
  {
    title: string;
    description: string;
    solution: string;
    testSnippet: string;
  }
> = {
  name: {
    title: "Missing Portfolio Owner Name - Null Reference",
    description:
      "The portfolio owner's name failed to render due to a null reference, showing '[Missing Name]' placeholder.",
    solution:
      "Fixed null reference by properly initializing the name variable with the correct value 'Milton Klun'. Added proper data validation to prevent null states.",
    testSnippet: `test('Fix #1: Owner Name should be present', async () => {
    await expect(testedPage.ownerName).toBeVisible();
    await expect(testedPage.ownerName).not.toContainText('[Missing Name]');
    await expect(testedPage.ownerName).toContainText('Milton Klun');
});`,
  },
  social: {
    title: "Social Media Links Return 404/Broken",
    description:
      "All social media contact links (Email, LinkedIn, GitHub) failed to open or redirected to error pages.",
    solution:
      "Fixed malformed URLs and validated all href attributes. Added proper mailto: protocol for email and ensured all external links open correctly in new tabs.",
    testSnippet: `test('Fix #2: Social Links should be valid', async () => {
    const links = testedPage.socialLinks;
    for (let i = 0; i < await links.count(); ++i) {
        const href = await links.nth(i).getAttribute('href');
        expect(href).toMatch(/^https:\\/\\//);
        expect(href).not.toContain('undefined');
    }
});`,
  },
  techStack: {
    title: "Tech Stack Icons Missing - Null Reference Error",
    description:
      "Several technology icons failed to render due to missing image references with undefined tooltips.",
    solution:
      "Added proper image imports and null checks for all tech stack icons. Implemented fallback rendering and ensured all tooltip texts display correctly on hover.",
    testSnippet: `test('Fix #3: Tech Stack images should be valid', async () => {
    const images = testedPage.techStackImages;
    for (let i = 0; i < await images.count(); ++i) {
        await expect(images.nth(i)).toBeVisible();
        const src = await images.nth(i).getAttribute('src');
        expect(src).not.toContain('undefined');
    }
});`,
  },
  data: {
    title: "Progress Value Returns NaN",
    description:
      "The progress percentage displayed 'NaN%' due to undefined variable without proper null checking.",
    solution:
      "Added proper data validation and default values. Implemented null checking before calculations and ensured progress displays correct percentage values.",
    testSnippet: `test('Fix #4: Progress Data should be a number', async () => {
    const text = await testedPage.progressValue.innerText();
    expect(text).not.toContain('NaN');
    expect(text).toMatch(/\\d+%/);
});`,
  },
  responsive: {
    title: "Text Overflow on Mobile Viewport",
    description:
      "The About section text had incorrect CSS causing overflow on mobile devices.",
    solution:
      "Fixed responsive typography with proper breakpoint handling. Added correct text-wrap properties and ensured content is readable across all device sizes.",
    testSnippet: `test('Fix #5: Viewport Verification', async ({ page }) => {
    // Verified via Mobile Chrome emulation
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('#about p')).toBeVisible();
    // No horizontal scrollbar check
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});`,
  },
};



const Tested = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBug, setCurrentBug] = useState<BugType>("name");
  const [showChecks, setShowChecks] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleVerifiedClick = (bugType: string) => {
    setCurrentBug(bugType as BugType);
    setModalOpen(true);
    setAnnouncement(`Verified fix details opened for: ${fixedBugDetails[bugType as BugType].title}`);
  };

  return (
    <PortfolioLayout
      variant="tested"
      onBugClick={handleVerifiedClick}
      showChecks={showChecks}
      onToggleChecks={() => setShowChecks(!showChecks)}
    >
      <SEO title="Milton Klun | QA Automation Engineer" />
      <AboutSection
        variant="tested"
        onBugClick={() => handleVerifiedClick("responsive")}
        showChecks={showChecks}
      />
      <TechStackSection
        variant="tested"
        onBugClick={() => handleVerifiedClick("techStack")}
        showChecks={showChecks}
      />
      <ProjectsSection
        variant="tested"
        onBugClick={handleVerifiedClick}
        showChecks={showChecks}
      />

      <QAVerifiedModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        bugTitle={fixedBugDetails[currentBug].title}
        bugDescription={fixedBugDetails[currentBug].description}
        solution={fixedBugDetails[currentBug].solution}
        testSnippet={fixedBugDetails[currentBug].testSnippet}
      />
      
      <AriaLiveRegion message={announcement} />
    </PortfolioLayout>
  );
};

export default Tested;
