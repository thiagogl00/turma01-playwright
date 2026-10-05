import { test, expect } from "@playwright/test";

test("Login válido redireciona para o inventário",async ({page})=>{
    await page.goto("/");

    await page.fill('#user-name','standard_user');
    await page.fill('#password','secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".inventory_list")).toBeVisible(); 
});

test("Login inválido mostra mensagem de erro",async ({page})=>{
    await page.goto("/");

    await page.fill('#user-name','usuario_errado');
    await page.fill('#password','senha_errada');
    await page.click('#login-button');

    await expect(page.locator(".error-message-container")).toBeVisible();
});

