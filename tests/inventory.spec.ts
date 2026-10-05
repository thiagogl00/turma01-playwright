import { test, expect } from "@playwright/test";
import { login } from "../helpers/auth";

test.describe('Testes de inventário',()=>{
    test.beforeEach(async({page})=>{
        await login(page);
    });

    test('Texto "Products" visível na tela de inventário', async({page})=>{
        await expect(page.locator('.title')).toBeVisible();
    });

    test('Botão para adicionar produtos ao carrinho visível na tela de inventário', async({page})=>{
        const button = page.getByRole('button',{name:'Add to cart'}).nth(0);
        await expect(button).toBeVisible();
    });

    test('Imagem do produto visível na tela de inventário', async({page})=>{
        const image = page.getByAltText('Sauce Labs Backpack');
        await expect(image).toBeVisible();
    });
});



/* test("Imagem do produto visível na tela de inventário",async ({page})=>{
    await page.goto("/");

    await page.getByRole('textbox',{name:'Username'}).fill('standard_user');
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();

    const image = page.getByAltText('Sauce Labs Backpack');
    await expect(image).toBeVisible();
});

test('Botão para adicionar produtos ao carrinho visível na tela de inventário', async({page})=>{
    await page.goto("/");

    await page.getByRole('textbox',{name:'Username'}).fill('standard_user');
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();

    const button = page.getByRole('button',{name:'Add to cart'}).nth(0);

    await expect(button).toBeVisible();
});

test('Texto "Products" visível na tela de inventário', async({page})=>{
    await page.goto("/");

    await page.getByRole('textbox',{name:'Username'}).fill('standard_user');
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();
    
    await expect(page.locator('.title')).toBeVisible();
}); */