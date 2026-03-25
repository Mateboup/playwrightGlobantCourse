import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryContainer: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.inventoryContainer = page.locator('.inventory_container');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  /**
   * Verifica que la página de productos esté cargada
   */
  async expectPageLoaded() {
    await expect(this.page).toHaveTitle(/Swag Labs/);
    await expect(this.inventoryContainer).toBeVisible();
  }

  /**
   * Verifica que el título de la página sea el esperado
   */
  async expectPageTitle(title: string) {
    await expect(this.pageTitle).toHaveText(title);
  }
}
