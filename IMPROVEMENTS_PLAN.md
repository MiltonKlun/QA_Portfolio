# QA Portfolio — Improvements Plan

> **Created**: 2026-02-10
> **Goal**: Elevate the portfolio from a functional demo into a **recruiter-stopping, interview-winning showcase** — equally impactful for technical and non-technical audiences.

---

## Phase 1: UX & Storytelling Polish

> **Objective**: Make the landing page and navigation so compelling that a recruiter *can't* close the tab.

- [x] **1.1 — Redesign Landing Page as a "Choose Your Adventure" experience**
  - Add subtle particle/grid background animation to increase visual wow-factor
  - Add a brief "How it works" tooltip or 3-step explainer below the cards (e.g., "1. Explore bugs → 2. Read reports → 3. See the fixes")

- [x] **1.3 — Add animated transition between Untested → Tested modes**
  - When clicking "See Verified Version" from the Completion Modal, animate the page transforming (e.g., red elements fading to green, broken icons morphing into loaded ones)
  - This visually sells the "before/after" narrative far better than a route change

- [x] **1.4 — Add a persistent "Bug Hint" system for non-technical users**
  - Subtle pulsing indicators (small red dots) near each hidden bug in Untested mode
  - Optional "Show Hints" toggle in the header — off by default, so tech users can hunt freely but non-tech recruiters don't get lost

- [x] **1.5 — Improve mobile navigation experience**
  - Add a sticky bottom navigation bar on mobile (replacing the desktop sidebar nav) with section icons
  - Ensure the bug counter is always visible on mobile without overlapping content


---

## Phase 2: Interactive Bug Upgrades

> **Objective**: Replace static/passive bugs with **interactive, entertaining defects** that simulate real-world QA frustrations and require user action to trigger.

### Bugs to Keep (with enhancements)
- [x] **2.1 — Keep Bug #1: [Missing Name] — but make it flicker**
  - Instead of a static placeholder, make the name rapidly cycle through garbage values (`null`, `undefined`, `NaN`, `[Object]`) before settling on `[Missing Name]`
  - This makes it feel more like a real rendering crash and is immediately eye-catching

- [x] **2.2 — Keep Bug #4: [object Object] — add a "cascade" effect**
  - Make the `[object Object]` text spread — after 2 seconds on screen, the project description also corrupts to `[object Object]`
  - Visually communicates "data corruption propagation" — a real-world API bug pattern

### Updated Bug Summary Table
| # | Current Bug | Proposed Replacement | Interaction Level |
|---|------------|---------------------|-------------------|
| 1 | `[Missing Name]` (static) | `[Missing Name]` with flickering values | 🔴 Visual (Enhanced) |
| 2 | Broken `http:///` links | (Kept as is - Broken Links) | 🔴 Visual |
| 3 | Broken tech icons | (Kept as is - Broken Images) | 🔴 Visual |
| 4 | `[object Object]` (static) | `[object Object]` with cascade corruption | 🟡 Semi-Interactive |
| 5 | CSS text overflow | (Kept as is - CSS Overflow) | 🔴 Visual |

---

## Phase 3: New Sections & Content

> **Objective**: Expand the portfolio beyond a demo into a **full professional showcase** with downloadable proof of work.

- [x] **3.1 — Add real project links to the Projects section**
  - Replace the generic emoji project cards with your actual projects:
    - `PG_Original_POM` (Playwright POM Framework)
    - `Pombot_PG_Original` (Telegram Bot)
    - `CSA_Pharma_Framework` (Pharma Framework)
  - Each card links to the real GitHub repo
  - Show real tech stacks per project with tags

---

## Phase 4: Test Coverage Expansion

> **Objective**: Match the test architecture to the upgraded features and demonstrate advanced testing patterns.

- [x] **4.1 — Write E2E tests for enhanced bugs**
  - [Missing Name] Flicker: Verify name cycles through garbage values before settling
  - [object Object] Cascade: Verify description corrupts after 2s delay

- [x] **4.2 — Add visual regression tests**
  - Use Playwright's `toHaveScreenshot()` for screenshot comparison on key pages
  - Compare untested vs. tested mode screenshots
  - This demonstrates **visual testing** expertise — a highly valued QA skill

- [x] **4.3 — Add accessibility testing**
  - Integrate `@axe-core/playwright` for automated a11y checks
  - Test color contrast, ARIA labels, keyboard navigation
  - Create a dedicated `accessibility.spec.ts` file
  - This showcases **accessibility QA** — increasingly important in hiring

- [x] **4.4 — Add API mocking / network interception tests**
  - Use Playwright's `page.route()` to intercept and mock API calls
  - Even though the app is static, this demonstrates the *pattern* of API test automation
  - Example: mock a form submission endpoint to return 500 error

- [x] **4.5 — Add performance testing assertions**
  - Test page load time (LCP < 2.5s) using `page.evaluate(() => performance.getEntriesByType('navigation'))`
  - Assert no console errors on the Tested page
  - Assert specific console errors *exist* on the Untested page

- [x] **4.6 — Update BDD features with new scenarios**
  - New `.feature` files for each new interactive bug
  - Update `TRACEABILITY_MATRIX.md` to maintain 100% coverage
  - Update `TEST_CASES.md` with new test case entries

- [x] **4.7 — Add CI/CD pipeline with GitHub Actions**
  - Create `.github/workflows/tests.yml` running the full Playwright suite on push/PR
  - Add a status badge to the README and the portfolio itself ("CI: Passing ✅")
  - This demonstrates **CI/CD integration** — a key QA skill

---

## Phase 5: Performance & Accessibility

> **Objective**: Make the site production-grade.

- [x] **5.1 — Optimize image assets**
  - Convert all PNG tech logos to WebP format
  - Add lazy loading for images below the fold
  - Target: Lighthouse Performance score > 90

- [x] **5.2 — Add proper ARIA labels and keyboard navigation**
  - All interactive bug elements should be keyboard-accessible (Tab, Enter)
  - Modal focus trapping (already partially done, verify completeness)
  - Screen reader announcements for bug discovery ("Bug found: Missing Name")

- [x] **5.3 — Add Open Graph and social sharing meta tags (dynamic)**
  - Different OG images for untested vs. tested routes
  - Add a "Share this portfolio" button that copies the URL

- [x] **5.4 — Add error boundary components**
  - Wrap route components in React Error Boundaries
  - In Untested mode: show a styled "Something went wrong" fallback (another realistic bug!)
  - In Tested mode: graceful error handling

- [x] **5.5 — Code splitting and lazy loading for routes**
  - Lazy load `/untested` and `/tested` pages with `React.lazy()` + Suspense
  - Add loading skeleton components for perceived performance

- [x] **5.6 — Lighthouse audit and PWA setup**
  - Run full Lighthouse audit (Performance, A11y, SEO, Best Practices)
  - Add a minimal `manifest.json` for PWA capability
  - Target: All Lighthouse scores > 90

---

## Phase 6: Deployment & Analytics

> **Objective**: Get the portfolio live and track recruiter engagement.

- [x] **6.1 — Deploy to a custom domain**
  - Deploy to Vercel/Netlify with a custom domain (e.g., `miltonklun.dev` or `qa.miltonklun.com`) -> DONE (www.miltonklun.com)
  - Configure proper SSL and redirects -> DONE

- [ ] **6.2 — Add lightweight analytics**
  - Integrate Plausible, Umami, or simple Google Analytics
  - Track key events: which mode was chosen first, how many bugs were found, time on page, completion rate
  - This data itself becomes a QA metric you can discuss in interviews

- [x] **6.4 — Create a compelling README.md**
  - Replace the default Lovable README with a project-specific one
  - Include: project description, architecture diagram, tech stack, how to run tests, screenshots/GIFs
  - This is often the *first thing* technical recruiters look at

---

## Priority Matrix

| Phase | Impact on Recruiters | Effort | Recommended Priority |
|-------|---------------------|--------|---------------------|
| Phase 1 (UX Polish) | ⭐⭐⭐⭐⭐ | Medium | 🥇 **Do First** |
| Phase 2 (Bug Upgrades) | ⭐⭐⭐⭐⭐ | High | 🥈 **Do Second** |
| Phase 3 (New Content) | ⭐⭐⭐⭐ | Medium | 🥉 **Do Third** |
| Phase 4 (Test Coverage) | ⭐⭐⭐⭐ | High | 4th |
| Phase 5 (Perf/A11y) | ⭐⭐⭐ | Medium | 5th |
| Phase 6 (Deploy) | ⭐⭐⭐⭐⭐ | Low | 🏁 **Can start anytime** |
