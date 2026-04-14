import { test, expect } from "@playwright/test";
import { Login } from "../Pages/login";
import { Addresses } from "../Pages/addresses";
import { TopLevelLinks } from "../Pages/toplevellinks";


test.describe('Login Tests', (page) => {

  

    test('should login successfully with valid credentials', async ({ page }) => {

        const login = new Login(page);
        const addresses = new Addresses(page);
        const topLevelLinks = new TopLevelLinks(page);

        await page.goto('https://demowebshop.tricentis.com/');
        await topLevelLinks.clickLoginLink();

        const username = 'qr1w0.hnqmj@example.com';
        const password = 'Password123';

        await login.loginUser(username, password);

        expect(page.locator(addresses.userAccountinfo)).toHaveText(username);

    });

   
    test('should not login with invalid credentials', async ({ page }) => {

        const login = new Login(page);
        const topLevelLinks = new TopLevelLinks(page);

        await page.goto('https://demowebshop.tricentis.com/');
        await topLevelLinks.clickLoginLink();

        const username = 'Ttestuser@yahoo.com';
        const password = 'WrongPassword123';

        await login.loginUser(username, password);

        // Verify that the error message is displayed

        expect(page.locator(login.loginErrorMessage)).toContainText('Login was unsuccessful. Please correct the errors and try again. The credentials provided are incorrect');


    });

    test('Logout after successful login', async ({ page }) => {

        const login = new Login(page);
        const topLevelLinks = new TopLevelLinks(page);

        await page.goto('https://demowebshop.tricentis.com/');
        await topLevelLinks.clickLoginLink();

        const username = 'qr1w0.hnqmj@example.com';
        const password = 'Password123';

        await login.loginUser(username, password);

        // Click on the logout link
        await topLevelLinks.clickLogOutLink();

        // Verify that the user is logged out by checking that the login link is visible again
        expect(await page.locator(login.loginlink)).toBeVisible();


});
});