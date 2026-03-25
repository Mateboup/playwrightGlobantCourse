import { LoginPage, ProductsPage } from '../pages';
import { test, expect } from './baseTest';


test.describe('Mercado Libre Search', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;

test.beforeEach(async ({ page, step }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await step('Abrir página de login', async () => {
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        //await loginPage.searchProduct('iphone');
    });
});


    test('Searching Iphone ', async ({ page }) => {

        await expect(page.locator('div[data-test="inventory-list"]')).toBeVisible();
        await expect(page.locator('span[data-test="title"]')).toHaveText('Products');
        const titles = await page.locator('div[data-test="inventory-item"]').allInnerTexts();

        console.log(titles);
        console.log('Total de productos encontrados: ' + titles.length);

        for (let title of titles) {
            console.log('Producto encontrado: ' + title);
        }

    });

    test('Searching Laptop', async ({ page }) => {
        await page.goto('https://www.mercadolibre.com.co/');

        await page.locator('input[id="cb1-edit"]').fill('laptop');
        //await page.locator('//*[@id="cb1-edit"]').fill('Mouse');
        //await page.getByRole('combobox', { name: 'Ingresa lo que quieras encontrar' }).fill('Test');

        await page.getByRole('button', { name: 'Buscar' }).click();

        await expect(page.locator('//ol[contains(@class,"ui-search-layout ui-search-layout--grid")]')).toBeVisible();


    });

    test.afterAll(async ({ page }) => {
        await page.close();
    });  
});   