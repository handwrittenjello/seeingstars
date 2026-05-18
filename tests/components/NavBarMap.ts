// tests/components/NavBarMap.ts
import { Page, Locator } from '@playwright/test';

export class NavBarMap {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get nav(): Locator {
        return this.page.locator('#main-nav');
    }

    get logo(): Locator {
        return this.page.locator('#nav-logo');
    }

    get navLinks(): Locator {
        return this.page.locator('#nav-links');
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
}

