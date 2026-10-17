import { expect, test } from '@playwright/test';
import { loginToOrangeHrm } from '../helpers/orangehrm';

test.describe('PIM - Funcionários do OrangeHRM', () => {
  const employeeNameInput = (page: Parameters<typeof loginToOrangeHrm>[0]) =>
    page.locator('input[placeholder="Type for hints..."]').first();
  const employeeIdSearchInput = (page: Parameters<typeof loginToOrangeHrm>[0]) =>
    page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input').first();
  const employeeIdField = (page: Parameters<typeof loginToOrangeHrm>[0]) =>
    page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input').first();

  test.beforeEach(async ({ page }) => {
    await loginToOrangeHrm(page);
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.waitForURL(/\/pim\/viewEmployeeList/);
  });

  test('Pesquisa funcionário por nome ou ID', async ({ page }) => {
    const firstRow = page.locator('.oxd-table-body .oxd-table-row').first();
    const employeeId = await firstRow.locator('.oxd-table-cell').nth(1).innerText();
    await employeeIdSearchInput(page).fill(employeeId);
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('.oxd-table-body')).toContainText(employeeId);
  });

  test('Cadastra funcionário e valida dados', async ({ page }) => {
    const firstName = `Test${Date.now()}`;
    await page.getByRole('button', { name: 'Add' }).click();
    await page.waitForURL(/\/pim\/addEmployee/);

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Required', { exact: true }).first()).toBeVisible();
    await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Playwright');
    const employeeId = employeeIdField(page);
    await expect(employeeId).toHaveValue(/\d+/);
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Successfully Saved')).toBeVisible();
    await expect(page).toHaveURL(/\/pim\/viewPersonalDetails/);
    await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue(firstName);
  });

  test('Edita dados pessoais do funcionário encontrado', async ({ page }) => {
    await page.locator('.oxd-table-body .oxd-table-row').first().click();
    await page.waitForURL(/\/pim\/viewPersonalDetails/);

    const firstName = page.getByRole('textbox', { name: 'First Name' });
    await firstName.fill('Admin');
    await page.getByRole('button', { name: 'Save' }).first().click();

    await expect(page.getByText('Successfully Updated')).toBeVisible();
  });

  test('Confirma e cancela exclusão de funcionário de teste', async ({ page }) => {
    const firstName = `Delete${Date.now()}`;
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Playwright');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Successfully Saved')).toBeVisible();
    const employeeIdValue = await employeeIdField(page).inputValue();

    await page.getByRole('link', { name: 'Employee List' }).click();
    await employeeIdSearchInput(page).fill(employeeIdValue);
    await page.getByRole('button', { name: 'Search' }).click();
    const employeeRow = page.locator('.oxd-table-body .oxd-table-row').first();
    await employeeRow.getByRole('button').last().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'No, Cancel' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await employeeRow.getByRole('button').last().click();
    await page.getByRole('button', { name: 'Yes, Delete' }).click();

    await expect(page.getByText('Successfully Deleted')).toBeVisible();
  });
});
