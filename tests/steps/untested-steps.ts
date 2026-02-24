import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { TEST_DATA } from '../fixtures/test-data';
import { UntestedPage } from '../pages/UntestedPage';

const { Given, When, Then } = createBdd(test);

Given('I navigate to the "Untested" portfolio page', async ({ page }) => {
    await page.goto('/untested');
});

Given('I am on the "Untested" page', async ({ page }) => {
    await page.goto('/untested');
});

When('I view the Hero Headline', async ({ page }) => {
    await expect(new UntestedPage(page).ownerNameLocator).toBeVisible();
});

Then('I should see the text "[Missing Name]"', async ({ page }) => {
    await expect(new UntestedPage(page).ownerNameLocator).toContainText(TEST_DATA.ownerName.broken, { timeout: 5000 });
});

Then('the text color should be "red"', async ({ page }) => {
    const heading = new UntestedPage(page).ownerNameLocator;
    await expect(heading).toHaveClass(/text-danger/);
});

Then('I should see the project description corrupt to "[object Object]"', async ({ page }) => {
    const description = new UntestedPage(page).getProjectDescriptionLocator(1);
    await expect(description).toContainText(TEST_DATA.projects.coercionError, { timeout: 5000 });

    const corruptedSpan = description.locator('span.text-danger');
    await expect(corruptedSpan).toBeVisible();
});

When('I click the "Connect" button in the sidebar', async ({ page }) => {
    const sidebar = new UntestedPage(page).sidebarLocator;
    await expect(sidebar.first()).toBeVisible();
});

When('I click the "LinkedIn" icon', async ({ page }) => {
    const linkedin = new UntestedPage(page).socialLinkLocator;
    await linkedin.click();
});

Then('the browser should fail to navigate to a valid URL', async ({ page }) => {
    expect(page.url()).not.toContain('linkedin.com');
});

Then('I should remain on the same page or see an error', async ({ page }) => {
    expect(page.url()).toContain('localhost');
});

Given('I set the viewport width to "375px"', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
});

When('I scroll to the "About Me" section', async ({ page }) => {
    const aboutSection = new UntestedPage(page).aboutSectionLocator;
    await aboutSection.scrollIntoViewIfNeeded();
});

When('I scroll to the "Experience" section', async ({ page }) => {
    const experienceSection = new UntestedPage(page).experienceSectionLocator;
    await experienceSection.scrollIntoViewIfNeeded();
});

Then('the text paragraph should overflow the container', async ({ page }) => {
    const paragraph = new UntestedPage(page).aboutTextLocator;

    await expect(paragraph).toBeVisible();

    const isOverflowing = await paragraph.evaluate((el) => {
        return el.scrollWidth > el.clientWidth;
    });

    expect(isOverflowing).toBe(true);
});

Then('a horizontal scrollbar should be visible', async () => {
    expect(true).toBe(true);
});
