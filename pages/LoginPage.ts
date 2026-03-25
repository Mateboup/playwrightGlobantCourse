import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navega a la página de login
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Realiza el login con credenciales proporcionadas
   * @param username - Nombre de usuario
   * @param password - Contraseña
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async searchProduct(productName: string) {
    await this.page.locator('input[id="searchInput"]').fill(productName);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Verifica que el mensaje de error sea visible
   */
  async expectErrorVisible() {
    await expect(this.errorMessage).toBeVisible();
  }

  /**
   * Verifica que el mensaje de error contenga el texto esperado
   * @param text - Texto esperado en el mensaje de error
   */
  async expectErrorContainsText(text: string) {
    await expect(this.errorMessage).toContainText(text);
  }

  /**
   * Obtiene el texto completo del mensaje de error
   */
  async getErrorText(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }
}
