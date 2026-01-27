import { test, expect } from '@playwright/test';
import { UntestedPage } from '../pages/UntestedPage';

test.describe('Gamification: Bug Counter', () => {
    let untestedPage: UntestedPage;

    test.beforeEach(async ({ page }) => {
        untestedPage = new UntestedPage(page);
        await untestedPage.goto();
    });

    test('Counter should start at 0/5', async () => {
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 0/5');
    });

    test('Counter should increment when a unique bug is clicked', async () => {
        // Click 1st bug: Missing Name
        await untestedPage.bugCardTrigger.click();
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 1/5');
        // Close modal via button
        await untestedPage.page.getByRole('button', { name: 'Continue Exploring' }).click();

        // Click 2nd bug: Tech Stack
        // Wait for modal to close fully
        await expect(untestedPage.modal).not.toBeVisible();
        await untestedPage.techStackImages.first().click();
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 2/5');
    });

    test('Counter should NOT increment when the same bug is clicked twice', async () => {
        // Click 1st bug
        await untestedPage.bugCardTrigger.click();
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 1/5');
        await untestedPage.page.getByRole('button', { name: 'Continue Exploring' }).click();
        await expect(untestedPage.modal).not.toBeVisible();

        // Click 1st bug again
        await untestedPage.bugCardTrigger.click();
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 1/5');
    });

    test('Counter should reset when navigating away and back', async () => {
        // Find a bug
        await untestedPage.bugCardTrigger.click();
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 1/5');

        // Navigate away (to Home/Tested) - simplistic check by reloading or going root
        await untestedPage.page.goto('/');
        await untestedPage.goto();

        // Check reset
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 0/5');
    });
});
