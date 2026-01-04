import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";

const TestedPage = () => {
  return (
    <PortfolioLayout variant="tested">
      <HeroSection variant="tested" />
      <ProjectsSection variant="tested" />
    </PortfolioLayout>
  );
};

export default TestedPage;
