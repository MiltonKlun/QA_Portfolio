import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { UntestedPage } from '../pages/UntestedPage';
import { BasePage } from '../pages/BasePage';

const { Given, Then } = createBdd(test);

// Navigation Step (Specific to this feature to match the exact string)
Given('I navigate to the "Tested" portfolio page', async ({ page }) => {
    await page.goto('/tested');
});

// Snapshot Assertions
Given('I toggle the application theme to {string}', async ({ page }, theme: string) => {
    // Check current theme by looking at the HTML class or data-theme attribute
    // The portfolio app uses `class="dark"` on the HTML element for dark mode
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const wantsDark = theme.toLowerCase() === 'dark';
    
    if (isDark !== wantsDark) {
        const basePage = new BasePage(page);
        await basePage.toggleTheme();
        // Wait for the class to be applied to ensure transition finishes before snapshot
        if (wantsDark) {
            await expect(page.locator('html')).toHaveClass(/dark/);
        } else {
            await expect(page.locator('html')).not.toHaveClass(/dark/);
        }
    }
});

// Snapshot Assertions
Then('the page should match the {string} snapshot', async ({ page }, snapshotName: string) => {
    // We rely on default Playwright snapshot naming or pass a name
    // Passing a name makes it explicit and easier to manage
    await expect(page).toHaveScreenshot(`${snapshotName}.png`, { fullPage: true });
});

Then('the page should match the {string} snapshot with masking', async ({ page }, snapshotName: string) => {
    // Masking the flickering name (h1 span)
    // Also masking the "Connect" links section if it has any hover effects active?
    // And possibly the "Experience" section if the corruption is mid-animation?
    // We waited 3 seconds, so likely stable.
    // The "flickering name" is the main random element.
    // Also the footer date or any time-based element? None known.
    
    // Masking syntax: mask: [locator, locator...]
    const nameHeader = new UntestedPage(page).ownerNameSpanLocator;
    
    await expect(page).toHaveScreenshot(`${snapshotName}.png`, { 
        fullPage: true,
        mask: [nameHeader],
        // Increasing threshold slightly for anti-aliasing diffs across machines if needed
        // but default is usually fine for same-machine (localhost).
    });
});
