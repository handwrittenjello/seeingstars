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
        return this.page.locator(':text("Loading gallery...")');
    }

    get allImages(): Locator {
        return this.page.locator('img');
    }

    get galleryImages(): Locator {
        return this.page.locator('img[src*="/assets/images/thumbs/"]');
    }

    get dateFilter(): Locator {
        return this.page.locator('#date-filter');
    }

    get dateInput(): Locator {
        return this.page.locator('#date-input');
    }

    get applyFilterButton(): Locator {
        return this.page.locator('button:text("Apply")');
    }
}

