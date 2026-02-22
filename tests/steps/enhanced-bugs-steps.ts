import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

// Reusing "I am on the "Untested Mode" page" from other steps if possible, 
// but defining here for completeness/isolation or mapped via bddgen.
// If it duplicates, bddgen might complain, so I will use a specific one or rely on existing.
// Let's use the one from `untested-steps.ts` if it matches string exactly.
// String: 'I am on the "Untested Mode" page' -> Matches `time-bomb-steps.ts` (if kept) or similar.
// Actually, `untested-steps.ts` has 'I navigate to the "Untested" portfolio page' and 'I am on the "Untested" page'.
// `time-bomb-steps.ts` had 'I am on the "Untested Mode" page'. I verified the user deleted it.
// So I will define it here to be safe.

Given('I am on the "Untested Mode" page', async ({ page }) => {
    await page.goto('/untested');
});

When('I look at the Portfolio Owner Name', async ({ page }) => {
    const nameHeader = page.locator('h1');
    await expect(nameHeader).toBeVisible();
    await nameHeader.scrollIntoViewIfNeeded();
});

Then('the name should flicker through garbage values', async ({ page }) => {
    const nameHeader = page.locator('h1 span').first();
    
    // We poll the text content rapidly to catch the flickering values
    // The flicker interval is 100ms.
    const garbageValues = ["null", "undefined", "NaN", "[Object]", "Error", "void"];
    let caughtGarbage = false;

    // Try for 1 second to catch a garbage value
    const start = Date.now();
    while (Date.now() - start < 1000) {
        const text = await nameHeader.innerText();
        if (garbageValues.includes(text)) {
            caughtGarbage = true;
            break;
        }
        await page.waitForTimeout(50);
    }
    
    // It's possible we miss it in a headless run if it's too fast, but 100ms is usually catchable.
    // If we are late (page loaded > 1.5s ago), it might already be fixed to [Missing Name].
    // Given the step "I am on..." navigates, we should catch it.
    expect(caughtGarbage).toBeTruthy();
});

Then('eventually settle on "[Missing Name]"', async ({ page }) => {
    const nameHeader = page.locator('h1');
    await expect(nameHeader).toContainText('[Missing Name]', { timeout: 3000 });
});

// Duplicate step removed: When('I scroll to the "Experience" section'...)

When('I wait for {int} seconds', async ({ page }, seconds: number) => {
    await page.waitForTimeout(seconds * 1000);
});

Then('the second project description should corrupt to "[object Object]"', async ({ page }) => {
    // 2nd project card -> index 1
    // The structure in ProjectsSection.tsx: .group > div > p
    // We can target by text or order.
    // Untested logic: const showDataBug = isUntested && index === 1;

    // Use a more specific locator to avoid matching potential wrapper groups
    const secondCard = page.locator('#experience .group').filter({ hasText: 'Healthcare App' });
    const secondDescription = secondCard.getByText('[object Object]');
    await expect(secondDescription).toBeVisible({ timeout: 5000 });
});

Then('the corrupted text should have the "text-danger" class', async ({ page }) => {
     const secondCard = page.locator('#experience .group').filter({ hasText: 'Healthcare App' });
     const secondDescriptionSpan = secondCard.locator('span.text-danger.animate-pulse');
     await expect(secondDescriptionSpan).toBeVisible();
});
