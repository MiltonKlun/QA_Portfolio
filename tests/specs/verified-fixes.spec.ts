import { test, expect } from '@playwright/test';
import { TestedPage } from '../pages/TestedPage';

test.describe('The "Tested" Experience (Verified Mode)', () => {
    let testedPage: TestedPage;

    test.beforeEach(async ({ page }) => {
        testedPage = new TestedPage(page);
        await testedPage.goto();
    });

    test('Fix #1: Owner Name should be present', async () => {
        await expect(testedPage.ownerName).toBeVisible();
        await expect(testedPage.ownerName).not.toContainText('[Missing Name]');
        await expect(testedPage.ownerName).toContainText('Milton Klun');
    });

    test('Fix #2: Social Links should be valid', async () => {
        const links = testedPage.socialLinks;
        const count = await links.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; ++i) {
            const href = await links.nth(i).getAttribute('href');
            expect(href).toMatch(/^(https:\/\/|mailto:)/);
            expect(href).not.toContain('undefined');
        }
    });

    test('Fix #3: Tech Stack images should be valid', async () => {
        const images = testedPage.techStackImages;
        const count = await images.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; ++i) {
            await expect(images.nth(i)).toBeVisible();
            const src = await images.nth(i).getAttribute('src');
            expect(src).not.toContain('undefined');
        }
    });

    test('Fix #4: Progress Data should be a number', async () => {
        const text = await testedPage.progressValue.innerText();
        expect(text).not.toContain('NaN');
        expect(text).toMatch(/\d+%/);
    });
});
