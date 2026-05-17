import { test, expect } from '../fixtures/fixtures';

test.describe('Seeing Stars - Gallery', () => {

    test.beforeEach(async ({ galleryPage }) => {
        await galleryPage.goto();
    });

    test('gallery page title is correct', async ({ page }) => {
        await expect(page).toHaveTitle('Gallery - Seeing Stars');
    });

    test('gallery heading is visible', async ({ galleryPage }) => {
        await expect(galleryPage.map.heading).toBeVisible();
    });

    test('gallery images load successfully', async ({ galleryPage }) => {
        await galleryPage.waitForGalleryLoad();

        const images = galleryPage.map.galleryImages;
        await expect(images).not.toHaveCount(0);
    });

    test('each image has an alt attribute', async ({ galleryPage }) => {
        await galleryPage.waitForGalleryLoad();

        const images = galleryPage.map.galleryImages;
        const count = await images.count();
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
