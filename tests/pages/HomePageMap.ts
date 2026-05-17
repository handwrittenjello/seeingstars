// tests/pages/HomePageMap.ts
import { Page, Locator } from '@playwright/test';

export class HomePageMap {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get logo(): Locator {
        return this.page.getByAltText('Seeing Stars logo');
    }

    get homeLink(): Locator {
        return this.page.locator('a:text("Home")');
    }

    get photosLink(): Locator {
        return this.page.locator('a:text("Photos")');
    }

    get videosLink(): Locator {
        return this.page.locator('a:text("Videos")');
    }

    get heroPhotosButton(): Locator {
        return this.page.locator('a:text("View Photos")');
    }
}

