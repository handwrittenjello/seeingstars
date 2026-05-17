import { Page } from '@playwright/test';

export class HomePageMap {
    constructor(private page: Page) {}

    get logo() {
        return this.page.getByAltText('Seeing Stars logo');
    }

    get photosLink() {
        return this.page.getByRole('link', { name: 'Photos', exact: true });
    }

    get videosLink() {
        return this.page.getByRole('link', { name: 'Videos', exact: true });
    }

    get heroPhotosButton() {
        return this.page.locator('a:text("View Photos")');
    }
}
