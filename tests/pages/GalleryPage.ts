import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { GalleryPageMap } from './GalleryPageMap';

export class GalleryPage extends BasePage {
    readonly map: GalleryPageMap;

    constructor(page: Page) {
        super(page);
        this.map = new GalleryPageMap(page);
    }

    async goto(): Promise<void> {
        await this.navigate('/gallery.html');
    }

    async waitForGalleryLoad(): Promise<void> {
        await this.map.loadingIndicator.waitFor({ state: 'hidden' });
    }

    async filterByDate(date: string): Promise<void> {
        await this.map.dateFilter.click();
        await this.map.dateInput.fill(date);
        await this.map.applyFilterButton.click();
    }
}
