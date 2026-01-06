import { motion } from "framer-motion";

interface TechStackSectionProps {
  variant: "untested" | "tested";
}

interface TechItem {
  name: string;
  icon: string;
  isText?: boolean;
  bgColor?: string;
}

const techStack: Record<string, TechItem[]> = {
  languages: [
    { name: "Python", icon: "🐍" },
    { name: "TypeScript", icon: "TS", isText: true, bgColor: "bg-blue-600" },
    { name: "Java", icon: "☕" },
  ],
  qaAndTesting: [
    { name: "Selenium", icon: "Se", isText: true, bgColor: "bg-green-600" },
    { name: "JMeter", icon: "⚡" },
    { name: "Postman", icon: "📮" },
    { name: "Playwright", icon: "🎭" },
  ],
  toolsAndPlatforms: [
    { name: "Docker", icon: "🐳" },
    { name: "GitHub", icon: "🐙" },
    { name: "Linux", icon: "🐧" },
  ],
  dataAndDatabases: [
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Node.js", icon: "💚" },
    { name: "Hasura", icon: "⚡" },
  ],
};

const TechStackSection = ({ variant }: TechStackSectionProps) => {
  const categories = [
    { title: "Languages", items: techStack.languages },
    { title: "QA & Testing", items: techStack.qaAndTesting },
    { title: "Tools & Platforms", items: techStack.toolsAndPlatforms },
    { title: "Data & Databases", items: techStack.dataAndDatabases },
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 hover:scale-110"
                      title={item.name}
                    >
                      {item.isText ? (
                        <span className={`text-xs sm:text-sm font-bold text-white ${item.bgColor} rounded px-1.5 py-0.5`}>
                          {item.icon}
                        </span>
                      ) : (
                        <span className="text-lg sm:text-xl">{item.icon}</span>
                      )}
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
