import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect, Page, Locator } from '@playwright/test';
import { TEST_DATA } from '../fixtures/test-data';
import { UntestedPage } from '../pages/UntestedPage';

const { Given, When, Then } = createBdd(test);

// Scenario Outline: Clicking a bug opens the detailed Report Modal
// Steps:
// When I click on the <Element>
// Then the "Bug Report" modal should open
// And the modal title should be "<Title>"
// And the severity badge should display "<Severity>"

const nuclearClick = async (page: Page, locator: Locator) => {
    // Scroll and dispatch event to ensure React catches it even if obscured
    await locator.scrollIntoViewIfNeeded();
    await locator.evaluate((el: HTMLElement) => {
        el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    });
};

When('I click on the [Missing Name] Text', async ({ page }) => {
    await nuclearClick(page, new UntestedPage(page).ownerNameLocator);
});

When('I click on the Broken Tech Icon', async ({ page }) => {
    await nuclearClick(page, new UntestedPage(page).techStackImagesLocator.first());
});

When('I click on the [object Object]', async ({ page }) => {
    await nuclearClick(page, new UntestedPage(page).getBugCardTriggerLocatorByText(TEST_DATA.projects.coercionError));
});

When('I click on the [object Object] Text', async ({ page }) => {
    await nuclearClick(page, new UntestedPage(page).getBugCardTriggerLocatorByText(TEST_DATA.projects.coercionError));
});

Then('the "Bug Report" modal should open', async ({ page }) => {
    const untestedPage = new UntestedPage(page);
    await expect(untestedPage.bugCounterLocator).toBeVisible();
    await expect(untestedPage.modalLocator.first()).toBeVisible({ timeout: 5000 });
});

Then('the modal title should be {string}', async ({ page }, title: string) => {
    await expect(new UntestedPage(page).modalLocator.first()).toContainText(title);
});

Then('the severity badge should display {string}', async ({ page }, severity: string) => {
    await expect(new UntestedPage(page).modalLocator.first()).toContainText(severity);
});

// Scenario: Unlocking the Job Done modal
Given('I have already found 4 bugs', async ({ page }) => {
    const untestedPage = new UntestedPage(page);

    // 1. Name [Missing Name]
    await nuclearClick(page, untestedPage.ownerNameLocator);
    await expect(untestedPage.modalLocator).toBeVisible();
    await untestedPage.modalCloseButtonLocator.click();
    await expect(untestedPage.modalLocator).toBeHidden();

    // 2. Tech Stack (Broken Icon)
    await nuclearClick(page, untestedPage.techStackImagesLocator.first());
    await expect(untestedPage.modalLocator).toBeVisible();
    await untestedPage.modalCloseButtonLocator.click();
    await expect(untestedPage.modalLocator).toBeHidden();

    // 3. Projects ([object Object])
    await nuclearClick(page, untestedPage.getBugCardTriggerLocatorByText(TEST_DATA.projects.coercionError));
    await expect(untestedPage.modalLocator).toBeVisible();
    await untestedPage.modalCloseButtonLocator.click();
    await expect(untestedPage.modalLocator).toBeHidden();

    // 4. Responsive (About Text)
    await nuclearClick(page, untestedPage.aboutTextLocator);
    await expect(untestedPage.modalLocator).toBeVisible();
    await untestedPage.modalCloseButtonLocator.click();
    await expect(untestedPage.modalLocator).toBeHidden();
});

When('I click the last remaining bug', async ({ page }) => {
    await nuclearClick(page, new UntestedPage(page).socialLinkLocator);
});

When('I close the Bug Report modal', async ({ page }) => {
    await new UntestedPage(page).modalCloseButtonLocator.click();
});

Then('the "Job Done" completion modal should appear', async ({ page }) => {
    await expect(new UntestedPage(page).jobDoneModalLocator).toBeVisible();
});

Then('I should see a "Green Bug" icon', async ({ page }) => {
    await expect(new UntestedPage(page).jobDoneIconLocator).toBeVisible();
});
