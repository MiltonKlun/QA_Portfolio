import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TestedPage extends BasePage {
    private readonly _ownerName: Locator;
    private readonly _socialLinks: Locator;
    private readonly _techStackImages: Locator;
    private readonly _progressValue: Locator;

    constructor(page: Page) {
        super(page);
        this._ownerName = page.locator('h1', { hasText: 'Milton Klun' });
        this._socialLinks = page.locator('a[href^="https://"]'); // Valid links
        this._techStackImages = page.locator('img[alt]');
        this._progressValue = page.locator('text=%');
    }

    async goto() {
        await this.navigateTo('/tested');
    }

    get ownerNameLocator() { return this._ownerName; }
    get socialLinksLocator() { return this._socialLinks; }
    get techStackImagesLocator() { return this._techStackImages; }
    get progressValueLocator() { return this._progressValue; }

    getVerifiedBadgeLocator(title: string) {
        return this.page.locator(`[title="${title}"]:visible`);
    }

    getVerifiedBadgesLocator() {
        return this.page.locator('#about button[title*="verified"]:visible');
    }
}
