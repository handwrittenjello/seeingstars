import { Page } from '@playwright/test';

const BASE_URL = 'https://www.seeingstars.space';

export abstract class BasePage {
    readonly page: Page;
    readonly baseURL: string = BASE_URL;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string) {
        await this.page.goto(`${this.baseURL}${path}`);
    }
}
