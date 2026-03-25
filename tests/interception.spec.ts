import { test, expect } from './baseTest';

test.describe('Interception tests', () => {

test('Intercept login request', async ({ page }) => {

  //page route intercepta el login 
  await page.route('**/login', async route => {
    console.log('Login request intercepted');
    await page.pause();
    // deja que siga el backend real 
    await route.continue();
  });

  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

});

test('Mock login error', async ({ page }) => {

  await page.on('request', request => {
    console.log('Request made:', request.url());
  });
   
   await page.route("**/*.{png,jpg,jpeg}", route => route.abort());

  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');

    });
});