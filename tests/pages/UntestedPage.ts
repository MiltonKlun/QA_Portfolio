import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class UntestedPage extends BasePage {
    readonly ownerName: Locator;
    readonly socialLink: Locator;
    readonly techStackImages: Locator;
    readonly progressValue: Locator;
    readonly aboutText: Locator;
    readonly bugCardTrigger: Locator;
    readonly modal: Locator;
    readonly modalJiraButton: Locator;
    readonly bugCounter: Locator;

    constructor(page: Page) {
        super(page);
        // Locating by text or accessible role where possible to simulate user behavior
        this.ownerName = page.locator('h1', { hasText: 'Missing Name' });
        this.socialLink = page.locator('a[href*="http:///"]'); // Malformed link
        this.techStackImages = page.locator('svg.text-danger\\/50'); // The <ImageOff /> icon class
        this.progressValue = page.locator('text=NaN%'); // Broken data
        this.aboutText = page.locator('#about p').first(); // For CSS check

        // UI Interaction elements
        this.bugCardTrigger = page.locator('text=Missing Name'); // Triggers modal
        this.modal = page.locator('.bg-card.shadow-2xl'); // Modal container
        this.modal = page.locator('.bg-card.shadow-2xl'); // Modal container
        this.modalJiraButton = page.locator('button:has-text("View on Github")');
        this.bugCounter = page.locator('text=Bugs Found:');
    }

    async goto() {
        await this.navigateTo('/untested');
    }

    async triggerBugModal() {
        await this.ownerName.click();
    }
}
