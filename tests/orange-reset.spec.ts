import { expect, test } from '@playwright/test';
import { openOrangeLogin, ORANGE_HRM_BASE_URL } from '../helpers/orangehrm';

test.describe('Recuperação de senha do OrangeHRM', () => {
  test('Acessa a tela de recuperação de senha', async ({ page }) => {
    await openOrangeLogin(page);
    await page.getByText('Forgot your password?').click();

    await expect(page).toHaveURL(/\/auth\/requestPasswordResetCode/);
    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  });

  test('Retorna à tela de login pelo botão Cancel', async ({ page }) => {
    await page.goto(`${ORANGE_HRM_BASE_URL}/auth/requestPasswordResetCode`);
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('Valida o username obrigatório', async ({ page }) => {
    await page.goto(`${ORANGE_HRM_BASE_URL}/auth/requestPasswordResetCode`);
    await page.getByRole('button', { name: 'Reset Password' }).click();

    await expect(page.getByText('Required', { exact: true })).toBeVisible();
  });

  test('Confirma solicitação para usuário válido', async ({ page }) => {
    await page.goto(`${ORANGE_HRM_BASE_URL}/auth/requestPasswordResetCode`);
    const username = page.getByRole('textbox', { name: 'Username' });
    await username.fill('Admin');
    await expect(username).toHaveValue('Admin');
    await page.getByRole('button', { name: 'Reset Password' }).click({ noWaitAfter: true });
  });

  test('Trata usuário inexistente e repetição com resposta segura', async ({
    page,
  }) => {
    await page.goto(`${ORANGE_HRM_BASE_URL}/auth/requestPasswordResetCode`);
    await page.getByRole('textbox', { name: 'Username' }).fill(`unknown-${Date.now()}`);
    await page.getByRole('button', { name: 'Reset Password' }).click({ noWaitAfter: true });
    await expect(page).toHaveURL(/\/auth\/sendPasswordReset/);

    await page.goto(`${ORANGE_HRM_BASE_URL}/auth/requestPasswordResetCode`);
    await page.getByRole('textbox', { name: 'Username' }).fill(`unknown-${Date.now()}`);
    await page.getByRole('button', { name: 'Reset Password' }).click({ noWaitAfter: true });
    await expect(page).toHaveURL(/\/auth\/sendPasswordReset/);
  });
});
