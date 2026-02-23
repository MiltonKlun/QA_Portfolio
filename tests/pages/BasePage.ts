import { type Page, type Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    private readonly _sidebar: Locator;
    private readonly _themeToggle: Locator;
    private readonly _hintsToggle: Locator;
    private readonly _heroHeadline: Locator;
    private readonly _skillsSection: Locator;
    private readonly _aboutSection: Locator;
    private readonly _experienceSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this._sidebar = page.locator('aside, nav, header');
        this._themeToggle = page.locator('button[aria-label*="Switch to"]');
        this._hintsToggle = page.getByRole('button', { name: /HINTS/i });
        this._heroHeadline = page.locator('h1');
        this._skillsSection = page.locator('#skills');
        this._aboutSection = page.locator('#about');
        this._experienceSection = page.locator('#experience');
    }

    async navigateTo(path: string) {
        await this.page.goto(path);
    }

    async toggleTheme() {
        await this._themeToggle.click();
    }

    async getThemeToggleLocator() {
        return this._themeToggle;
    }

    async clickHintsToggle() {
        await this._hintsToggle.click();
    }

    get hintsToggleLocator() {
        return this._hintsToggle;
    }

    get heroHeadlineLocator() {
        return this._heroHeadline;
    }

    get skillsSectionLocator() {
        return this._skillsSection;
    }

    get aboutSectionLocator() {
        return this._aboutSection;
    }

    get experienceSectionLocator() {
        return this._experienceSection;
    }

    getProjectCardLocator(title: string) {
        return this._experienceSection.locator('.group').filter({ hasText: title });
    }

    get sidebarLocator() {
        return this._sidebar;
    }

    get hintsPulsesLocator() {
        return this.page.locator('.animate-ping');
    }

    getHintsPulseLocatorFor(parentLocator: Locator) {
        return parentLocator.locator('.animate-ping');
    }

    get hintsToggleOffLocator() {
        return this.page.getByRole('button', { name: 'HINTS', exact: true });
    }

    get hintsToggleOnLocator() {
        return this.page.getByRole('button', { name: 'HINTS ON', exact: true });
    }

    get backButtonLocator() {
        return this.page.locator('a[aria-label="Back to Home"]').first();
    }

    getHeadingLocator(text: string) {
        return this.page.locator('h1, h2').filter({ hasText: text }).first();
    }

    get mobileNavLocator() {
        return this.page.locator('nav').filter({ hasText: 'About' }).last();
    }

    getMobileNavLinkLocator(name: string) {
        return this.page.getByRole('button', { name, exact: true });
    }

    getSidebarLinkLocator(name: string) {
        return this.page.getByRole('button', { name });
    }

    getSectionLocatorById(id: string) {
        return this.page.locator(`#${id}`);
    }
}
