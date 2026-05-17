import { Page } from '@playwright/test';

export class GalleryPageMap {
    constructor(private page: Page) {}

    get heading() {
        return this.page.getByRole('heading', { name: 'Complete Gallery' });
    }

    get loadingIndicator() {
        return this.page.locator('.loading');
    }

    get galleryImages() {
        return this.page.locator('img[src*="/assets/images/thumbs/"]');
    }
}
