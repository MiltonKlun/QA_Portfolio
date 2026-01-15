import { motion } from "framer-motion";
import { ImageOff, CheckCircle } from "lucide-react";

// Import tech logos
import pythonLogo from "@/assets/tech-logos/python.svg";
import javaLogo from "@/assets/tech-logos/java.svg";
import seleniumLogo from "@/assets/tech-logos/selenium.svg";
import jmeterLogo from "@/assets/tech-logos/jmeter.svg";
import postmanLogo from "@/assets/tech-logos/postman.svg";
import playwrightLogo from "@/assets/tech-logos/playwright.svg";
import testrailLogo from "@/assets/tech-logos/testrail.png";
import xrayLogo from "@/assets/tech-logos/xray.png";
import appiumLogo from "@/assets/tech-logos/appium.png";
import dockerLogo from "@/assets/tech-logos/docker.svg";
import githubLogo from "@/assets/tech-logos/github.svg";
import linuxLogo from "@/assets/tech-logos/linux.svg";
import postgresqlLogo from "@/assets/tech-logos/postgresql.svg";
import mysqlLogo from "@/assets/tech-logos/mysql.svg";

interface TechStackSectionProps {
  variant: "untested" | "tested";
  onBugClick?: () => void;
}

interface TechItem {
  name: string;
  logo: string;
  isBroken?: boolean; // For untested variant
  wasFixed?: boolean; // For tested variant (items that were broken)
}

const getTechStack = (isUntested: boolean): Record<string, TechItem[]> => ({
  languages: [
    { name: "Python", logo: pythonLogo, isBroken: isUntested, wasFixed: !isUntested }, // Bug: broken
    { name: "Java", logo: javaLogo },
  ],
  qaAndTesting: [
    { name: "Selenium", logo: seleniumLogo, isBroken: isUntested, wasFixed: !isUntested }, // Bug: broken
    { name: "JMeter", logo: jmeterLogo },
    { name: "Postman", logo: postmanLogo },
    { name: "Playwright", logo: playwrightLogo, isBroken: isUntested, wasFixed: !isUntested }, // Bug: broken
    { name: "TestRail", logo: testrailLogo },
    { name: "Xray", logo: xrayLogo },
    { name: "Appium", logo: appiumLogo },
  ],
  toolsAndPlatforms: [
    { name: "Docker", logo: dockerLogo, isBroken: isUntested, wasFixed: !isUntested }, // Bug: broken
    { name: "GitHub", logo: githubLogo },
    { name: "Linux", logo: linuxLogo },
  ],
  databases: [
    { name: "PostgreSQL", logo: postgresqlLogo },
    { name: "MySQL", logo: mysqlLogo },
  ],
});

const TechStackSection = ({ variant, onBugClick }: TechStackSectionProps) => {
  const isUntested = variant === "untested";
  const isTested = variant === "tested";
  const techStack = getTechStack(isUntested);
  
  const categories = [
    { title: "Languages", items: techStack.languages },
    { title: "QA & Testing", items: techStack.qaAndTesting },
    { title: "Tools & Platforms", items: techStack.toolsAndPlatforms },
    { title: "Databases", items: techStack.databases },
  ];

  const handleItemClick = (item: TechItem) => {
    if (item.isBroken && onBugClick) {
      onBugClick();
    }
    if (item.wasFixed && isTested && onBugClick) {
      onBugClick();
    }
  };

  return (
    <section id="experience" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Mobile section title */}
        <h2 className="lg:hidden text-sm font-bold uppercase tracking-widest text-foreground mb-6 sticky top-0 bg-background/80 backdrop-blur-sm py-4 -mx-4 px-4">
          Experience
        </h2>

        <div className="flex flex-col gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handleItemClick(item)}
                    className={`group relative flex items-center justify-center w-12 h-12 rounded-lg bg-card border transition-all duration-200 p-2 ${
                      item.isBroken 
                        ? "border-danger/50 cursor-pointer hover:border-danger bg-danger/5" 
                        : item.wasFixed
                        ? "border-success/50 cursor-pointer hover:border-success bg-success/5"
                        : "border-border hover:border-primary/50 hover:scale-110"
                    }`}
                    title={item.isBroken ? "" : item.name}
                  >
                    {item.isBroken ? (
                      // BUG: Show broken image placeholder
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff className="w-6 h-6 text-danger/50" />
                      </div>
                    ) : (
                      <>
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                        {item.wasFixed && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-success-foreground" />
                          </div>
                        )}
                      </>
                    )}
                    {/* Tooltip - only show for non-broken items */}
                    {!item.isBroken && (
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-popover text-popover-foreground rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {item.name}
                      </span>
                    )}
                    {/* BUG tooltip for broken items - shows undefined */}
                    {item.isBroken && (
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-danger/20 text-danger border border-danger/30 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        undefined
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TechStackSection;
