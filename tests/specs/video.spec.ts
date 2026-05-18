import { test, expect } from '../fixtures/fixtures';

test.describe('Seeing Stars - Videos', () => {

    test.beforeEach(async ({ videoPage }) => {
        await videoPage.goto();
    });

    test('video page title is correct', async ({ page }) => {
        await expect(page).toHaveTitle('Videos - Seeing Stars');
    });

    test('videos heading is visible', async ({ videoPage }) => {
        await expect(videoPage.map.heading).toBeVisible();
    });

    test('videos load successfully', async ({ videoPage }) => {
        await videoPage.waitForVideosLoad();

        const cards = videoPage.map.videoCards;
        await expect(cards).not.toHaveCount(0);
    });

    test('each video has a title', async ({ videoPage }) => {
        await videoPage.waitForVideosLoad();

        const titles = videoPage.map.videoTitles;
        const count = await titles.count();
        console.log(`Total videos found: ${count}`);

        for (let i = 0; i < count; i++) {
            const title = titles.nth(i);
            const text = await title.textContent();
            console.log(`Video ${i}: title="${text}"`);

            expect(text, `Video ${i} is missing a title`).not.toBeNull();
            expect(text?.trim(), `Video ${i} has an empty title`).not.toBe('');
        }
    });

    test('each video has a poster image', async ({ videoPage }) => {
        await videoPage.waitForVideosLoad();

        const videos = videoPage.map.videoPosterImages;
        const count = await videos.count();
        console.log(`Total videos with posters: ${count}`);

        for (let i = 0; i < count; i++) {
            const video = videos.nth(i);
            const poster = await video.getAttribute('poster');
            console.log(`Video ${i}: poster="${poster}"`);

            expect(poster, `Video ${i} is missing a poster attribute`).not.toBeNull();
            expect(poster, `Video ${i} has an empty poster attribute`).not.toBe('');
        }
    });

    test('navigation links are present', async ({ navBar }) => {
        await expect(navBar.map.homeLink).toBeVisible();
        await expect(navBar.map.photosLink).toBeVisible();
        await expect(navBar.map.videosLink).toBeVisible();
    });

    test('nav logo navigates to home', async ({ videoPage, page }) => {
        await videoPage.map.navLogo.click();
        await expect(page).toHaveURL('/');
    });

    test('photos nav link navigates to gallery', async ({ videoPage, page }) => {
        await videoPage.clickPhotos();
        await expect(page).toHaveURL(/gallery\.html/);
    });

    test('footer gallery link is present', async ({ videoPage }) => {
        await expect(videoPage.map.footerGalleryLink).toBeVisible();
    });

    test('footer connect links are present', async ({ videoPage }) => {
        await expect(videoPage.map.footerEmailLink).toBeVisible();
        await expect(videoPage.map.footerInstagramLink).toBeVisible();
    });

});

