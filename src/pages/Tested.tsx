import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import AboutSection from "@/components/portfolio/AboutSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";

const TestedPage = () => {
  return (
    <PortfolioLayout variant="tested">
      <AboutSection variant="tested" />
      <TechStackSection variant="tested" />
      <ProjectsSection variant="tested" />
    </PortfolioLayout>
  );
};

export default TestedPage;
