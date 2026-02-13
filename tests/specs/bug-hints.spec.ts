import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

test.describe('Bug Hint System', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/untested');
    });

    test('Bug Hint Toggle should be present in Untested Mode', async ({ page }) => {
        const toggle = page.getByRole('button', { name: /HINTS\?/i });
        await expect(toggle).toBeVisible();
    });

    test('Hints should be hidden by default', async ({ page }) => {
        // Check for absence of hints (they use absolute positioning and specific class in BugHint.tsx)
        // We look for the "animate-ping" span which is characteristic of the hint
        const hint = page.locator('.animate-ping');
        await expect(hint).not.toBeVisible();
    });

    test('Hints should appear when toggled ON', async ({ page }) => {
        // Turn hints on
        await page.getByRole('button', { name: /HINTS\?/i }).click();

        // Verify button state changes
        await expect(page.getByRole('button', { name: /HINTS ON/i })).toBeVisible();

        // Verify hints appear (e.g. near Missing Name)
        // The hint is an absolute div inside the h1 for missing name
        // locator('.animate-ping') is the inner span of BugHint
        await expect(page.locator('.animate-ping').first()).toBeVisible();
    });

    test('Hint should disappear after bug is found', async ({ page }) => {
        // Turn hints on
        await page.getByRole('button', { name: /HINTS\?/i }).click();
        await expect(page.locator('.animate-ping').first()).toBeVisible();

        // Click the Missing Name bug
        await page.getByRole('heading', { name: /Missing Name/i }).click();

        // Close the modal
        await page.getByRole('button', { name: /Continue/i }).click();

        // Verify hint for Name bug is gone
        // We need to be specific about WHICH hint. The Missing Name hint is inside the h1.
        const nameHint = page.locator('h1 .animate-ping');
        await expect(nameHint).not.toBeVisible();

        // Verify other hints are still there (e.g. social)
        const socialHint = page.locator('.flex.items-center.gap-4 .animate-ping');
        await expect(socialHint.first()).toBeVisible();
    });
});
