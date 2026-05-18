// tests/pages/VideoPage.ts
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { VideoPageMap } from './VideoPageMap';

export class VideoPage extends BasePage {
    readonly map: VideoPageMap;

    constructor(page: Page) {
        super(page);
        this.map = new VideoPageMap(page);
    }

    async goto(): Promise<void> {
        await this.navigate('/videos.html');
    }

    async waitForVideosLoad(): Promise<void> {
        await this.map.loadingIndicator.waitFor({ state: 'hidden' });
    }

    async clickHome(): Promise<void> {
        await this.map.homeLink.click();
    }

    async clickPhotos(): Promise<void> {
        await this.map.photosLink.click();
    }
}

