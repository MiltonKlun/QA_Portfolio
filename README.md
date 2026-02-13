# QA Automation Engineer Portfolio 🚀

> **"Quality is not an act, it is a habit."**

Welcome to my interactive QA Portfolio! This project is designed to demonstrate my skills as a QA Automation Engineer not just by *listing* them, but by letting you *experience* them.

## 🎮 The Concept: Untested vs. Verified

This portfolio features two distinct modes:

1.  **🔴 Untested Mode**: The default state. A chaos-engineered version of the site full of deliberate bugs, UI glitches, and functional errors.
    *   **Goal**: Find the bugs!
    *   **Interactive Bug Reporting**: Click on glitches (like the flickering name or broken layout) to see a detailed "Jira-style" bug report explaining the technical root cause (e.g., specific JS errors, CSS overflow, API failures).
    *   **The Check**: Can you find all 5 hidden bugs?

2.  **🟢 Verified Mode**: The "fixed" version.
    *   Toggle this switch to see the power of QA.
    *   All bugs are resolved, layouts are stable, and the user experience is polished.
    *   **Verified Badges**: Click on the green checkmarks to see how each bug was fixed and validated.

## 🛠️ Tech Stack

This project was built with modern web technologies:

-   **Framework**: [React](https://react.dev/) (Vite)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Testing**: [Playwright](https://playwright.dev/) (End-to-End & BDD)

## 🧪 Automated Testing Strategy

This repository isn't just a website; it's a test target. I've implemented a comprehensive test suite to verify the behavior of both modes.

### BDD (Behavior Driven Development)
I use **Cucumber/Gherkin** syntax to define human-readable test scenarios.
*   `features/untested_mode.feature`: Defines the expected broken behavior.
*   `features/tested_mode.feature`: Defines the expected correct behavior.

### Running Tests
To run the automated checks locally:

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run specific scenarios (e.g., Verified Mode)
npx playwright test --grep "Verified"
```

## 📂 Project Structure

-   `src/`: React source code.
-   `tests/`: Playwright test specs and page objects.
-   `qa-artifacts/`: Gherkin feature files and test documentation.
-   `IMPROVEMENTS_PLAN.md` & `TEST_FIX_PLAN.md`: Documentation of the development and QA process used to build this site.

---

## Author
**Milton Klun**  
*QA Automation Engineer | Backend Developer*

<div align="left">
  <a href="https://www.linkedin.com/in/milton-klun/">
    <img src="https://img.shields.io/badge/LinkedIn-Milton%20Klun-blue?style=for-the-badge&logo=linkedin" alt="LinkedIn"/>
  </a>
  <a href="mailto:miltonericklun@gmail.com">
    <img src="https://img.shields.io/badge/Email-Contact%20Me-red?style=for-the-badge&logo=gmail" alt="Email"/>
  </a>
</div>
