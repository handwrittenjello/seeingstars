// tests/pages/VideoPageMap.ts
import { Page, Locator } from '@playwright/test';

export class VideoPageMap {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get heading(): Locator {
        return this.page.getByRole('heading', { name: 'Video Showcase' });
    }

    get loadingIndicator(): Locator {
        return this.page.locator('#videos-loading');
    }

    get videosSection(): Locator {
        return this.page.locator('#videos-section');
    }

    get videosGrid(): Locator {
        return this.page.locator('#videos-grid');
    }

    get videoCards(): Locator {
        return this.page.locator('#videos-grid .card');
    }

    get videoElements(): Locator {
        return this.page.locator('#videos-grid video');
    }

    get videoTitles(): Locator {
        return this.page.locator('#videos-grid .card-title');
    }

    get videoPosterImages(): Locator {
        return this.page.locator('#videos-grid video[poster]');
    }

    get navLogo(): Locator {
        return this.page.locator('#nav-logo');
    }

    get homeLink(): Locator {
        return this.page.locator('#nav-link-home');
    }

    get photosLink(): Locator {
        return this.page.locator('#nav-link-photos');
    }

    get videosLink(): Locator {
        return this.page.locator('#nav-link-videos');
    }

    get footerGalleryLink(): Locator {
        return this.page.locator('#footer-link-gallery');
    }

    get footerVideosLink(): Locator {
        return this.page.locator('#footer-link-videos');
    }

    get footerEmailLink(): Locator {
        return this.page.locator('#footer-link-email');
    }

    get footerInstagramLink(): Locator {
        return this.page.locator('#footer-link-instagram');
    }
}

