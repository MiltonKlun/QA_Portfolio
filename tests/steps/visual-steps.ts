import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { UntestedPage } from '../pages/UntestedPage';
import { BasePage } from '../pages/BasePage';

const { Given, Then } = createBdd(test);

Given('I navigate to the "Tested" portfolio page', async ({ page }) => {
    await page.goto('/tested');
});

Given('I toggle the application theme to {string}', async ({ page }, theme: string) => {
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const wantsDark = theme.toLowerCase() === 'dark';
    
    if (isDark !== wantsDark) {
        const basePage = new BasePage(page);
        await basePage.toggleTheme();
        if (wantsDark) {
            await expect(page.locator('html')).toHaveClass(/dark/);
        } else {
            await expect(page.locator('html')).not.toHaveClass(/dark/);
        }
    }
});

Then('the page should match the {string} snapshot', async ({ page }, snapshotName: string) => {
    await expect(page).toHaveScreenshot(`${snapshotName}.png`, { fullPage: true });
});

Then('the page should match the {string} snapshot with masking', async ({ page }, snapshotName: string) => {
    
    const nameHeader = new UntestedPage(page).ownerNameSpanLocator;
    
    await expect(page).toHaveScreenshot(`${snapshotName}.png`, { 
        fullPage: true,
        mask: [nameHeader],
    });
});
