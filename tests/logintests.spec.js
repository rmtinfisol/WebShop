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

});