import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

let loginPage: LoginPage;
        
test.describe('Testes de login',()=>{
    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();  
        await expect(loginPage.page).toHaveTitle(/Swag Labs/);
    });
/*     test("Login válido redireciona para o inventário",async ({page})=>{
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
    }); */

    test("Login válido redireciona para o inventário",async ()=>{        
        await loginPage.loginWithCredentials('standard_user','secret_sauce')

        await expect(loginPage.page).toHaveURL(/inventory/);
        await expect(loginPage.inventoryList).toBeVisible();
    });

     test("Login inválido mostra mensagem de erro",async ()=>{
        await loginPage.loginWithCredentials('user_incorreto','password_incorreta');

        await expect(loginPage.error).toBeVisible();    
    });
    
});

