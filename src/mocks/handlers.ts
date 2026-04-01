import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  http.get('/api/projects', async ({ request }) => {
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode');

    // Introduce chaos for the Untested mode
    if (mode === 'untested') {
      // Simulate real-world network latency (reduced to 800ms for better UX)
      // Guaranteed catastrophic 500 Internal Server Error for the Projects API
      // This is our new "Data Bug" replacing the old [object Object] payload.
      return new HttpResponse('Internal Server Error', { status: 500 });
    }

    // Tested mode: Clean, predictable responses
    return HttpResponse.json([
      {
        id: 1,
        title: "Test Automation Suite",
        description: "Test automation framework tailored for PG Original.",
        imageId: "pg",
        tags: ["Playwright", "Python", "POM"],
        status: "Completed",
        progress: 100,
        link: "https://github.com/MiltonKlun/PG_Original_POM"
      },
      {
        id: 2,
        title: "CSA Pharma Framework",
        description: "Compliance-focused testing framework for pharmaceutical systems (GAMP5).",
        image: "💊",
        tags: ["Compliance", "Validation", "GAMP5"],
        status: "In Progress",
        progress: 75,
        link: "https://github.com/MiltonKlun/CSA_Pharma_Framework"
      },
      {
        id: 3,
        title: "Pombot",
        description: "Serverless Telegram bot with sales, expenses, and stock management.",
        imageId: "pg",
        tags: ["AWS-Lambda", "CI/CD", "API"],
        status: "Completed",
        progress: 100,
        link: "https://github.com/MiltonKlun/Pombot_PG_Original"
      }
    ]);
  }),

  http.get('/api/techstack', async ({ request }) => {
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode');
    const isUntested = mode === 'untested';

    if (isUntested) {
      // Simulate real-world network latency for chaotic feel
      await delay(800); 
    }

    return HttpResponse.json({
      languages: [
        { name: "Python", logoId: "python", isBroken: isUntested, wasFixed: !isUntested },
        { name: "Java", logoId: "java" },
        { name: "SQL", logoId: "sql" },
      ],
      automation: [
        { name: "Playwright", logoId: "playwright", isBroken: isUntested, wasFixed: !isUntested },
        { name: "Selenium", logoId: "selenium", isBroken: isUntested, wasFixed: !isUntested },
        { name: "Pytest", logoId: "pytest" },
        { name: "Cucumber", logoId: "cucumber" },
        { name: "Appium", logoId: "appium" },
      ],
      qaManagement: [
        { name: "JMeter", logoId: "jmeter" },
        { name: "Postman", logoId: "postman" },
        { name: "Jira", logoId: "jira" },
        { name: "TestRail", logoId: "testrail" },
        { name: "Xray", logoId: "xray" },
      ],
      infrastructure: [
        { name: "AWS", logoId: "aws" },
        { name: "Git", logoId: "git" },
        { name: "Docker", logoId: "docker", isBroken: isUntested, wasFixed: !isUntested },
        { name: "Jenkins", logoId: "jenkins" },
        { name: "GitHub Actions", logoId: "github" },
      ],
      databases: [
        { name: "PostgreSQL", logoId: "postgresql" },
        { name: "MongoDB", logoId: "mongodb" },
      ]
    });
  }),
];
