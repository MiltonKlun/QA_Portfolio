# Phase 15.5: BDD Implementation Plan

## Goal Description
Transform the static Gherkin feature files (created in Phase 15) into **executable tests**. We will implement the BDD layer using `playwright-bdd`, allowing us to run `npx playwright test` and have it execute our `.feature` scenarios against the live application.

## Current Status (Analysis)
- **Artifacts**: Feature files exist in `qa-artifacts/features/*.feature`.
- **Infrastructure**: `package.json` **MISSING** BDD dependencies; `playwright.config.ts` **MISSING** BDD configuration.
- **Implementation**: No Step Definitions (`.ts` files) exist yet.

## Proposed Changes

### 1. Infrastructure Setup
-   **Dependencies**: Install `playwright-bdd` and `cucumber`.
-   **Configuration**: Update `playwright.config.ts` to define the feature and step directories.

### 2. Step Definition Implementation
#### [NEW] [tests/steps/](file:///c:/Users/miste/Desktop/Dev/qa-showcase/tests/steps/)
Create a dedicated directory for BDD logic.

#### [NEW] [tests/steps/untested-steps.ts](file:///c:/Users/miste/Desktop/Dev/qa-showcase/tests/steps/untested-steps.ts)
-   Implement steps for: `Given I navigate to...`, `Then I should see text...`.
-   Use Page Object Models (POM) imported from `tests/pages/`.

#### [NEW] [tests/steps/tested-steps.ts](file:///c:/Users/miste/Desktop/Dev/qa-showcase/tests/steps/tested-steps.ts)
-   Implement steps for: `When I toggle to Tested...`, `Then verified badges...`.

### 3. Execution & Verification
-   **Command**: `npx playwright test` (configured to pick up generated BDD tests).
-   **Verify**: Ensure all scenarios in `untested_mode.feature` and others pass.

## Verification Plan
1.  **Run Command**: Execute the test runner.
2.  **Report**: Verify Playwright HTML report shows individual Gherkin steps (Given/When/Then).
