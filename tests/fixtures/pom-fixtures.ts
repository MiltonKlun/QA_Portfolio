import { test as base } from 'playwright-bdd';
import { BasePage } from '../pages/BasePage';
import { UntestedPage } from '../pages/UntestedPage';
import { TestedPage } from '../pages/TestedPage';

type PomFixtures = {
    basePage: BasePage;
    untestedPage: UntestedPage;
    testedPage: TestedPage;
};

export const test = base.extend<PomFixtures>({
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    untestedPage: async ({ page }, use) => {
        await use(new UntestedPage(page));
    },
    testedPage: async ({ page }, use) => {
        await use(new TestedPage(page));
    },
});

export { createBdd } from 'playwright-bdd';
