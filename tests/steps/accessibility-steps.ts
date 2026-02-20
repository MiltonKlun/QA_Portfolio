import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const { Given, When, Then } = createBdd(test);

// Navigation steps are reused from other step files:
// 'I navigate to the "Tested" portfolio page' -> visual-steps.ts
// 'I navigate to the "Untested" portfolio page' -> untested-steps.ts (or visual-steps if duplicate)

Then('the page should have no significant accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
    
    // We can attach the violations to the test report for better debugging
    if (accessibilityScanResults.violations.length > 0) {
        console.log('Tested Mode Violations:', JSON.stringify(accessibilityScanResults.violations, null, 2));
    }

    expect(accessibilityScanResults.violations).toEqual([]);
});

Then('the page should have known accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
    
    // We expect strict violations here because it's the buggy mode
    expect(accessibilityScanResults.violations.length).toBeGreaterThan(0);
});
