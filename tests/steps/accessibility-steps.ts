import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';

const { Given, When, Then } = createBdd(test);

// Navigation steps are reused from other step files:
// 'I navigate to the "Tested" portfolio page' -> visual-steps.ts
// 'I navigate to the "Untested" portfolio page' -> untested-steps.ts (or visual-steps if duplicate)

Then('the page should have no significant accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
    
    // Generate HTML artifact for CI/CD visualization
    if (accessibilityScanResults.violations.length > 0) {
        console.log(`Found ${accessibilityScanResults.violations.length} A11y violations in Tested mode. Generating report...`);
        createHtmlReport({
            results: accessibilityScanResults,
            options: {
                projectKey: "QA_Portfolio_Tested",
                outputDir: "axe-reports",
                reportFileName: "tested-mode-a11y-report.html"
            }
        });
    }

    expect(accessibilityScanResults.violations).toEqual([]);
});

Then('the page should have known accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
    
    // We expect strict violations here because it's the buggy mode
    if (accessibilityScanResults.violations.length > 0) {
         createHtmlReport({
            results: accessibilityScanResults,
            options: {
                projectKey: "QA_Portfolio_Untested",
                outputDir: "axe-reports",
                reportFileName: "untested-mode-a11y-report.html"
            }
        });
    }

    expect(accessibilityScanResults.violations.length).toBeGreaterThan(0);
});
