import { test, expect } from '../fixtures/fixtures';

test.describe('Seeing Stars - Homepage', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('page title is correct', async ({ page }) => {
        await expect(page).toHaveTitle('Seeing Stars - Astrophotography');
    });

    test('logo is visible', async ({ homePage }) => {
        await expect(homePage.map.logo).toBeVisible();
    });

    test('navigation links are present', async ({ navBar }) => {
        await expect(navBar.homeLink).toBeVisible();
        await expect(navBar.photosLink).toBeVisible();
        await expect(navBar.videosLink).toBeVisible();
    });

    test('hero buttons navigate correctly', async ({ homePage, page }) => {
        await homePage.clickPhotos();
        await expect(page).toHaveURL(/gallery\.html/);
    });

});
