import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { GalleryPage } from '../pages/GalleryPage';
import { VideoPage } from '../pages/VideoPage';
import { NavBar } from '../components/NavBar';

type Fixtures = {
    homePage: HomePage;
    galleryPage: GalleryPage;
    videoPage: VideoPage;
    navBar: NavBar;
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    galleryPage: async ({ page }, use) => {
        await use(new GalleryPage(page));
    },
    videoPage: async ({ page }, use) => {
        await use(new VideoPage(page));
    },
    navBar: async ({ page }, use) => {
        await use(new NavBar(page));
    },
});

export { expect } from '@playwright/test';

