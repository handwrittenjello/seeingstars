import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { GalleryPageMap } from './GalleryPageMap';

export class GalleryPage extends BasePage {
    readonly map: GalleryPageMap;

    constructor(page: Page) {
        super(page);
        this.map = new GalleryPageMap(page);
    }

    async goto() {
        await this.page.goto(`${this.baseURL}/gallery.html`);
    }

    async waitForGalleryLoad() {
        await this.map.loadingIndicator.waitFor({ state: 'hidden' });
    }
}
