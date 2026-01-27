# Risk Register
**Project:** QA Showcase Portfolio
**Date:** 2026-01-23
**Status:** ACTIVE

---

## 1. Risk Assessment Matrix
This project uses a standard 5x5 Risk Matrix to prioritize testing efforts.

| Likelihood (1-5) | Impact (1-5) | Risk Score (L x I) | Priority |
| :--- | :--- | :--- | :--- |
| **5 (Certain)** | **5 (Catastrophic)** | **25** | **Critical** (Stop Ship) |
| **4 (Likely)** | **4 (Major)** | **16-20** | **High** (Must Fix) |
| **3 (Possible)** | **3 (Moderate)** | **9-15** | **Medium** (Monitor) |
| **2 (Unlikely)** | **2 (Minor)** | **4-8** | **Low** (Defer) |
| **1 (Rare)** | **1 (Negligible)** | **1-3** | **Trivial** |

---

## 2. Product Risks (Functional & Quality)

| ID | Risk Description | Likelihood | Impact | Score | Priority | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **PR-01** | **Intentional Bugs Fail to Render:** The "Untested" page loads cleanly without the expected bugs, defeating the portfolio's purpose. | 2 | 5 | **10** | **Medium** | E2E Tests specifically verify the *presence* of error elements (e.g., Red Text, Alerts). |
| **PR-02** | **"Tested" Mode Persists Bugs:** Clicking "Tested" does not clear the intentional bugs, making the candidate look incompetent. | 2 | 5 | **10** | **Medium** | Automated regression test for the "Repair" user flow (Toggle -> Verify Green Ticks). |
| **PR-03** | **Mobile Layout Breakage:** Complex UI elements (Tech Stack grid) overlap or overflow on small iPhone screens (<375px). | 3 | 4 | **12** | **Medium** | Manual verification on actual devices; CSS `overflow-hidden` guards; Repsonsive Design checks. |
| **PR-04** | **Performance Degradation:** High-resolution assets cause slow LCP (Largest Contentful Paint), increasing bounce rate. | 3 | 3 | **9** | **Medium** | Image optimization (WebP); Lazy loading implemented for "Projects" section. |
| **PR-05** | **Accessibility Violation:** Color contrast on "Bug Cards" is too low for WCAG AA standards. | 2 | 3 | **6** | **Low** | Use Shadcn/UI default accessible themes; Run Lighthouse accessibility audit. |

---

## 3. Project Risks (Delivery & User Experience)

| ID | Risk Description | Likelihood | Impact | Score | Priority | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **PJ-01** | **User Misses "Toggle" Interaction:** Recruiters visit the site but don't realize it's interactive, viewing only the "Broken" state. | 4 | 5 | **20** | **High** | **UI Intervention:** Added "Coach Marks" / Pulsing animation on the Toggle button to guide attention. |
| **PJ-02** | **Browser Compatibility:** Playwright tests pass on Chromium but site breaks on Safari (WebKit). | 2 | 4 | **8** | **Low** | Cross-browser testing enabled in Playwright config (Webkit/Firefox projects). |
| **PJ-03** | **Flaky Automation:** Network latency causes false negatives in verifying "Async" bug reports. | 3 | 4 | **12** | **Medium** | Use Playwright's auto-waiting `expect()` assertions; Avoid fixed sleeps. |
| **PJ-04** | **Deployment Failure:** GitHub Actions build fails due to node_modules caching issues. | 2 | 5 | **10** | **Medium** | Local "pre-push" hook to run build; Standardize CI workflow. |

---

## 4. Risk Burndown
*Status of identified Critical/High risks.*

-   [ ] **PJ-01 (User Misses Toggle)**: Mitigation In-Progress. (Implemented pulsing animation).
