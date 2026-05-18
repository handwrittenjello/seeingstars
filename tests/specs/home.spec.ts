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
        await expect(navBar.map.homeLink).toBeVisible();
        await expect(navBar.map.photosLink).toBeVisible();
        await expect(navBar.map.videosLink).toBeVisible();
    });

    test('hero buttons navigate correctly', async ({ homePage, page }) => {
        await homePage.clickPhotos();
        await expect(page).toHaveURL(/gallery\.html/);
    });

    test('video gallery is present', async ({ homePage, page }) => {
        await homePage.clickVideos();
        await expect(page).toHaveURL(/videos\.html/);
    })

});
