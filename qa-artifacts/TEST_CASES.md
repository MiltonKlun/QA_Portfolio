# Standard Test Cases
**Project:** QA Showcase Portfolio
**Total Cases:** 8
**Author:** QA Automation Engineer

---

## 1. Untested Experience (Intentional Bugs)

| ID | Title | Pre-Conditions | Test Steps | Expected Result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | **Verify "Missing Name" Bug** | User is on Landing Page (Untested Mode). | 1. Navigate to Home.<br>2. Observe the Hero Headline text.<br>3. Verify text flickers through garbage values. | Headline displays "[Missing Name]" after flickering. | **Critical** |
| **TC-02** | **Verify "Social Link" Failure** | Sidebar is visible. | 1. Click "Connect" menu item.<br>2. Click "LinkedIn" icon. | Browser attempts to open `http:///` or shows 404/Error (Does not go to LinkedIn). | **High** |
| **TC-03** | **Verify "Tech Stack" Image Error** | User scrolled to Tech Stack. | 1. Locate the grid of icons.<br>2. Identify icons with Red Borders.<br>3. Hover over a broken icon. | Image is broken/missing. Tooltip shows "undefined" or error state. | **Medium** |
| **TC-04** | **Verify "Project Data" (NaN)** | User scrolled to Projects. | 1. Locate "Completion Status".<br>2. Read the percentage value.<br>3. Wait 2 seconds. | Display shows "NaN%" text. Project description corrupts to "[object Object]". | **Medium** |
| **TC-05** | **Verify "Responsive" Overflow** | User scrolled to About Me. | 1. Resize browser to <375px width.<br>2. Observe the text paragraph. | Text overflows container boundary; horizontal scrollbar appears. | **High** |

---

## 2. Bug Reporting & Gamification

| ID | Title | Pre-Conditions | Test Steps | Expected Result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-06** | **Verify Bug Report Modal** | Untested Mode active. | 1. Click on the "[Missing Name]" text.<br>2. Observe Modal. | Modal opens. Title: "NullReferenceException". Severity: "Critical". | **High** |
| **TC-07** | **Verify "Job Done" Completion** | Found 4/5 bugs. | 1. Find and click the 5th bug.<br>2. Close the Report Modal. | "Job Done" Modal appears with Green Bug icon. | **Low** |

---

## 3. Tested Experience (Fix Verification)

| ID | Title | Pre-Conditions | Test Steps | Expected Result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-08** | **Verify "Tested" Toggle** | User is on Untested Page. | 1. Click "Switch to Tested Version" toggle.<br>2. Observe Hero Headline.<br>3. Observe Tech Stack. | 1. URL changes to `/tested`.<br>2. Name displays correctly.<br>3. Images load correctly. | **Critical** |

---

## 4. Non-Functional & Advanced Tests (Phase 4)

| ID | Title | Pre-Conditions | Test Steps | Expected Result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-09** | **Verify Accessibility (Tested)** | User is on "Tested" Page. | 1. Run Axe Accessibility Audit. | No critical or serious violations found (0 violations). | **High** |
| **TC-10** | **Verify Accessibility (Untested)** | User is on "Untested" Page. | 1. Run Axe Accessibility Audit. | Violations detected (e.g., color contrast, missing labels). | **Low** |
| **TC-11** | **Verify Page Load Performance** | Network is throttled (optional). | 1. Navigate to "Tested" Page.<br>2. Measure Navigation Timing (LCP/Load). | Load time is under 5.0 seconds. No console errors. | **Medium** |
| **TC-12** | **Verify Network Failure Handling** | Network interceptor active (404 on `jira.png`). | 1. Navigate to "Tested" Page.<br>2. Scroll to Tech Stack. | Page loads without crashing. Broken image has fallback or 0 width. | **Medium** |
| **TC-13** | **Verify Visual Regression** | Baseline snapshots exist. | 1. Run Visual Regression suite.<br>2. Compare current render vs baseline. | No pixel differences > threshold. | **Medium** |
