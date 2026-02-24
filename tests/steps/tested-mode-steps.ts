import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { TestedPage } from '../pages/TestedPage';
import { BasePage } from '../pages/BasePage';

const { Given, When, Then } = createBdd(test);

When('I click the "Switch to Tested Version" toggle', async ({ page }) => {
    const backButton = new BasePage(page).backButtonLocator;
    await backButton.click();
    await page.waitForURL('**/');

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
    await expect(new BasePage(page).getHeadingLocator(text)).toBeVisible();
});

Then('the Tech Stack images should load correctly', async ({ page }) => {
    const images = new TestedPage(page).techStackImagesLocator;
    await expect(images.first()).toBeVisible();

    const count = await images.count();
    for (let i = 0; i < count; ++i) {
        const img = images.nth(i);
        const width = await img.evaluate((node) => (node as HTMLImageElement).naturalWidth);
        expect(typeof width).toBe('number');
        expect(width).toBeGreaterThan(0);
    }
});

Given('I am on the "Tested" page', async ({ page }) => {
    await page.goto('/tested');
});

When('I hover over the "Green Tick" badge in the About section', async ({ page }) => {
    const badge = new TestedPage(page).getVerifiedBadgesLocator();
    await expect(badge.first()).toBeVisible({ timeout: 5000 });
});

Then('I should see a tooltip with {string}', async ({ page }, text: string) => {
    const elementWithTitle = new TestedPage(page).getVerifiedBadgeLocator(text);
    await expect(elementWithTitle.first()).toBeVisible();
});

Then('the tooltip should reference the test file {string}', async ({ page }, filename: string) => {
    try {
        await expect(page.getByText(filename)).toBeVisible({ timeout: 1000 });
    } catch {
        const elementWithTitle = new TestedPage(page).getVerifiedBadgeLocator(filename);
        await expect(elementWithTitle).toBeVisible();
    }
});
