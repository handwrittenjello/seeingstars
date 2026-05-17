import { Page } from '@playwright/test';

export class NavBar {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get homeLink() {
        return this.page.locator('a:text("Home")');
    }

    get photosLink() {
        return this.page.locator('a:text("Photos")');
    }

    get videosLink() {
        return this.page.locator('a:text("Videos")');
    }
}

