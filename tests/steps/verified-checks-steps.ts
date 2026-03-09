import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/pom-fixtures';
import { expect } from '@playwright/test';
import { TestedPage } from '../pages/TestedPage';
import { BasePage } from '../pages/BasePage';

const { Given, When, Then } = createBdd(test);

Then('I should see the "CHECKS" toggle button', async ({ page }) => {
    await expect(new BasePage(page).checksToggleLocator).toBeVisible();
});

Then('the "CHECKS" toggle should be OFF', async ({ page }) => {
    const basePage = new BasePage(page);
    await expect(basePage.checksToggleOffLocator).toBeVisible();
    await expect(basePage.checksToggleOnLocator).not.toBeVisible();
});

Then('the "CHECKS" toggle should be ON', async ({ page }) => {
    await expect(new BasePage(page).checksToggleOnLocator).toBeVisible();
});

When('I click the "CHECKS" toggle button', async ({ page }) => {
    const button = new BasePage(page).checksToggleLocator;
    await button.click();
});

Given('the "CHECKS" toggle is ON', async ({ page }) => {
    const basePage = new BasePage(page);
    const button = basePage.checksToggleLocator;
    const text = await button.textContent();
    if (text === 'CHECKS') {
        await button.click();
    }
    await expect(button).toHaveText('CHECKS ON');
});

Then('the verified checkmarks should be hidden', async ({ page }) => {
    const testedPage = new TestedPage(page);
    const aboutCheck = testedPage.getVerifiedBadgeLocator('Responsive text verified').first();
    await expect(aboutCheck).toHaveCSS('opacity', '0');

    const nameCheck = testedPage.getVerifiedBadgeLocator('Name display verified').first();
    await expect(nameCheck).toHaveCSS('opacity', '0');

    const socialCheck = testedPage.getVerifiedBadgeLocator('Social links verified').first();
    await expect(socialCheck).toHaveCSS('opacity', '0');
});

Then('the verified checkmarks should be visible', async ({ page }) => {
    const testedPage = new TestedPage(page);
    const aboutCheck = testedPage.getVerifiedBadgeLocator('Responsive text verified').first();
    await expect(aboutCheck).toHaveCSS('opacity', '1');

    const nameCheck = testedPage.getVerifiedBadgeLocator('Name display verified').first();
    await expect(nameCheck).toHaveCSS('opacity', '1');

    const socialCheck = testedPage.getVerifiedBadgeLocator('Social links verified').first();
    await expect(socialCheck).toHaveCSS('opacity', '1');
});

Then('I should see "VERIFIED" in the header', async ({ page }) => {
    await expect(new BasePage(page).getTextLocator('VERIFIED', true)).toBeVisible();
});

Then('I should not see "Back to Lobby" in the header', async ({ page }) => {
    await expect(new BasePage(page).getTextLocator('Back to Lobby')).not.toBeVisible();
});

Then('I should not see "QA VERIFIED" in the header', async ({ page }) => {
    await expect(new BasePage(page).getTextLocator('QA VERIFIED')).not.toBeVisible();
});
