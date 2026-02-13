import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

// Scenario Outline: Clicking a bug opens the detailed Report Modal
// Steps:
// When I click on the <Element>
// Then the "Bug Report" modal should open
// And the modal title should be "<Title>"
// And the severity badge should display "<Severity>"

const nuclearClick = async (page: any, locator: any) => {
    // Scroll and dispatch event to ensure React catches it even if obscured
    await locator.scrollIntoViewIfNeeded();
    await locator.evaluate((el: HTMLElement) => {
        el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    });
};

When('I click on the [Missing Name] Text', async ({ page }) => {
    await nuclearClick(page, page.locator('h1', { hasText: '[Missing Name]' }));
});

When('I click on the Broken Tech Icon', async ({ page }) => {
    // Scope to experience section and handle 'border-danger/50' class
    await nuclearClick(page, page.locator('#skills [class*="border-danger"]').first());
});

When('I click on the [object Object]', async ({ page }) => {
    // This matches the Example table value "[object Object]"
    await nuclearClick(page, page.getByText('[object Object]', { exact: true }));
});

When('I click on the [object Object] Text', async ({ page }) => {
    // Kept for backward compatibility if other scenarios use it
    await nuclearClick(page, page.getByText('[object Object]', { exact: true }));
});

Then('the "Bug Report" modal should open', async ({ page }) => {
    // Debugging: Verify state change (Bug Count) to confirm click registered
    await expect(page.locator('text=/Bugs Found:/')).toBeVisible();

    // Allow animation time for modal
    await expect(page.getByRole('dialog').first()).toBeVisible({ timeout: 5000 });
});

Then('the modal title should be {string}', async ({ page }, title: string) => {
    await expect(page.getByRole('dialog').first()).toContainText(title);
});

Then('the severity badge should display {string}', async ({ page }, severity: string) => {
    await expect(page.getByRole('dialog').first()).toContainText(severity);
});

// Scenario: Unlocking the Job Done modal
Given('I have already found 4 bugs', async ({ page }) => {
    // We need to carefully click 4 UNIQUE bugs.

    // 1. Name [Missing Name]
    await nuclearClick(page, page.locator('h1', { hasText: '[Missing Name]' }));
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: /Close|Continue/i }).click();
    await expect(page.getByRole('dialog')).toBeHidden();

    // 2. Tech Stack (Broken Icon)
    await nuclearClick(page, page.locator('#skills [class*="border-danger"]').first());
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: /Close|Continue/i }).click();
    await expect(page.getByRole('dialog')).toBeHidden();

    // 3. Projects ([object Object])
    await nuclearClick(page, page.getByText('[object Object]', { exact: true }));
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: /Close|Continue/i }).click();
    await expect(page.getByRole('dialog')).toBeHidden();

    // 4. Responsive (About Text)
    // In Untested.tsx logic, clicking "Responsive" usually comes from the AboutSection container or specific handler.
    await nuclearClick(page, page.locator('#about p').first());

    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: /Close|Continue/i }).click();
    await expect(page.getByRole('dialog')).toBeHidden();
});

When('I click the last remaining bug', async ({ page }) => {
    // 5. Social Bug (LinkedIn) via Sidebar icon
    // Ensure we are in unteste mode logic (sidebar icons).
    // Using nuclearClick for mobile robustness
    const linkedin = page.locator('a[aria-label="LinkedIn (bug)"]');
    await nuclearClick(page, linkedin);
});

When('I close the Bug Report modal', async ({ page }) => {
    await page.getByRole('button', { name: /Close|Continue/i }).click();
});

Then('the "Job Done" completion modal should appear', async ({ page }) => {
    await expect(page.getByText('Job Done')).toBeVisible();
});

Then('I should see a "Green Bug" icon', async ({ page }) => {
    const icon = page.locator('.bg-success .lucide-bug');
    await expect(icon).toBeVisible();
});
