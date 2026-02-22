import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

// Scenario: Toggling to Tested Mode repairs the application
When('I click the "Switch to Tested Version" toggle', async ({ page }) => {
    // Navigate back to the lobby from the Untested page
    const backButton = page.locator('a[aria-label="Back to Home"]').first();
    await backButton.click();
    await page.waitForURL('**/');

    // Now click "Launch Verified" on the landing page
    await page.getByRole('link', { name: /Launch Verified/i }).click();
    await page.waitForURL('**/tested');
});

Then('I should be redirected to the "Tested" page', async ({ page }) => {
    await expect(page).toHaveURL(/.*\/tested/);
});

Then('the URL should contain {string}', async ({ page }, urlPart: string) => {
    await expect(page).toHaveURL(new RegExp(urlPart));
});

Then('the Hero Headline should display {string}', async ({ page }, text: string) => {
    // The text might be in H1 or H2 depending on the layout/semantic structure.
    await expect(page.locator('h1, h2').filter({ hasText: text }).first()).toBeVisible();
});

Then('the Tech Stack images should load correctly', async ({ page }) => {
    const images = page.locator('#skills img');
    await expect(images.first()).toBeVisible();

    // Check for broken images
    const count = await images.count();
    for (let i = 0; i < count; ++i) {
        const img = images.nth(i);
        const width = await img.evaluate((node) => (node as HTMLImageElement).naturalWidth);
        expect(typeof width).toBe('number');
        expect(width).toBeGreaterThan(0);
    }
});

// Scenario: Verified Badges link to Code
Given('I am on the "Tested" page', async ({ page }) => {
    await page.goto('/tested');
});

When('I hover over the "Green Tick" badge in the About section', async ({ page }) => {
    // The green tick is inside the h2 on mobile, or a separate button on desktop.
    // Look for any *visible* button with title containing "verified" inside the #about section.
    const badge = page.locator('#about button[title*="verified"]:visible');
    await expect(badge.first()).toBeVisible({ timeout: 5000 });
});

Then('I should see a tooltip with {string}', async ({ page }, text: string) => {
    // Check for a title attribute matching the expected text
    // Check for a title attribute matching the expected text
    const elementWithTitle = page.locator(`[title="${text}"]:visible`);
    await expect(elementWithTitle.first()).toBeVisible();
});

Then('the tooltip should reference the test file {string}', async ({ page }, filename: string) => {
    // Check for visible text (custom tooltip) OR title attribute (native tooltip)
    try {
        await expect(page.getByText(filename)).toBeVisible({ timeout: 1000 });
    } catch (e) {
        // Fallback: Check for title attribute on any visible element
        const elementWithTitle = page.locator(`[title="${filename}"]:visible`);
        await expect(elementWithTitle).toBeVisible();
    }
});
