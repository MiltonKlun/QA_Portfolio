import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Then('I should see the "Hints" toggle button in the header', async ({ page }) => {
    await expect(page.getByRole('button', { name: /HINTS/i })).toBeVisible();
});

Then('the "Hints" toggle should be "OFF" by default', async ({ page }) => {
    // Check looking for HINTS text which implies OFF state
    await expect(page.getByRole('button', { name: 'HINTS', exact: true })).toBeVisible();
    // Ensure no hints are visible
    await expect(page.locator('.animate-ping')).not.toBeVisible();
});

When('I toggle the "Hints" switch to "ON"', async ({ page }) => {
    await page.getByRole('button', { name: /HINTS/i }).click();
});

Given('I have toggled the "Hints" switch to "ON"', async ({ page }) => {
    await page.getByRole('button', { name: /HINTS/i }).click();
});

Then('I should see pulsing red dots near the bugs', async ({ page }) => {
    // Check for at least one visible hint
    await expect(page.locator('.animate-ping').first()).toBeVisible();
});

Then('the "Hints" toggle should indicate "ON"', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'HINTS ON' })).toBeVisible();
});

Then('the hint for "Missing Name" should disappear', async ({ page }) => {
    // The Missing Name hint is inside the h1
    const nameHint = page.locator('h1 .animate-ping');
    await expect(nameHint).not.toBeVisible();
});

Then('the hint for "Social Links" should still be visible', async ({ page }) => {
    // Social hint is in the social links container
    const socialHint = page.locator('[data-testid="social-links-container"] .animate-ping');
    await expect(socialHint.first()).toBeVisible();
});

When('I click the {string} bug', async ({ page }, bugName: string) => {
    // Map bug names to selectors
    if (bugName === "Missing Name") {
        await page.getByRole('heading', { name: /Missing Name/i }).click();
    } else if (bugName === "Social Links") {
        await page.locator('a[aria-label*="LinkedIn"]').click();
    }
});
