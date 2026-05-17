import { Page } from '@playwright/test';

export class NavBar {
    constructor(private page: Page) {}

    get homeLink() {
        return this.page.getByRole('link', { name: 'Home', exact: true });
    }

    get photosLink() {
        return this.page.getByRole('link', { name: 'Photos', exact: true });
    }

    get videosLink() {
        return this.page.getByRole('link', { name: 'Videos', exact: true });
    }

    get logo() {
        return this.page.getByAltText('Seeing Stars logo');
    }
}
