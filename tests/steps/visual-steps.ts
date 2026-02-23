import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { UntestedPage } from '../pages/UntestedPage';

const { Given, When, Then } = createBdd(test);

// Navigation Step (Specific to this feature to match the exact string)
Given('I navigate to the "Tested" portfolio page', async ({ page }) => {
    await page.goto('/tested');
});

// Snapshot Assertions
Then('the page should match the "tested-mode" snapshot', async ({ page }) => {
    // We rely on default Playwright snapshot naming or pass a name
    // Passing a name makes it explicit and easier to manage
    await expect(page).toHaveScreenshot('tested-mode.png', { fullPage: true });
});

Then('the page should match the "untested-mode" snapshot with masking', async ({ page }) => {
    // Masking the flickering name (h1 span)
    // Also masking the "Connect" links section if it has any hover effects active?
    // And possibly the "Experience" section if the corruption is mid-animation?
    // We waited 3 seconds, so likely stable.
    // The "flickering name" is the main random element.
    // Also the footer date or any time-based element? None known.
    
    // Masking syntax: mask: [locator, locator...]
    const nameHeader = new UntestedPage(page).ownerNameSpanLocator;
    
    await expect(page).toHaveScreenshot('untested-mode.png', { 
        fullPage: true,
        mask: [nameHeader],
        // Increasing threshold slightly for anti-aliasing diffs across machines if needed
        // but default is usually fine for same-machine (localhost).
    });
});
