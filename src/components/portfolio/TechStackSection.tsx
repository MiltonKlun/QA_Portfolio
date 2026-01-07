import { motion } from "framer-motion";

// Import tech logos
import pythonLogo from "@/assets/tech-logos/python.svg";
import javaLogo from "@/assets/tech-logos/java.svg";
import seleniumLogo from "@/assets/tech-logos/selenium.svg";
import jmeterLogo from "@/assets/tech-logos/jmeter.svg";
import postmanLogo from "@/assets/tech-logos/postman.svg";
import playwrightLogo from "@/assets/tech-logos/playwright.svg";
import testrailLogo from "@/assets/tech-logos/testrail.svg";
import xrayLogo from "@/assets/tech-logos/xray.svg";
import appiumLogo from "@/assets/tech-logos/appium.svg";
import pomLogo from "@/assets/tech-logos/pom.svg";
import dockerLogo from "@/assets/tech-logos/docker.svg";
import githubLogo from "@/assets/tech-logos/github.svg";
import linuxLogo from "@/assets/tech-logos/linux.svg";
import postgresqlLogo from "@/assets/tech-logos/postgresql.svg";
import mysqlLogo from "@/assets/tech-logos/mysql.svg";

interface TechStackSectionProps {
  variant: "untested" | "tested";
}

interface TechItem {
  name: string;
  logo: string;
}

const techStack: Record<string, TechItem[]> = {
  languages: [
    { name: "Python", logo: pythonLogo },
    { name: "Java", logo: javaLogo },
  ],
  qaAndTesting: [
    { name: "Selenium", logo: seleniumLogo },
    { name: "JMeter", logo: jmeterLogo },
    { name: "Postman", logo: postmanLogo },
    { name: "Playwright", logo: playwrightLogo },
    { name: "TestRail", logo: testrailLogo },
    { name: "Xray", logo: xrayLogo },
    { name: "Appium", logo: appiumLogo },
    { name: "POM", logo: pomLogo },
  ],
  toolsAndPlatforms: [
    { name: "Docker", logo: dockerLogo },
    { name: "GitHub", logo: githubLogo },
    { name: "Linux", logo: linuxLogo },
  ],
  databases: [
    { name: "PostgreSQL", logo: postgresqlLogo },
    { name: "MySQL", logo: mysqlLogo },
  ],
};

const TechStackSection = ({ variant }: TechStackSectionProps) => {
  const categories = [
    { title: "Languages", items: techStack.languages },
    { title: "QA & Testing", items: techStack.qaAndTesting },
    { title: "Tools & Platforms", items: techStack.toolsAndPlatforms },
    { title: "Databases", items: techStack.databases },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12">
            Tech Stack
          </h2>

          <div className="flex flex-col gap-8 sm:gap-10">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-sm sm:text-base font-semibold text-muted-foreground uppercase tracking-wider">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 hover:scale-110 p-2"
                      title={item.name}
                    >
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                      {/* Tooltip */}
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-popover text-popover-foreground rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
