import { test, expect } from '@playwright/test';
import { PageManager } from '@pages/page-manager/page-manager';
import { testsConfig } from '@src/environment';

let pm: PageManager;

test.beforeEach(async ({ browser }) => {
  const page = await browser.newPage();
  pm = new PageManager(page);
});

test.afterEach(async ({ browser }) => {
  for (const context of browser.contexts()) {
    await context.close();
  }
});

test.describe('Web-client tests', () => {
  test('Should login to a system (using an element assertion)', async () => {
    /** I do not use test.step() on a regular basis. Here it used only to reflect the requirements of the test task.
     *  Test.step() creates nested functions and makes code reading a bit harder.
     *  Locators or specific functions called in test should have accurate names.
     *  Accurate names help in undestanding what is going on in test-scenario without test.step() */

    await test.step(' Navigate to the Engenious University login page', async () => {
      await pm.homePage.goto();
    });

    await test.step('Click on the “Sign In” button', async () => {
      await pm.homePage.locators.signIn().click();
    });

    await test.step('Click on the “Log in” button', async () => {
      await pm.loginPage.locators.navigationTab('login').click();
    });

    await test.step('Input Email in the email field', async () => {
      await pm.loginPage.locators.email().fill(testsConfig.testUser.email);
    });

    await test.step('Input Password in the password field', async () => {
      await pm.loginPage.locators
        .password()
        .fill(testsConfig.testUser.password);
    });

    await test.step('Click on the "Login" button', async () => {
      await pm.loginPage.locators.login().click();
    });

    await pm.homePage.locators.burgerMenu().click();
    await expect(pm.homePage.locators.logout()).toBeVisible();
    /* Test time 5.1 - 5.4s */

    /**
     * I created this assertion block to reflect the task requirement.
     * But in this test it is more preffered to use server response assertion.
     * I used it as an example in test below.
     */
  });

  test('Should login to a system (using a server response assertion)', async () => {
    await test.step(' Navigate to the Engenious University login page', async () => {
      await pm.homePage.goto();
    });

    await test.step('Click on the “Sign In” button', async () => {
      await pm.homePage.locators.signIn().click();
    });

    await test.step('Click on the “Log in” button', async () => {
      await pm.loginPage.locators.navigationTab('login').click();
    });

    await test.step('Input Email in the email field', async () => {
      await pm.loginPage.locators.email().fill(testsConfig.testUser.email);
    });

    await test.step('Input Password in the password field', async () => {
      await pm.loginPage.locators
        .password()
        .fill(testsConfig.testUser.password);
    });

    await test.step('Click on the "Login" button', async () => {
      await pm.loginPage.locators.login().click();
    });

    /**
     * Below I am waiting to the response and do not click on burger menu and waiting for Logout button.
     * It speeds up test and make it more stable.
     * But need to highlight that server response assertion does not checking redirecting to a home page.
     */

    const responseToken = await pm.page.waitForResponse((response) =>
      response.url().includes('/auth/login')
    );

    expect(responseToken.status()).toBe(201);
    /* Test time 4.3 - 4.7s */
  });
});
