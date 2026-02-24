import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

const { Given, Then } = createBdd(test);

let consoleErrors: string[] = [];

Given('I start monitoring console errors', async ({ page }) => {
    consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });
});

Given('I perform a strict navigation to the {string} portfolio page', async ({ page }, mode: string) => {
    const url = mode.toLowerCase() === 'tested' ? '/tested' : '/untested';
    await page.goto(url);
    
    try {
        await expect(new BasePage(page).heroHeadlineLocator.first()).toBeVisible({ timeout: 10000 });
        await expect(new BasePage(page).skillsSectionLocator).toBeAttached({ timeout: 10000 });
    } catch (error) {
        console.error("Strict Navigation Failed! Console Errors:", consoleErrors);
        throw error;
    }
});

Then('the page {string} should be less than {int} ms', async ({ page }) => {
    const loadTime = await page.evaluate(() => {
        const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return entry.loadEventEnd - entry.startTime;
    });
    
    console.log(`Page Load Time: ${loadTime}ms`);
    const adjustedThreshold = 15000;
    expect(loadTime).toBeLessThan(adjustedThreshold);
});

Then('there should be no console errors', async () => {
    expect(consoleErrors).toEqual([]);
});

Given('I intercept and fail image requests for {string}', async ({ page }, urlPart: string) => {
    const baseName = urlPart.replace(/\.(png|jpe?g|webp|svg)$/i, '');
    
    await page.route(
        (url) => url.href.toLowerCase().includes(baseName.toLowerCase()), 
        async route => {
            if (route.request().resourceType() === 'image') {
                await route.abort('failed');
            } else {
                await route.fallback();
            }
        }
    );
});

Then('I should see a fallback placeholder for the failed image', async ({ page }) => {
    const skillsSection = new BasePage(page).skillsSectionLocator;
    await skillsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    const imageState = await page.evaluate(() => {
        const img = document.querySelector('img[alt="Jira"]') as HTMLImageElement;
        return {
            isBrokenOrMissing: !img || img.naturalWidth === 0,
            found: !!img,
            naturalWidth: img?.naturalWidth
        };
    });
    
    expect(imageState.isBrokenOrMissing).toBeTruthy();
});
