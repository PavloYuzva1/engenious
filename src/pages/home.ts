import { Page } from '@playwright/test';
import { testsConfig } from '@src/environment';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * I prefer using XPATH rather than CSS locators. I know they work a bit slower than CSS but also there are some advantages.
   * The biggest advantage is the complexity of XPATH. It is possible to take narrow locators which can't be taken with CSS.
   * For example it is very hard to take locators of the specific cell in a big table, but easy enough with XPATH.
   * So for me it is better to use one type of the locators in whole code than mix them.
   */

  public locators = {
    signIn: () => this.page.locator('//header//button[text()="Sign In"]'),

    burgerMenu: () =>
      this.page.locator(
        '//header//div[contains(@class, "burger")]//button[@aria-label="open drawer"]'
      ),

    logout: () =>
      this.page.locator(
        '//div[contains(@class, "NavMenu_content")]//button[text()="Logout"]'
      ),
  };

  public async goto() {
    await this.page.goto(testsConfig.baseUrl);
  }
}
