import { test, expect } from '../fixtures/fixtures';

test.describe('Gallery Page', () => {
    test.beforeEach(async ({ galleryPage }) => {
        await galleryPage.goto();
        await galleryPage.waitForGalleryLoad();
    });

    test('has correct page title', async ({ page }) => {
        await expect(page).toHaveTitle(/Gallery/);
    });

    test('gallery heading is visible', async ({ galleryPage }) => {
        await expect(galleryPage.map.heading).toBeVisible();
    });

    test('gallery images are loaded', async ({ galleryPage }) => {
        await expect(galleryPage.map.galleryImages).not.toHaveCount(0);
    });

    test('all gallery images have alt text', async ({ galleryPage }) => {
        const images = galleryPage.map.galleryImages;
        const count = await images.count();
        for (let i = 0; i < count; i++) {
            const alt = await images.nth(i).getAttribute('alt');
            expect(alt, `Image at index ${i} is missing alt text`).not.toBe('');
        }
    });
});
