// tests/components/FooterMap.ts
import { Page, Locator } from '@playwright/test';

export class FooterMap {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get footer(): Locator {
        return this.page.locator('#footer');
    }

    get footerContent(): Locator {
        return this.page.locator('#footer-content');
    }

    get brandSection(): Locator {
        return this.page.locator('#footer-section-brand');
    }

    get linksSection(): Locator {
        return this.page.locator('#footer-section-links');
    }

    get connectSection(): Locator {
        return this.page.locator('#footer-section-connect');
    }

    get galleryLink(): Locator {
        return this.page.locator('#footer-link-gallery');
    }

    get videosLink(): Locator {
        return this.page.locator('#footer-link-videos');
    }

    get emailLink(): Locator {
        return this.page.locator('#footer-link-email');
    }

    get instagramLink(): Locator {
        return this.page.locator('#footer-link-instagram');
    }

    get footerBottom(): Locator {
        return this.page.locator('#footer-bottom');
    }
}

