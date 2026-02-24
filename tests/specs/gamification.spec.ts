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
        await untestedPage.bugCardTrigger.click();
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 1/5');
        await untestedPage.page.getByRole('button', { name: 'Continue Exploring' }).click();

        await expect(untestedPage.modal).not.toBeVisible();
        await untestedPage.techStackImages.first().click();
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 2/5');
    });

    test('Counter should NOT increment when the same bug is clicked twice', async () => {
        await untestedPage.bugCardTrigger.click();
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 1/5');
        await untestedPage.page.getByRole('button', { name: 'Continue Exploring' }).click();
        await expect(untestedPage.modal).not.toBeVisible();

        await untestedPage.bugCardTrigger.click();
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 1/5');
    });

    test('Counter should reset when navigating away and back', async () => {
        await untestedPage.bugCardTrigger.click();
        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 1/5');

        await untestedPage.page.goto('/');
        await untestedPage.goto();

        await expect(untestedPage.bugCounter).toContainText('Bugs Found: 0/5');
    });
});
