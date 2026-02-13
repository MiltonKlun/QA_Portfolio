# QA Professionalism & Artifacts Plan

## Goal Description
Transform the portfolio from a technical demo into a comprehensive display of QA professionalism. We will create standard industry artifacts (Test Plan, Risk Register, etc.) and integrate them into the site to prove the candidate's understanding of the full QA lifecycle, not just automation.

## User Review Required
- **Review of Phase Breakdown**: Ensure the order and scope of artifacts matches your expectations.
- **Content Input**: You may need to provide specific preferences for the "narrative" or tone of the documents.

## Proposed New Phases (Roadmap Update)

### Phase 13: QA Strategy & Test Plan
**Objective**: Create a professional **Test Plan** document (IEEE 829 standard adapted for modern agile).
-   **Deliverables**: `TEST_PLAN.md` covering scope, objectives, resources, schedule, and entry/exit criteria.

### Phase 14: Risk Analysis & Register
**Objective**: Demonstrate risk-based testing evaluation.
-   **Deliverables**: `RISK_REGISTER.md` covering technical, business, and project risks with mitigation strategies.

### Phase 15: Test Case Design
**Objective**: Write detailed manual test cases for the "Untested" features (positive & negative flows).
-   **Deliverables**: `TEST_CASES.md` (or tabular format) featuring Pre-conditions, Steps, Expected Results, and Severity.

### Phase 16: Testware & Traceability
**Objective**: Create a **Requirements Traceability Matrix (RTM)** linking User Stories (Spec) -> Test Cases -> Automated Scripts (Playwright).
-   **Deliverables**: `TRACEABILITY_MATRIX.md`.

### Phase 17: Portfolio Integration (The "QA Hub")
**Objective**: Create a new UI section (e.g., "QA Documentation" or "Methodology") on the website to showcase these artifacts.
-   **Changes**: Add a new navigation item/page that renders these markdown files nicely (or links to PDF versions) so recruiters can read them.

## Verification Plan
-   **Content Review**: User to review the generated markdown artifacts for accuracy and tone.
-   **UI Check**: Verify the new "QA Hub" section correctly displays the documents and fits the site's theme.
