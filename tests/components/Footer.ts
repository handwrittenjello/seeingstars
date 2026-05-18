// tests/components/Footer.ts
import { Page } from '@playwright/test';
import { FooterMap } from './FooterMap';

export class Footer {
    readonly page: Page;
    readonly map: FooterMap;

    constructor(page: Page) {
        this.page = page;
        this.map = new FooterMap(page);
    }

    async clickGalleryLink(): Promise<void> {
        await this.map.galleryLink.click();
    }

    async clickVideosLink(): Promise<void> {
        await this.map.videosLink.click();
    }

    async clickEmailLink(): Promise<void> {
        await this.map.emailLink.click();
    }

    async clickInstagramLink(): Promise<void> {
        await this.map.instagramLink.click();
    }
}

