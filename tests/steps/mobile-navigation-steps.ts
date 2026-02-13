import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('I am viewing on a mobile device', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
});

Then('the bottom navigation bar should be visible', async ({ page }) => {
    const mobileNav = page.locator('nav').filter({ hasText: 'About' }).last();
    // ensuring we target the one with About/Skills/Experience icons, usually rendered last
    await expect(mobileNav).toBeVisible();
});

Then('the bottom navigation should contain {string}, {string}, and {string} links', async ({ page, }, arg1, arg2, arg3) => {
    // Mobile nav items are buttons
    await expect(page.getByRole('button', { name: arg1, exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: arg2, exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: arg3, exact: true })).toBeVisible();
});

Then('the sidebar navigation should be hidden', async ({ page }) => {
    const sidebarNavLink = page.getByRole('button', { name: 'About Me' });
    await expect(sidebarNavLink).toBeHidden();
});

When('I tap on {string} in the bottom navigation', async ({ page }, linkName) => {
    await page.getByRole('button', { name: linkName, exact: true }).click();
});

Then('I should be scrolled to the {string} section', async ({ page }, sectionId) => {
    const section = page.locator(`#${sectionId}`);
    await expect(section).toBeInViewport();
});
