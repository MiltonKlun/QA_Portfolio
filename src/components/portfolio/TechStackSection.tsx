import { motion } from "framer-motion";
import { ImageOff, CheckCircle } from "lucide-react";
import BugHint from "@/components/BugHint";

// Import tech logos
import pythonLogo from "@/assets/tech-logos/python.svg";
import javaLogo from "@/assets/tech-logos/java.svg";
import sqlLogo from "@/assets/tech-logos/sql.webp";
import playwrightLogo from "@/assets/tech-logos/playwright.svg";
import seleniumLogo from "@/assets/tech-logos/selenium.svg";
import pytestLogo from "@/assets/tech-logos/pytest.webp";
import cucumberLogo from "@/assets/tech-logos/cucumber.webp";
import appiumLogo from "@/assets/tech-logos/appium.webp";
import jmeterLogo from "@/assets/tech-logos/jmeter.svg";
import postmanLogo from "@/assets/tech-logos/postman.svg";
import jiraLogo from "@/assets/tech-logos/jira.webp";
import testrailLogo from "@/assets/tech-logos/testrail.webp";
import xrayLogo from "@/assets/tech-logos/xray.webp";
import awsLogo from "@/assets/tech-logos/aws.webp";
import gitLogo from "@/assets/tech-logos/git.webp";
import dockerLogo from "@/assets/tech-logos/docker.svg";
import jenkinsLogo from "@/assets/tech-logos/jenkins.webp";
import githubLogo from "@/assets/tech-logos/github.svg";
import postgresqlLogo from "@/assets/tech-logos/postgresql.svg";
import mongodbLogo from "@/assets/tech-logos/mongodb.webp";

interface TechStackSectionProps {
  variant: "untested" | "tested";
  onBugClick?: () => void;
  showHint?: boolean;
  showChecks?: boolean;
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
    { name: "SQL", logo: sqlLogo },
  ],
  automation: [
    { name: "Playwright", logo: playwrightLogo, isBroken: isUntested, wasFixed: !isUntested }, // Bug: broken
    { name: "Selenium", logo: seleniumLogo, isBroken: isUntested, wasFixed: !isUntested }, // Bug: broken
    { name: "Pytest", logo: pytestLogo },
    { name: "Cucumber", logo: cucumberLogo },
    { name: "Appium", logo: appiumLogo },
  ],
  qaManagement: [
    { name: "JMeter", logo: jmeterLogo },
    { name: "Postman", logo: postmanLogo },
    { name: "Jira", logo: jiraLogo },
    { name: "TestRail", logo: testrailLogo },
    { name: "Xray", logo: xrayLogo },
  ],
  infrastructure: [
    { name: "AWS", logo: awsLogo },
    { name: "Git", logo: gitLogo },
    { name: "Docker", logo: dockerLogo, isBroken: isUntested, wasFixed: !isUntested }, // Bug: broken
    { name: "Jenkins", logo: jenkinsLogo },
    { name: "GitHub Actions", logo: githubLogo },
  ],
  databases: [
    { name: "PostgreSQL", logo: postgresqlLogo },
    { name: "MongoDB", logo: mongodbLogo },
  ],
});

const TechStackSection = ({ variant, onBugClick, showHint, showChecks }: TechStackSectionProps) => {
  const isUntested = variant === "untested";
  const isTested = variant === "tested";
  const techStack = getTechStack(isUntested);

  const categories = [
    { title: "Languages", items: techStack.languages },
    { title: "Automation & Frameworks", items: techStack.automation },
    { title: "QA Management & Tools", items: techStack.qaManagement },
    { title: "Infrastructure & CI/CD", items: techStack.infrastructure },
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
    <section id="skills" className="scroll-mt-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group/section"
      >
        {/* Mobile section title */}
        <h2 className="lg:hidden text-sm font-bold uppercase tracking-widest text-foreground mb-6 flex items-center justify-between group/mobile">
          Skills
          {isTested && (
            <button
              onClick={onBugClick}
              className={`w-5 h-5 rounded-full bg-success/20 border border-success/40 flex items-center justify-center hover:bg-success/30 transition-all duration-300 ${showChecks ? "opacity-100" : "opacity-0 group-hover/mobile:opacity-100"
                }`}
              title="Tech stack icons verified"
            >
              <CheckCircle className="w-3 h-3 text-success" />
            </button>
          )}
        </h2>

        {/* Desktop verified tick */}
        {isTested && (
          <button
            onClick={onBugClick}
            className={`hidden lg:flex absolute top-1 -right-8 w-5 h-5 rounded-full bg-success/20 border border-success/40 items-center justify-center hover:bg-success/30 transition-all duration-300 z-10 ${showChecks ? "opacity-100" : "opacity-0 group-hover/section:opacity-100"
              }`}
            title="Tech stack icons verified"
          >
            <CheckCircle className="w-3 h-3 text-success" />
          </button>
        )}

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
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {category.title}
                </h3>
                {category.title === "Languages" && isUntested && (
                  <div className="relative w-3 h-3">
                    <BugHint visible={!!showHint} className="top-0 left-0" />
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => item.isBroken && onBugClick?.()}
                    onKeyDown={(e) => {
                      if (item.isBroken && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        onBugClick?.();
                      }
                    }}
                    tabIndex={item.isBroken ? 0 : -1}
                    aria-label={item.isBroken ? "Trigger broken image bug" : item.name}
                    className={`group/item relative flex items-center justify-center w-12 h-12 rounded-lg bg-card border transition-all duration-200 p-2 outline-none focus-visible:ring-2 focus-visible:ring-primary ${item.isBroken
                      ? "border-danger/50 cursor-pointer hover:border-danger bg-danger/5"
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
                      <img
                        src={item.logo}
                        alt={item.name}
                        width={56}
                        height={56}
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    )}
                    {/* Tooltip - only show for non-broken items */}
                    {!item.isBroken && (
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-popover text-popover-foreground rounded shadow-lg opacity-0 group-hover/item:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {item.name}
                      </span>
                    )}
                    {/* BUG tooltip for broken items - shows undefined */}
                    {item.isBroken && (
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-danger/20 text-danger border border-danger/30 rounded shadow-lg opacity-0 group-hover/item:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
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
