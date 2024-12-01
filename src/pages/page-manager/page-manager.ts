import { Page } from '@playwright/test';
import { HomePage } from '@src/pages/home';
import { LoginPage } from '@pages/login';

/**
 * This class is used for managing all pages.
 * Many test scenarios involve usage of different pages and this page manager helps following DRY principle.
 */

export class PageManager {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
  }
}
