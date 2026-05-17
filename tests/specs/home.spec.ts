import { test, expect } from '../fixtures/fixtures';

test.describe('Home Page', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('has correct page title', async ({ page }) => {
        await expect(page).toHaveTitle(/Seeing Stars/);
    });

    test('logo is visible', async ({ homePage }) => {
        await expect(homePage.map.logo).toBeVisible();
    });

    test('nav links are visible', async ({ navBar }) => {
        await expect(navBar.photosLink).toBeVisible();
        await expect(navBar.videosLink).toBeVisible();
    });

    test('hero photos button navigates to gallery', async ({ page, homePage }) => {
        await homePage.clickHeroPhotos();
        await expect(page).toHaveURL(/gallery\.html/);
    });
});
