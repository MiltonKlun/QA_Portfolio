import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class UntestedPage extends BasePage {
    private readonly _ownerName: Locator;
    private readonly _socialLink: Locator;
    private readonly _techStackImages: Locator;
    private readonly _progressValue: Locator;
    private readonly _aboutText: Locator;
    private readonly _bugCardTrigger: Locator;
    private readonly _modal: Locator;
    private readonly _modalJiraButton: Locator;
    private readonly _bugCounter: Locator;

    constructor(page: Page) {
        super(page);
        // Locating by text or accessible role where possible to simulate user behavior
        this._ownerName = page.locator('h1');
        this._socialLink = page.locator('a[aria-label="LinkedIn (bug)"]'); // Malformed link with explicit label
        this._techStackImages = page.locator('#skills [class*="border-danger"]'); // Broken tech icons under Skills section
        this._progressValue = page.locator('text=NaN%'); // Broken data
        this._aboutText = page.locator('#about p').first(); // For CSS check

        // UI Interaction elements
        this._bugCardTrigger = page.locator('text=Missing Name'); // Triggers modal
        this._modal = page.locator('[role="dialog"]'); // Modal container
        this._modalJiraButton = page.locator('button:has-text("View on Github")');
        this._bugCounter = page.locator('text=Bugs Found:');
    }

    async goto() {
        await this.navigateTo('/untested');
    }

    async triggerBugModal() {
        await this._ownerName.click();
    }

    get ownerNameLocator() { return this._ownerName; }
    get ownerNameSpanLocator() { return this._ownerName.locator('span').first(); }
    get socialLinkLocator() { return this._socialLink; }
    get techStackImagesLocator() { return this._techStackImages; }
    get progressValueLocator() { return this._progressValue; }
    get aboutTextLocator() { return this._aboutText; }
    get bugCardTriggerLocator() { return this._bugCardTrigger; }
    get modalLocator() { return this._modal; }
    get modalJiraButtonLocator() { return this._modalJiraButton; }
    get bugCounterLocator() { return this._bugCounter; }

    getProjectDescriptionLocator(index: number) {
        return this.page.locator('#experience p').nth(index);
    }

    getBugCardTriggerLocatorByText(text: string) {
        return this.page.getByText(text, { exact: true });
    }

    get jobDoneIconLocator() { return this.page.locator('.bg-success .lucide-bug'); }
    get modalCloseButtonLocator() { return this.page.getByRole('button', { name: /Close|Continue/i }); }
    get jobDoneModalLocator() { return this.page.getByText('Job Done'); }
}
