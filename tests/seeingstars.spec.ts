import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.seeingstars.space';

test.describe('Seeing Stars - Homepage', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test('page title is correct', async ({ page }) => {
        await expect(page).toHaveTitle('Seeing Stars - Astrophotography');
    });

    test('logo is visible', async ({ page }) => {
        const logo = page.getByAltText('Seeing Stars logo');
        await expect(logo).toBeVisible();
    });

    test('navigation links are present', async ({ page }) => {
        await expect(page.locator('a:text("Home")')).toBeVisible();
        await expect(page.locator('a:text("Photos")')).toBeVisible();
        await expect(page.locator('a:text("Videos")')).toBeVisible();
    });

    test('hero buttons navigate correctly', async ({ page }) => {
        await page.locator('a:text("Photos")').click();
        await expect(page).toHaveURL(`${BASE_URL}/gallery.html`);
    });

});

test.describe('Seeing Stars - Gallery', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/gallery.html`);
    });

    test('gallery page title is correct', async ({ page }) => {
        await expect(page).toHaveTitle('Gallery - Seeing Stars');
    });

    test('gallery heading is visible', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Complete Gallery' })).toBeVisible();
    });

    test('gallery images load successfully', async ({ page }) => {
        // Wait for the loading text to disappear first
        await expect(page.locator(':text("Loading gallery...")')).not.toBeVisible();

        // Then assert images are present
        const images = page.locator('img');
        await expect(images).not.toHaveCount(0);
    });

    test('each image has an alt attribute', async ({ page }) => {
        await expect(page.locator(':text("Loading gallery...")')).not.toBeVisible();

        const images = page.locator('img[src*="/assets/images/thumbs/"]');        const count = await images.count();
        console.log(`Total images found: ${count}`);

        for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            const alt = await img.getAttribute('alt');
            const src = await img.getAttribute('src');
            console.log(`Image ${i}: src="${src}" alt="${alt}"`);

            expect(alt, `Image ${i} with src="${src}" is missing alt text`).not.toBeNull();
            expect(alt, `Image ${i} with src="${src}" has empty alt text`).not.toBe('');
        }
    });

});
