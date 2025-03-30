import { test as base } from '@playwright/test';

type LoginFixture = {
  login: () => Promise<void>;
};

export const test = base.extend<LoginFixture>({
  login: async ({ page }, use) => {
    await use(async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', "standard_user");
      await page.fill('#password', "secret_sauce");
      await page.click('#login-button');
    });
  },
});