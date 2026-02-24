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
        this._ownerName = page.locator('h1');
        this._socialLink = page.locator('a[aria-label="LinkedIn (bug)"]');
        this._techStackImages = page.locator('#skills [class*="border-danger"]');
        this._progressValue = page.locator('text=NaN%');
        this._aboutText = page.locator('#about p').first();

        this._bugCardTrigger = page.locator('text=Missing Name');
        this._modal = page.locator('[role="dialog"]');
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

    get ownerName() { return this.ownerNameLocator; }
    get ownerNameSpan() { return this.ownerNameSpanLocator; }
    get socialLink() { return this.socialLinkLocator; }
    get techStackImages() { return this.techStackImagesLocator; }
    get progressValue() { return this.progressValueLocator; }
    get aboutText() { return this.aboutTextLocator; }
    get bugCardTrigger() { return this.bugCardTriggerLocator; }
    get modal() { return this.modalLocator; }
    get modalJiraButton() { return this.modalJiraButtonLocator; }
    get bugCounter() { return this.bugCounterLocator; }

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
