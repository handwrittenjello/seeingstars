import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HomePageMap } from './HomePageMap';

export class HomePage extends BasePage {
    readonly map: HomePageMap;

    constructor(page: Page) {
        super(page);
        this.map = new HomePageMap(page);
    }

    async goto() {
        await this.page.goto(this.baseURL);
    }

    async clickNavPhotos() {
        await this.map.photosLink.click();
    }

    async clickHeroPhotos() {
        await this.map.heroPhotosButton.click();
    }
}
