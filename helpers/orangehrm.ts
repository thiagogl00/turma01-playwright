import { Page } from '@playwright/test';

export const ORANGE_HRM_BASE_URL =
  'https://opensource-demo.orangehrmlive.com/web/index.php';

export const ORANGE_HRM_CREDENTIALS = {
  username: 'Admin',
  password: 'admin123',
};

export async function openOrangeLogin(page: Page) {
  await page.goto(`${ORANGE_HRM_BASE_URL}/auth/login`);
}

export async function loginToOrangeHrm(page: Page) {
  await openOrangeLogin(page);
  await page.getByRole('textbox', { name: 'Username' }).fill(ORANGE_HRM_CREDENTIALS.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(ORANGE_HRM_CREDENTIALS.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/\/dashboard\/index/);
}
