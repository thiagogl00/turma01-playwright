import {test,expect} from "@playwright/test";
import { login } from "../helpers/auth";

test.beforeEach(async({page})=>{
    await login(page);
});

test.describe("Verificação da visibilidade dos elementos do produto Sauce Labs Onesie", () => {
    test("Verificar visibilidade do botão adicionar ao carrinho" , async({page})=>{
        const button = page.getByRole('button', {name: 'Add to cart'}).nth(4);
        await expect(button).toBeVisible();
    });

    test("Verificar visibilidade da imagem do produto" , async({page})=>{
        const imagem = page.getByAltText("Sauce Labs Onesie");
        await expect(imagem).toBeVisible();
    });

    test("Verificar visibilidade do nome do produto" , async({page})=>{
        const produto = page.getByText('Sauce Labs Onesie').first();
        await expect(produto).toBeVisible();
    });

    test("Verificar visibilidade da descrição do produto" , async({page})=>{ 
        await expect(page.locator('.inventory_item_desc').nth(4)).toBeVisible();
    });

    test("Verificar visibilidade do preço do produto" , async({page})=>{
        await expect(page.locator('.inventory_item_price').nth(4)).toBeVisible();
    });
});

test.describe("Verifica interações com elementos do produto Sauce Labs Onesie", () => {
    test("validar redirecionamento para a página de detalhes do produto ao clicar na imagem", async({page})=>{
        await page.click('#item_2_img_link');
        await expect(page).toHaveURL(/inventory-item.html/); 
        await expect(page.locator('.inventory_details_container')).toBeVisible();
    });
    
    test("validar redirecionamento para a página de detalhes do produto ao clicar no nome do produto", async({page})=>{
        await page.click('#item_2_title_link');
        await expect(page).toHaveURL(/inventory-item.html/);
        await expect(page.locator('.inventory_details_container')).toBeVisible();
    });

    test("validar adição do produto ao carrinho ao clicar no botão 'Add to cart'", async({page})=>{
        await page.click('#add-to-cart-sauce-labs-onesie');
        await page.click('.shopping_cart_link');
        await expect(page).toHaveURL(/cart.html/);
        await expect(page.locator('.cart_quantity')).toHaveText('1');
    });

    test("validar remoção do produto do carrinho ao clicar no botão 'Remove'", async({page})=>{
        await page.click('#add-to-cart-sauce-labs-onesie');
        await page.click('.shopping_cart_link');
        await expect(page).toHaveURL(/cart.html/);
        await page.click('#remove-sauce-labs-onesie');
        await expect(page.locator('.cart_quantity')).not.toBeVisible();
    });
});