import { test, expect } from '@playwright/test';
import { TopLevelLinks } from '../Pages/toplevellinks';
import { CategoriesLeftMenu } from '../Pages/categoriesleftmenu';
import { Login } from '../Pages/login';
import { ProductDetailsPage } from '../Pages/productdetailspage';
import { ShoppingCartPage } from '../Pages/shoppingcartpage';

async function clearShoppingCart(page) {

    const topLevelLinks = new TopLevelLinks(page);
    const shoppingCartPage = new ShoppingCartPage(page);

    await topLevelLinks.clickShoppingCartLink();
    await shoppingCartPage.emptyShoppingCart()

    // Verify shopping cart is empty        
    const exist = await shoppingCartPage.verifyShoppingcartIsEmpty();
    expect(exist).toBeTruthy()

    //await shoppingCartPage.locator(shoppingCartPage.updateShoppingCartButton).click();



}

test("Order and Checkout", async ({ page }) => {

    const topLevelLinks = new TopLevelLinks(page);
    const categoriesLeftMenu = new CategoriesLeftMenu(page);
    const login = new Login(page);
    const productdetailspage = new ProductDetailsPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);


    // Navigate to the homepage and click on the login link
    await page.goto('https://demowebshop.tricentis.com/');
    await topLevelLinks.clickLoginLink();
    // Login with valid credentials
    await login.loginUser('qr1w0.hnqmj@example.com', 'Password123');

    //checking shopping cart and delete shopping cart items if there any items

    const cartqty = await page.locator(topLevelLinks.shoppingCartQty).innerText()
    if (await cartqty !== '(0)') {

        await clearShoppingCart(page)
        await page.getByAltText('Tricentis Demo Web Shop').click()

    }

    //click on Apparel category from the left menu
    await page.click(categoriesLeftMenu.apparelLink);
    // Click on the first product in the list
    await page.locator(categoriesLeftMenu.apparelLink).click();

    // Click on the first product in the list
    const itemtobuy = "Blue Jeans";
    const qty = "25"
    await page.getByText(itemtobuy).dblclick();

    const headingText = await page.locator(productdetailspage.productName).innerText()
    expect(headingText).toBe(itemtobuy);

    await page.locator(productdetailspage.qtyInput).fill(qty);
    await page.locator(productdetailspage.addtoCartButton).click();

});

test("Verify product and Price Details in the cart", async ({ page }) => {

    const topLevelLinks = new TopLevelLinks(page);
    const categoriesLeftMenu = new CategoriesLeftMenu(page);
    const login = new Login(page);
    const productdetailspage = new ProductDetailsPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);


    // Navigate to the homepage and click on the login link
    await page.goto('https://demowebshop.tricentis.com/');

    await topLevelLinks.clickLoginLink();

    // Login with valid credentials
    await login.loginUser('qr1w0.hnqmj@example.com', 'Password123');

    //Checking Shopping Cart is empty

    const cartqty = await page.locator(topLevelLinks.shoppingCartQty).innerText()
    if (await cartqty !== '(0)') {

        await clearShoppingCart(page)
        await page.getByAltText('Tricentis Demo Web Shop').click()

    }

    //click on Apparel category from the left menu
    await page.click(categoriesLeftMenu.apparelLink);
    // Click on the first product in the list
    await page.locator(categoriesLeftMenu.apparelLink).click();

    // Click on the first product in the list
    const itemtobuy = "Blue Jeans";
    const qty = "25"
    await page.getByText(itemtobuy).dblclick();

    const headingText = await page.locator(productdetailspage.productName).innerText()
    expect(headingText).toBe(itemtobuy);

    await page.locator(productdetailspage.qtyInput).fill(qty);
    await page.locator(productdetailspage.addtoCartButton).click();

    await topLevelLinks.clickShoppingCartLink()

    const shoppingCartItemData = await shoppingCartPage.getShoppingCartData()

    /*
    const allCartItems = [];

    const shoppingCartTable = page.locator(shoppingCartPage.shoppingCart);
    const shoppingCartItemRows = shoppingCartTable.locator(shoppingCartPage.shoppingCartRows);
    const rowCount = await shoppingCartItemRows.count();

    for (let i = 0; i < rowCount; i++) {
        const cartItemrow = shoppingCartItemRows.nth(i);

        const cartItems = {
            removeItemElement: await cartItemrow.locator(shoppingCartPage.removeFromCartChkBox),
            productName: await cartItemrow.locator(shoppingCartPage.shoppingCartProduct).textContent(),
            price: parseFloat((await cartItemrow.locator(shoppingCartPage.shoppingCartPrice).textContent()).replace(/[^0-9.]/g, '')),
            quantity: parseInt(await cartItemrow.locator(shoppingCartPage.shoppingCartQtyInput).inputValue()),
            total: parseFloat((await cartItemrow.locator(shoppingCartPage.shoppingCartSubTotal).textContent()).replace(/[^0-9.]/g, ''))
        };

        allCartItems.push(cartItems);
    }
        */
});



