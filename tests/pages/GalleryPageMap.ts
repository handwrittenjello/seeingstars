// tests/pages/GalleryPageMap.ts
import { Page, Locator } from '@playwright/test';

export class GalleryPageMap {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get heading(): Locator {
        return this.page.getByRole('heading', { name: 'Complete Gallery' });
    }

    get loadingIndicator(): Locator {
        return this.page.locator('#gallery-loading');
    }

    get allImages(): Locator {
        return this.page.locator('img');
    }

    get galleryImages(): Locator {
        return this.page.locator('img[src*="/assets/images/thumbs/"]');
    }


    get galleryGrid(): Locator {
        return this.page.locator('#gallery-grid');
    }

    get gallerySection(): Locator {
        return this.page.locator('#gallery-section');
    }

    get lightbox(): Locator {
        return this.page.locator('#lightbox');
    }

    get lightboxClose(): Locator {
        return this.page.locator('#lightbox-close');
    }

    get lightboxImage(): Locator {
        return this.page.locator('#lightbox-img');
    }

    get lightboxTitle(): Locator {
        return this.page.locator('#lightbox-title');
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
