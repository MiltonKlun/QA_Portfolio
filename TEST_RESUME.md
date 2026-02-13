# QA Showcase - Test Resume

> **Generated**: 2026-01-26
> **Project**: QA Showcase Portfolio
> **Objective**: A comprehensive overview of the testing infrastructure, tools, and artifacts used to validate the "Untested" vs "Tested" portfolio concepts.

---

## 1. Testing Stack & Tools

We utilize a modern, industry-standard stack focused on reliability and BDD (Behavior Driven Development) integration.

| Tool | Purpose | Version |
| :--- | :--- | :--- |
| **Playwright** | The core End-to-End (E2E) testing framework. Handles browser automation, assertions, and reporting. | `^1.57.0` |
| **Playwright-BDD** | Bridges Gherkin (`.feature`) files with Playwright. Generates spec files from feature definitions. | `^8.4.2` |
| **TypeScript** | The language for all test code, ensuring type safety and better tooling support. | `^5.8.3` |
| **Cucumber (Gherkin)** | The syntax used for writing human-readable test scenarios in `.feature` files. | N/A (Standard) |
| **Framer Motion** | (App Dependency) noted here because tests heavily rely on waiting for these animations (e.g., Modals). | `^12.23.26` |

---

## 2. Test Documentation (Manual & Strategy)

Located in: `qa-artifacts/`

These files define *what* we test and *why*, serving as the blueprint for our automation.

-   **[TEST_PLAN.md](file:///c:/Users/miste/Desktop/Dev/qa-showcase/qa-artifacts/TEST_PLAN.md)**:
    -   **Purpose**: The master strategy document. Defines the scope (Untested vs Tested), test types (Functional, UI, Mobile), and browser coverage (Chrome Desktop, Pixel 5).
    -   **Key Content**: Objectives, Scope, Test Environment, Risks.

-   **[TEST_CASES.md](file:///c:/Users/miste/Desktop/Dev/qa-showcase/qa-artifacts/TEST_CASES.md)**:
    -   **Purpose**: A list of high-level test cases (TC-01 to TC-08). These act as the source of truth for both manual verification and automation logic.
    -   **Type**: Manual / High-Level definitions.
    -   **Example**: `TC-01 Verify "Missing Name" Bug` - confirms the header is broken in Untested mode.

-   **[TRACEABILITY_MATRIX.md](file:///c:/Users/miste/Desktop/Dev/qa-showcase/qa-artifacts/TRACEABILITY_MATRIX.md)**:
    -   **Purpose**: Maps Requirements (REQ IDs) to Test Cases (TC IDs), ensuring we haven't missed any features.

-   **[RISK_REGISTER.md](file:///c:/Users/miste/Desktop/Dev/qa-showcase/qa-artifacts/RISK_REGISTER.md)**:
    -   **Purpose**: Tracks potential project risks (e.g., "Animation Flakiness", "Browser Consistency") and their mitigation strategies.

---

## 3. Automated Test Structure

The automation is built on a **Page Object Model (POM)** pattern integrated with **BDD**.

### A. Feature Files (The Scenarios)
*Location: `qa-artifacts/features/`*
Written in Gherkin (Given/When/Then). Readable by non-technical stakeholders.

1.  **`untested_mode.feature`**:
    -   **Scope**: Verifies the "Broken" state of the portfolio.
    -   **Tests**: Checks for "[Missing Name]", broken images, NaN% data, and 404 links.
2.  **`bug_reporting.feature`**:
    -   **Scope**: Tests the Gamification aspect.
    -   **Tests**: Clicking a bug → Opening Modal → verifying Severity/Title → Unlocking "Job Done" after 5 bugs.
3.  **`tested_mode.feature`**:
    -   **Scope**: Verifies the "Fixed" state.
    -   **Tests**: Ensures the Toggle works, name is "Milton Klun", images load, and data is correct.

### B. Step Definitions (The Glue)
*Location: `tests/steps/`*
Mapping the Gherkin strings to executable TypeScript code.

-   **`bug-reporting-steps.ts`**: Handles the logic for the Bug Modal interactions and the "Job Done" workflow.
-   **`untested-steps.ts`**: Steps for verifying the visual bugs in the Untested view.
-   **`tested-mode-steps.ts`**: Steps for the verified view (fixes).

### C. Page Objects (The Abstraction)
*Location: `tests/pages/`*
Encapsulates DOM locators and interactions to keep tests clean.

-   **`BasePage.ts`**: Shared methods (Navigation, Waiting).
-   **`UntestedPage.ts`**: Locators for the broken elements (e.g., `text=NaN%`, `text=Missing Name`).
-   **`TestedPage.ts`**: Locators for the fixed elements.

### D. Spec Files (The Entry Points)
*Location: `tests/specs/`*
Generated/Managed by `playwright-bdd`. These are what Playwright actually runs.

-   `gamification.spec.ts`
-   `untested-chaos.spec.ts`
-   `verified-fixes.spec.ts`

---

## 4. Configuration

-   **[playwright.config.ts](file:///c:/Users/miste/Desktop/Dev/qa-showcase/playwright.config.ts)**:
    -   **Projects**: Configured for **Desktop Chrome** and **Mobile Chrome** (Pixel 5).
    -   **BDD Config**: Points to the `qa-artifacts/features` directory.
    -   **Reporters**: Uses `html` reporter for detailed test results.
    -   **Snapshots**: Configured to capture screenshots only on failure.

---

## 5. Execution Reference

To run the full suite:
```bash
npx playwright test
```

To run mobile specific tests:
```bash
npx playwright test --project="Mobile Chrome"
```

To view the report:
```bash
npx playwright show-report
```
