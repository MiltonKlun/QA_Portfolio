import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { TestedPage } from '../pages/TestedPage';

const { Given, When, Then } = createBdd(test);

Then('I should see the "CHECKS" toggle button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /CHECKS/i })).toBeVisible();
});

Then('the "CHECKS" toggle should be OFF', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'CHECKS', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'CHECKS ON' })).not.toBeVisible();
});

Then('the "CHECKS" toggle should be ON', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'CHECKS ON' })).toBeVisible();
});

When('I click the "CHECKS" toggle button', async ({ page }) => {
    const button = page.getByRole('button', { name: /CHECKS/i });
    await button.click();
});

Given('the "CHECKS" toggle is ON', async ({ page }) => {
    const button = page.getByRole('button', { name: /CHECKS/i });
    // If it says 'CHECKS', click it. If 'CHECKS ON', do nothing.
    const text = await button.textContent();
    if (text === 'CHECKS') {
        await button.click();
    }
    await expect(button).toHaveText('CHECKS ON');
});

Then('the verified checkmarks should be hidden', async ({ page }) => {
    const testedPage = new TestedPage(page);
    // Check opacity of a known checkmark button (About section)
    const aboutCheck = testedPage.getVerifiedBadgeLocator('Responsive text verified').first();
    await expect(aboutCheck).toHaveCSS('opacity', '0');

    // Check Name verified check (Sidebar)
    const nameCheck = testedPage.getVerifiedBadgeLocator('Name display verified').first();
    await expect(nameCheck).toHaveCSS('opacity', '0');

    // Check Social verified check (Sidebar)
    const socialCheck = testedPage.getVerifiedBadgeLocator('Social links verified').first();
    await expect(socialCheck).toHaveCSS('opacity', '0');
});

Then('the verified checkmarks should be visible', async ({ page }) => {
    const testedPage = new TestedPage(page);
    // Check About section
    const aboutCheck = testedPage.getVerifiedBadgeLocator('Responsive text verified').first();
    await expect(aboutCheck).toHaveCSS('opacity', '1');

    // Check Name verified check (Sidebar)
    const nameCheck = testedPage.getVerifiedBadgeLocator('Name display verified').first();
    await expect(nameCheck).toHaveCSS('opacity', '1');

    // Check Social verified check (Sidebar)
    const socialCheck = testedPage.getVerifiedBadgeLocator('Social links verified').first();
    await expect(socialCheck).toHaveCSS('opacity', '1');
});

Then('I should see "VERIFIED" in the header', async ({ page }) => {
    await expect(page.getByText('VERIFIED', { exact: true })).toBeVisible();
});

Then('I should not see "Back to Lobby" in the header', async ({ page }) => {
    await expect(page.getByText('Back to Lobby')).not.toBeVisible();
});

Then('I should not see "QA VERIFIED" in the header', async ({ page }) => {
    await expect(page.getByText('QA VERIFIED')).not.toBeVisible();
});
