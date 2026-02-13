# Phase 15.6: BDD Test Stabilization

## Goal Description
Fix the 12 failing BDD scenarios identified in the test execution. The failures are concentrated in **Mobile Chrome** execution and specific functional flows (Completion Modal, Verified Badges).

## Failure Analysis
1.  **Mobile Viewport Issues**:
    -   *Symptom*: Scenarios failing on Mobile Chrome but likely passing (or flaky) on Desktop.
    -   *Cause*: Elements like the sidebar or specific badges might be hidden/collapsed in mobile view, or layout shifts cause clicks to fail.
2.  **"Job Done" Modal**:
    -   *Symptom*: "Unlocking the Job Done modal" fails.
    -   *Cause*: The timing of the modal appearance (it has a `setTimeout`) or the exact sequence of 5 clicks might be flaky (e.g., re-clicking an already clicked bug).
3.  **Verified Badges**:
    -   *Symptom*: "Verified Badges link to Code" fails.
    -   *Cause*: The hover action `await badge.hover()` works poorly on mobile/touch simulators, or the tooltip selector is incorrect.

## Proposed Changes

### 1. Fix Mobile Interactions (Steps Refactor)
#### [MODIFY] [tests/steps/untested-steps.ts](file:///c:/Users/miste/Desktop/Dev/qa-showcase/tests/steps/untested-steps.ts)
-   **Sidebar**: Ensure we open the mobile menu if the screen is narrow before looking for sidebar elements.
-   **Overflow**: Strengthen the "responsive overflow" check.

#### [MODIFY] [tests/steps/tested-mode-steps.ts](file:///c:/Users/miste/Desktop/Dev/qa-showcase/tests/steps/tested-mode-steps.ts)
-   **Hover on Mobile**: Mobile doesn't support `hover`. We need to `click` the badge on mobile to trigger the tooltip (if that's how it behaves) or skip/adapt this test for mobile viewports.

### 2. Stabilize "Job Done" Flow
#### [MODIFY] [tests/steps/bug-reporting-steps.ts](file:///c:/Users/miste/Desktop/Dev/qa-showcase/tests/steps/bug-reporting-steps.ts)
-   **Retry Logic**: Add stability w.r.t finding the modal.
-   **Sequence**: Ensure we are clicking *unique* bugs. If we click the same bug twice, the counter doesn't increment. We need to be precise about clicking 5 *different* locations.

## Verification Plan
-   [x] Run `npx playwright test --project=chromium` (Desktop only) to isolate logic vs mobile issues. (9/9 Passed)
-   [x] Run `npx playwright test --project="Mobile Chrome"` to verify mobile fixes. (9/9 Passed)
-   [x] Goal: **18 Passed, 0 Failed**. (Achieved)
