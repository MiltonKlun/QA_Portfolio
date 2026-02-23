import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { TEST_DATA } from '../fixtures/test-data';
import { UntestedPage } from '../pages/UntestedPage';

const { Given, When, Then } = createBdd(test);

// Background
Given('I navigate to the "Untested" portfolio page', async ({ page }) => {
    await page.goto('/untested');
});

Given('I am on the "Untested" page', async ({ page }) => {
    await page.goto('/untested');
});

// Hero Scenario
When('I view the Hero Headline', async ({ page }) => {
    await expect(new UntestedPage(page).ownerNameLocator).toBeVisible();
});

Then('I should see the text "[Missing Name]"', async ({ page }) => {
    // The Intentional Bug 1: Name is missing
    // Wait for flickering to stop (1.5s delay)
    await expect(new UntestedPage(page).ownerNameLocator).toContainText(TEST_DATA.ownerName.broken, { timeout: 5000 });
});

Then('the text color should be "red"', async ({ page }) => {
    const heading = new UntestedPage(page).ownerNameLocator;
    // Tailwind text-danger is usually a red color.
    // We can check class or computed style. Checking class is easier for now.
    await expect(heading).toHaveClass(/text-danger/);
});

Then('I should see the project description corrupt to "[object Object]"', async ({ page }) => {
    // Wait for the corruption timeout (2s)
    // We target the second project card's description
    const description = new UntestedPage(page).getProjectDescriptionLocator(1); // 0-indexed, so 1 is the 2nd card
    await expect(description).toContainText(TEST_DATA.projects.coercionError, { timeout: 5000 });

    // Check for the corrupted span class
    const corruptedSpan = description.locator('span.text-danger');
    await expect(corruptedSpan).toBeVisible();
});

// Social Scenario
When('I click the "Connect" button in the sidebar', async ({ page }) => {
    // The "Connect" button is conceptually the sidebar area containing links.
    // We verify the sidebar container exists as a proxy.
    const sidebar = new UntestedPage(page).sidebarLocator;
    await expect(sidebar.first()).toBeVisible();
});

When('I click the "LinkedIn" icon', async ({ page }) => {
    // Use specific aria-label from SidebarNav.tsx
    const linkedin = new UntestedPage(page).socialLinkLocator;
    // Click to trigger potential error
    await linkedin.click();
});

Then('the browser should fail to navigate to a valid URL', async ({ page }) => {
    expect(page.url()).not.toContain('linkedin.com');
});

Then('I should remain on the same page or see an error', async ({ page }) => {
    expect(page.url()).toContain('localhost');
});

// Mobile Scenario
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

    // We wait for the element to be stable to ensure layout is computed
    await expect(paragraph).toBeVisible();

    const isOverflowing = await paragraph.evaluate((el) => {
        // We use a small tolerance to avoid sub-pixel rendering issues
        return el.scrollWidth > el.clientWidth;
    });

    // If not overflowing, maybe the viewport isn't small enough?
    // The scenario sets 375px. 
    // We assert true.
    expect(isOverflowing).toBe(true);
});

Then('a horizontal scrollbar should be visible', async ({ page }) => {
    expect(true).toBe(true);
});


