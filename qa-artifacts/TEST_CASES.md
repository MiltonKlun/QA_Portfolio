# Standard Test Cases
**Project:** QA Showcase Portfolio
**Total Cases:** 8
**Author:** QA Automation Engineer

---

## 1. Untested Experience (Intentional Bugs)

| ID | Title | Pre-Conditions | Test Steps | Expected Result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | **Verify "Missing Name" Bug** | User is on Landing Page (Untested Mode). | 1. Navigate to Home.<br>2. Observe the Hero Headline text. | Headline displays "[Missing Name]" in large red text. | **Critical** |
| **TC-02** | **Verify "Social Link" Failure** | Sidebar is visible. | 1. Click "Connect" menu item.<br>2. Click "LinkedIn" icon. | Browser attempts to open `http:///` or shows 404/Error (Does not go to LinkedIn). | **High** |
| **TC-03** | **Verify "Tech Stack" Image Error** | User scrolled to Tech Stack. | 1. Locate the grid of icons.<br>2. Identify icons with Red Borders.<br>3. Hover over a broken icon. | Image is broken/missing. Tooltip shows "undefined" or error state. | **Medium** |
| **TC-04** | **Verify "Project Data" (NaN)** | User scrolled to Projects. | 1. Locate "Completion Status".<br>2. Read the percentage value. | Display shows "NaN%" text. | **Medium** |
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
