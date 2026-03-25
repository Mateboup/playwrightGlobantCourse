import { test } from './baseTest';
import { LoginPage, ProductsPage } from '../pages';
import { validUsers, invalidUsers } from '../fixtures/testData';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  // Setup que se ejecuta antes de cada test
  test.beforeEach(async ({ page, step }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await step('Abrir página de login', async () => {
      await loginPage.goto();
    });
  });

  test('should login successfully with valid credentials', async ({ step }) => {
    // Arrange - Los datos están en testData
    const { username, password } = validUsers.standard;

    // Act - Realizar el login
    await step('Ingresar credenciales válidas', async () => {
      await loginPage.login(username, password);
    });

    // Assert - Verificar que llegamos a la página de productos
    await step('Validar página de productos', async () => {
      await productsPage.expectPageLoaded();
    });
  });

  test('should show error message with invalid credentials', async ({ step }) => {
    // Arrange - Credenciales inválidas
    const { username, password } = invalidUsers.wrongUsername;

    // Act - Intentar login con credenciales incorrectas
    await step('Intentar login con credenciales inválidas', async () => {
      await loginPage.login(username, password);
    });

    // Assert - Verificar mensaje de error
    await step('Validar mensaje de error por credenciales inválidas', async () => {
      await loginPage.expectErrorVisible();
      await loginPage.expectErrorContainsText('Epic sadface');
    });
  });

  test('should show error when username is empty', async ({ step }) => {
    // Act - Intentar login sin username
    await step('Intentar login con username vacío', async () => {
      await loginPage.login('', validUsers.standard.password);
    });

    // Assert - Verificar mensaje de error
    await step('Validar mensaje de username requerido', async () => {
      await loginPage.expectErrorVisible();
      await loginPage.expectErrorContainsText('Username is required');
    });
  });

  test('should show error when password is empty', async ({ step }) => {
    // Act - Intentar login sin password
    await step('Intentar login con password vacío', async () => {
      await loginPage.login(validUsers.standard.username, '');
    });

    // Assert - Verificar mensaje de error
    await step('Validar mensaje de password requerido', async () => {
      await loginPage.expectErrorVisible();
      await loginPage.expectErrorContainsText('Password is required');
    });
  });

   test.afterAll(async ({ page }) => {
        await page.close();
    }); 
});
