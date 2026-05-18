// tests/pages/HomePageMap.ts
import { Page, Locator } from '@playwright/test';

export class HomePageMap {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get logo(): Locator {
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

    get heroPhotosButton(): Locator {
        return this.page.locator('#btn-hero-view-photos');
    }

    get heroVideosButton(): Locator {
        return this.page.locator('#btn-hero-watch-videos');
    }

    get hero(): Locator {
        return this.page.locator('#hero');
    }

    get aboutSection(): Locator {
        return this.page.locator('#about-section');
    }

    get footer(): Locator {
        return this.page.locator('#footer');
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
