import { test as base, expect } from '@playwright/test';
import { TopLevelLinks } from '../Pages/toplevellinks';
import { ShoppingCartPage } from '../Pages/shoppingcartpage';


export const test = base.extend({
    emptyShoppingCart: async ({ page }, use) => {

        const topLevelLinks = new TopLevelLinks(page);
        const shoppingCartPage = new ShoppingCartPage(page);

        await page.goto('https://demowebshop.tricentis.com/');


        await topLevelLinks.clickShoppingCartLink();
        //await shoppingCartPage.emptyShoppingCart()

        // Verify shopping cart is empty        
        const exist = await shoppingCartPage.isShoppingcartEmpty();
        //expect(exist).toBeTruthy()

        //false means shopping cart is not empty

        if (exist == false) {
            await shoppingCartPage.emptyShoppingCart()
        }
        else {
            await page.getByAltText('Tricentis Demo Web Shop').click();
        }


        //page.getByAltText('Tricentis Demo Web Shop').click()


        await use();
    }

})

export { expect };