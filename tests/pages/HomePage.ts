import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HomePageMap } from './HomePageMap';

export class HomePage extends BasePage {
    readonly map: HomePageMap;

    constructor(page: Page) {
        super(page);
        this.map = new HomePageMap(page);
    }

    async goto(): Promise<void> {
        await this.navigate('/');
    }

    async clickPhotos(): Promise<void> {
        await this.map.photosLink.click();
    }
}
