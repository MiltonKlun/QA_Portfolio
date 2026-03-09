# QA Automation Engineer Portfolio

<div align="center">

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔴 Untested Mode&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🟢 Verified Mode&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
| :---: | :---: |
| Find the hidden bugs | See the validated fixes |
| <a href="https://www.miltonklun.com/untested"><img src="https://img.shields.io/badge/TRY_UNTESTED-FF4444?style=for-the-badge&logo=codeforces&logoColor=white" alt="Try Untested Mode"/></a> | <a href="https://www.miltonklun.com/tested"><img src="https://img.shields.io/badge/TRY_VERIFIED-22C55E?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Try Verified Mode"/></a> |

</div>

<div align="center">
  <img src="https://github.com/MiltonKlun/QA_Portfolio/actions/workflows/tests.yml/badge.svg" alt="Playwright Tests" />
</div>

---

## 💡 What Is This?

An interactive portfolio that **shows** QA skills instead of just listing them. The same website exists in two states — one full of deliberate bugs, and one where every issue has been found, documented, and fixed.

This platform serves as a live testing ground verifying proficiency in **End-to-End (E2E) Test Automation**, **Behavior-Driven Development (BDD)**, **CI/CD Pipeline Integration**, and **Agile Defect Management**.

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph Frontend["React SPA (Vite + TypeScript)"]
        Router[React Router] --> Landing[Landing Page]
        Router --> Untested["/untested — Chaos Mode"]
        Router --> Tested["/tested — Verified Mode"]
        Untested --> Layout[PortfolioLayout]
        Tested --> Layout
        Layout --> Sidebar[SidebarNav]
        Layout --> Hero[HeroSection]
        Layout --> Tech[TechStackSection]
        Layout --> Projects[ProjectsSection]
    end

    subgraph Testing["Playwright Test Suite"]
        Features[10 Gherkin Features] --> Steps[10 Step Definitions]
        Steps --> Pages[3 Page Objects]
        Pages --> Specs[4 Test Specs]
    end

    subgraph CI["CI/CD"]
        GH[GitHub Actions] --> PW[Playwright Tests]
        PW --> Vercel[Vercel Deployment]
    end

    Testing -.->|validates| Frontend
    CI -.->|deploys| Frontend
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **UI Components** | Radix UI (shadcn/ui) |
| **E2E Testing** | Playwright |
| **BDD** | Cucumber / Gherkin |
| **CI/CD** | GitHub Actions |
| **Hosting** | Vercel |
| **Analytics** | Vercel Analytics |

---

## 🧪 Test Strategy

### Page Object Model (POM)
```
tests/
├── pages/          # Page Objects (BasePage, UntestedPage, TestedPage)
├── specs/          # 4 Playwright test specs
└── steps/          # 10 BDD step definitions
```

### BDD Feature Coverage
```
qa-artifacts/features/
├── untested_mode.feature      # Broken behavior scenarios
├── tested_mode.feature        # Fixed behavior scenarios
├── bug_reporting.feature      # Interactive bug report modals
├── bug_hints.feature          # Bug discovery hint system
├── verified_checks.feature    # Fix verification badges
├── enhanced_bugs.feature      # Advanced chaos-engineered bugs
├── accessibility.feature      # WCAG compliance checks
├── mobile_navigation.feature  # Responsive layout tests
├── performance.feature        # Lighthouse score targets
└── visual_regression.feature  # Screenshot comparison tests
```

### Running Tests

```bash
# Install dependencies
npm install

# Run all Playwright tests
npx playwright test

# Run with UI mode
npx playwright test --ui

# Run specific scenarios
npx playwright test --grep "Verified"
```

---

## 📂 Project Structure

```
qa-showcase/
├── src/
│   ├── components/portfolio/   # Page sections (Hero, TechStack, Projects)
│   ├── components/ui/          # Reusable UI primitives (shadcn/ui)
│   ├── hooks/                  # Custom React hooks
│   └── pages/                  # Route components (Index, Untested, Tested)
├── tests/                      # Playwright E2E tests (POM pattern)
├── qa-artifacts/               # Gherkin features, test docs, Lighthouse reports
├── IMPROVEMENTS_PLAN.md        # 6-phase development roadmap
└── TEST_FIX_PLAN.md            # Bug documentation and fix tracking
```

---

## 🚀 Local Development

```bash
# Clone and install
git clone https://github.com/MiltonKlun/QA_Portfolio.git
cd QA_Portfolio
npm install

# Start dev server
npm run dev

# Production build
npm run build
npm run preview
```

---

## Author

**Milton Klun**  
*QA Automation Engineer | Backend Developer*

<div align="left">
  <a href="https://www.linkedin.com/in/milton-klun/"><img src="https://img.shields.io/badge/LINKEDIN-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a><a href="mailto:miltonericklun@gmail.com"><img src="https://img.shields.io/badge/EMAIL-D14836?style=for-the-badge" alt="Email"/></a><a href="https://www.miltonklun.com"><img src="https://img.shields.io/badge/PORTFOLIO-000000?style=for-the-badge" alt="Live Site"/></a>
</div>
