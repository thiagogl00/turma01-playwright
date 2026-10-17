import { expect, test } from '@playwright/test';
import {
  loginToOrangeHrm,
  openOrangeLogin,
  ORANGE_HRM_BASE_URL,
  ORANGE_HRM_CREDENTIALS,
} from '../helpers/orangehrm';

test.describe('Login e autenticação do OrangeHRM', () => {
  test('Exibe corretamente a tela de login', async ({ page }) => {
    await openOrangeLogin(page);

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('Permite login válido e acesso ao dashboard', async ({ page }) => {
    await loginToOrangeHrm(page);

    await expect(page).toHaveURL(/\/dashboard\/index/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('Bloqueia credenciais inválidas', async ({ page }) => {
    await openOrangeLogin(page);
    await page.getByRole('textbox', { name: 'Username' }).fill('usuario-inexistente');
    await page.getByRole('textbox', { name: 'Password' }).fill('senha-invalida');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('Valida os campos obrigatórios', async ({ page }) => {
    await openOrangeLogin(page);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Required', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toHaveClass(/oxd-input--error/);
  });

  test('Trata espaços, caracteres especiais e entradas longas', async ({
    page,
  }) => {
    await openOrangeLogin(page);
    await page.getByRole('textbox', { name: 'Username' }).fill(` ${ORANGE_HRM_CREDENTIALS.username} `);
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123!@#$%^&*'.repeat(20));
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('Permite navegação por teclado e envio com Enter', async ({ page }) => {
    await openOrangeLogin(page);
    await page.getByRole('textbox', { name: 'Username' }).fill(ORANGE_HRM_CREDENTIALS.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(ORANGE_HRM_CREDENTIALS.password);
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');

    await page.waitForURL(/\/dashboard\/index/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('Mantém a sessão após atualizar a página', async ({ page }) => {
    await loginToOrangeHrm(page);
    await page.reload();

    await expect(page).toHaveURL(/\/dashboard\/index/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('Faz logout e impede retorno autenticado pelo histórico', async ({ page }) => {
    await loginToOrangeHrm(page);
    await page.getByText('manda user', { exact: true }).click();
    await page.getByText('Logout', { exact: true }).click();
    await expect(page).toHaveURL(/\/auth\/login/);

    await page.goBack();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('Redireciona URL protegida para o login sem autenticação', async ({ page }) => {
    await page.goto(`${ORANGE_HRM_BASE_URL}/dashboard/index`);

    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});
