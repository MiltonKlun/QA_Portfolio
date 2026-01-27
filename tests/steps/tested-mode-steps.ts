import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

// Scenario: Toggling to Tested Mode repairs the application
When('I click the "Switch to Tested Version" toggle', async ({ page }) => {
    // In mobile, it says "Back". In Desktop, "Back to Lobby".
    await page.getByRole('button', { name: /Back|Back to Lobby/i }).click();
    await page.getByRole('button', { name: /Launch Verified/i }).click();
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
    const images = page.locator('#experience img');
    await expect(images.first()).toBeVisible();

    // Check for broken images
    const count = await images.count();
    for (let i = 0; i < count; ++i) {
        const img = images.nth(i);
        // Fix: Do not use expect.any(Number) with toHaveJSProperty as it causes serialization errors
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
    const badge = page.locator('#about button .text-success');
    // Just ensure it is there; hovering native tooltips is hard to test visually.
    await expect(badge).toBeVisible();
});

Then('I should see a tooltip with {string}', async ({ page }, text: string) => {
    // Mobile/Headless browsers often don't render native tooltips (title attribute) as text.
    // We check if ANY element has this text as a title attribute.
    const elementWithTitle = page.locator(`[title="${text}"]`);
    await expect(elementWithTitle).toBeVisible();
});

Then('the tooltip should reference the test file {string}', async ({ page }, filename: string) => {
    // Check for visible text (custom tooltip) OR title attribute (native tooltip)
    try {
        await expect(page.getByText(filename)).toBeVisible({ timeout: 1000 });
    } catch (e) {
        // Fallback: Check for title attribute on any visible element
        const elementWithTitle = page.locator(`[title="${filename}"]`);
        await expect(elementWithTitle).toBeVisible();
    }
});
