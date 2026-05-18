import { Page } from '@playwright/test';
import { NavBarMap } from './NavBarMap';

export class NavBar {
    readonly page: Page;
    readonly map: NavBarMap;

    constructor(page: Page) {
        this.page = page;
        this.map = new NavBarMap(page);
    }

    async clickLogo(): Promise<void> {
        await this.map.logo.click();
    }

    async clickHome(): Promise<void> {
        await this.map.homeLink.click();
    }

    async clickPhotos(): Promise<void> {
        await this.map.photosLink.click();
    }

    async clickVideos(): Promise<void> {
        await this.map.videosLink.click();
    }
}
