import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { TEST_DATA } from '../fixtures/test-data';
import { UntestedPage } from '../pages/UntestedPage';

const { Given, When, Then } = createBdd(test);

Given('I am on the "Untested Mode" page', async ({ page }) => {
    await page.goto('/untested');
});

When('I look at the Portfolio Owner Name', async ({ page }) => {
    const nameHeader = new UntestedPage(page).ownerNameLocator;
    await expect(nameHeader).toBeVisible();
    await nameHeader.scrollIntoViewIfNeeded();
});

Then('the name should flicker through garbage values', async ({ page }) => {
    const nameHeader = new UntestedPage(page).ownerNameSpanLocator;
    
    const garbageValues = ["null", "undefined", "NaN", "[Object]", "Error", "void"];
    let caughtGarbage = false;

    const start = Date.now();
    while (Date.now() - start < 1000) {
        const text = await nameHeader.innerText();
        if (garbageValues.includes(text)) {
            caughtGarbage = true;
            break;
        }
        await page.waitForTimeout(50);
    }
    
    expect(caughtGarbage).toBeTruthy();
});

Then('eventually settle on "[Missing Name]"', async ({ page }) => {
    const nameHeader = new UntestedPage(page).ownerNameLocator;
    await expect(nameHeader).toContainText(TEST_DATA.ownerName.broken, { timeout: 3000 });
});

When('I wait for {int} seconds', async ({ page }, seconds: number) => {
    await page.waitForTimeout(seconds * 1000);
});

Then('the second project description should corrupt to "[object Object]"', async ({ page }) => {

    const secondCard = new UntestedPage(page).getProjectCardLocator('CSA Pharma Framework');
    const secondDescription = secondCard.locator(`p span.text-danger:has-text("${TEST_DATA.projects.coercionError}")`);
    await expect(secondDescription).toBeVisible({ timeout: 5000 });
});

Then('the corrupted text should have the "text-danger" class', async ({ page }) => {
     const secondCard = new UntestedPage(page).getProjectCardLocator('CSA Pharma Framework');
     const secondDescriptionSpan = secondCard.locator(`p span.text-danger:has-text("${TEST_DATA.projects.coercionError}")`);
     await expect(secondDescriptionSpan).toBeVisible();
});
