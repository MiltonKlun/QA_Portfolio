# Requirements Traceability Matrix (RTM)
**Project:** QA Showcase Portfolio
**Date:** 2026-01-24
**Version:** 1.0

This matrix maps High-Level Requirements (HLR) to Test Cases (TC) and Automated Scripts, ensuring full test coverage.

---

## 1. Traceability Table

| Req ID | Requirement Description | Test Case ID | Test Case Title | Automation Script | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-01** | The "Untested" page shall display 5 intentional bugs to demonstrate defect identification. | **TC-01** | Verify "Missing Name" Bug | `untested_mode.feature` | ✅ Automated |
| **REQ-01** | (Cont.) Social Media links shall be broken or malformed. | **TC-02** | Verify "Social Link" Failure | `untested_mode.feature` | ✅ Automated |
| **REQ-01** | (Cont.) Tech Stack images shall fail to load or show errors. | **TC-03** | Verify "Tech Stack" Image Error | `bug_reporting.feature` | ✅ Automated |
| **REQ-01** | (Cont.) Project Data shall display "NaN%" for progress. | **TC-04** | Verify "Project Data" (NaN) | `bug_reporting.feature` | ✅ Automated |
| **REQ-02** | Clicking a bug element shall open a detailed "Bug Report" modal with severity info. | **TC-06** | Verify Bug Report Modal | `bug_reporting.feature` | ✅ Automated |
| **REQ-03** | Finding all 5 bugs shall unlock a "Job Done" completion modal ("Gamification"). | **TC-07** | Verify "Job Done" Completion | `bug_reporting.feature` | ✅ Automated |
| **REQ-04** | The application layout shall be responsive on Mobile Viewports (375px). | **TC-05** | Verify "Responsive" Overflow | `untested_mode.feature` | ✅ Automated |
| **REQ-05** | Users shall be able to switch to a "Tested" version where all bugs are resolved. | **TC-08** | Verify "Tested" Toggle/Flow | `tested_mode.feature` | ✅ Automated |
| **REQ-06** | The "Tested" version shall display "Green Tick" badges verifying the fix. | **TC-08** | Verify "Tested" Toggle/Flow | `tested_mode.feature` | ✅ Automated |

---

## 2. Coverage Summary

| Metric | Count |
| :--- | :--- |
| **Total Requirements** | 6 |
| **Total Test Cases** | 9 |
| **Automated Coverage** | 100% |
| **Orphan Requirements** | 0 |
| **Orphan Test Cases** | 0 |

---

## 3. Automation Locations
-   **Features**: `qa-artifacts/features/*.feature`
-   **Step Definitions**: `tests/steps/*.ts`
-   **Page Objects**: coming in Phase 17 (Refactoring to POM pattern if needed).
