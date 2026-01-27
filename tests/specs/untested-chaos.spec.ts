import { test, expect } from '@playwright/test';
import { UntestedPage } from '../pages/UntestedPage';

test.describe('The "Untested" Experience (Chaos Mode)', () => {
    let untestedPage: UntestedPage;

    test.beforeEach(async ({ page }) => {
        untestedPage = new UntestedPage(page);
        await untestedPage.goto();
    });

    test('Bug #1: Name should be missing (Null Reference)', async () => {
        await expect(untestedPage.ownerName).toBeVisible();
        await expect(untestedPage.ownerName).toContainText('[Missing Name]');
    });

    test('Bug #2: Social Links should be broken', async () => {
        // Check at least one social link has the malformed href
        const count = await untestedPage.socialLink.count();
        expect(count).toBeGreaterThan(0);
        const firstLink = untestedPage.socialLink.first();
        await expect(firstLink).toHaveAttribute('href', /http:\/\/\/|null|undefined/);
    });

    test('Bug #3: Tech Stack icons should be broken', async () => {
        // Expect at least some images to use the broken source
        await expect(untestedPage.techStackImages.first()).toBeVisible();
    });

    test('Bug #4: Progress Data should be NaN', async () => {
        await expect(untestedPage.progressValue).toBeVisible();
        await expect(untestedPage.progressValue).toContainText('NaN%');
    });

    test('UI Interaction: Bug Modal should contain reproduction steps', async () => {
        await untestedPage.triggerBugModal();
        await expect(untestedPage.modal).toBeVisible();
        await expect(untestedPage.modal).toContainText('Business Impact');
        await expect(untestedPage.modalJiraButton).toBeVisible();
    });
});
