import { type Page, type Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly sidebar: Locator;
    readonly themeToggle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebar = page.locator('aside'); // precise selector depends on implementation
        this.themeToggle = page.locator('button[aria-label*="Switch to"]');
    }

    async navigateTo(path: string) {
        await this.page.goto(path);
    }

    async toggleTheme() {
        await this.themeToggle.click();
    }
}
