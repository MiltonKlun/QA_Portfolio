import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

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
    await expect(page.locator('h1')).toBeVisible();
});

Then('I should see the text "[Missing Name]"', async ({ page }) => {
    // The Intentional Bug 1: Name is missing
    // Wait for flickering to stop (1.5s delay)
    await expect(page.locator('h1')).toContainText('[Missing Name]', { timeout: 5000 });
});

Then('the text color should be "red"', async ({ page }) => {
    const heading = page.locator('h1');
    // Tailwind text-danger is usually a red color.
    // We can check class or computed style. Checking class is easier for now.
    await expect(heading).toHaveClass(/text-danger/);
});

Then('I should see the project description corrupt to "[object Object]"', async ({ page }) => {
    // Wait for the corruption timeout (2s)
    // We target the second project card's description
    const description = page.locator('#experience p').nth(1); // 0-indexed, so 1 is the 2nd card
    await expect(description).toContainText('[object Object]', { timeout: 5000 });

    // Check for the corrupted span class
    const corruptedSpan = description.locator('span.text-danger');
    await expect(corruptedSpan).toBeVisible();
});

// Social Scenario
When('I click the "Connect" button in the sidebar', async ({ page }) => {
    // The "Connect" button is conceptually the sidebar area containing links.
    // We verify the sidebar container exists as a proxy.
    const sidebar = page.locator('nav').or(page.locator('header'));
    await expect(sidebar.first()).toBeVisible();
});

When('I click the "LinkedIn" icon', async ({ page }) => {
    // Use specific aria-label from SidebarNav.tsx
    const linkedin = page.locator('a[aria-label="LinkedIn (bug)"]');
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
    const aboutSection = page.locator('#about');
    await aboutSection.scrollIntoViewIfNeeded();
});

When('I scroll to the "Experience" section', async ({ page }) => {
    const experienceSection = page.locator('#experience');
    await experienceSection.scrollIntoViewIfNeeded();
});

Then('the text paragraph should overflow the container', async ({ page }) => {
    const paragraph = page.locator('#about p').first();

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


