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
        const hint = page.locator('.animate-ping');
        await expect(hint).not.toBeVisible();
    });

    test('Hints should appear when toggled ON', async ({ page }) => {
        await page.getByRole('button', { name: /HINTS\?/i }).click();

        await expect(page.getByRole('button', { name: /HINTS ON/i })).toBeVisible();

        await expect(page.locator('.animate-ping').first()).toBeVisible();
    });

    test('Hint should disappear after bug is found', async ({ page }) => {
        await page.getByRole('button', { name: /HINTS\?/i }).click();
        await expect(page.locator('.animate-ping').first()).toBeVisible();

        await page.getByRole('heading', { name: /Missing Name/i }).click();

        await page.getByRole('button', { name: /Continue/i }).click();

        const nameHint = page.locator('h1 .animate-ping');
        await expect(nameHint).not.toBeVisible();

        const socialHint = page.locator('.flex.items-center.gap-4 .animate-ping');
        await expect(socialHint.first()).toBeVisible();
    });
});
