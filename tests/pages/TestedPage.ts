import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TestedPage extends BasePage {
    readonly ownerName: Locator;
    readonly socialLinks: Locator;
    readonly techStackImages: Locator;
    readonly progressValue: Locator;

    constructor(page: Page) {
        super(page);
        this.ownerName = page.locator('h1', { hasText: 'Milton Klun' });
        this.socialLinks = page.locator('a[href^="https://"]'); // Valid links
        this.techStackImages = page.locator('img[alt]');
        this.progressValue = page.locator('text=%');
    }

    async goto() {
        await this.navigateTo('/tested');
    }
}
