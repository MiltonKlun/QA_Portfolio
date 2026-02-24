import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { UntestedPage } from '../pages/UntestedPage';

const { Given, When, Then } = createBdd(test);

Then('I should see the "Hints" toggle button in the header', async ({ page }) => {
    await expect(new BasePage(page).hintsToggleLocator).toBeVisible();
});

Then('the "Hints" toggle should be "OFF" by default', async ({ page }) => {
    const basePage = new BasePage(page);
    await expect(basePage.hintsToggleOffLocator).toBeVisible();
    await expect(basePage.hintsPulsesLocator.first()).not.toBeVisible();
});

When('I toggle the "Hints" switch to "ON"', async ({ page }) => {
    await new BasePage(page).hintsToggleLocator.click();
});

Given('I have toggled the "Hints" switch to "ON"', async ({ page }) => {
    await new BasePage(page).hintsToggleLocator.click();
});

Then('I should see pulsing red dots near the bugs', async ({ page }) => {
    await expect(new BasePage(page).hintsPulsesLocator.first()).toBeVisible();
});

Then('the "Hints" toggle should indicate "ON"', async ({ page }) => {
    await expect(new BasePage(page).hintsToggleOnLocator).toBeVisible();
});

Then('the hint for "Missing Name" should disappear', async ({ page }) => {
    const untestedPage = new UntestedPage(page);
    await expect(untestedPage.getHintsPulseLocatorFor(untestedPage.ownerNameLocator)).not.toBeVisible();
});

Then('the hint for "Social Links" should still be visible', async ({ page }) => {
    const untestedPage = new UntestedPage(page);
    await expect(untestedPage.getHintsPulseLocatorFor(untestedPage.sidebarLocator).first()).toBeVisible();
});

const nuclearClick = async (_page: Page, locator: Locator) => {
    await locator.scrollIntoViewIfNeeded();
    await locator.evaluate((el: HTMLElement) => {
        el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    });
};

When('I click the {string} bug', async ({ page }, bugName: string) => {
    const untestedPage = new UntestedPage(page);
    if (bugName === "Missing Name") {
        await nuclearClick(page, untestedPage.ownerNameLocator);
    } else if (bugName === "Social Links") {
        await nuclearClick(page, untestedPage.socialLinkLocator);
    }
});
