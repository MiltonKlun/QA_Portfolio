import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

const { Given, When, Then } = createBdd(test);

Given('I am viewing on a mobile device', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
});

Then('the bottom navigation bar should be visible', async ({ page }) => {
    const mobileNav = new BasePage(page).mobileNavLocator;
    await expect(mobileNav).toBeVisible();
});

Then('the bottom navigation should contain {string}, {string}, and {string} links', async ({ page, }, arg1, arg2, arg3) => {
    const basePage = new BasePage(page);
    await expect(basePage.getMobileNavLinkLocator(arg1)).toBeVisible();
    await expect(basePage.getMobileNavLinkLocator(arg2)).toBeVisible();
    await expect(basePage.getMobileNavLinkLocator(arg3)).toBeVisible();
});

Then('the sidebar navigation should be hidden', async ({ page }) => {
    const sidebarNavLink = new BasePage(page).getSidebarLinkLocator('About Me');
    await expect(sidebarNavLink).toBeHidden();
});

When('I tap on {string} in the bottom navigation', async ({ page }, linkName) => {
    await new BasePage(page).getMobileNavLinkLocator(linkName).click();
});

Then('I should be scrolled to the {string} section', async ({ page }, sectionId) => {
    const section = new BasePage(page).getSectionLocatorById(sectionId);
    await expect(section).toBeInViewport();
});
