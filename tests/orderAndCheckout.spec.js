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
    const exist = await shoppingCartPage.isShoppingcartEmpty();
    expect(exist).toBeTruthy()


}


async function addtoCart(page, categoriesLeftMenu, productdetailspage, productCategory, itemtobuy, qty) {


    //Clicking on product category
    await categoriesLeftMenu.selectCategory(productCategory);

    //Click on the link for the item to buy
    await page.getByText(itemtobuy).click();

    //Making sure product page is opened
    const headingText = await page.locator(productdetailspage.productName).innerText();
    expect(headingText).toBe(itemtobuy);

    //Enter quantify and add to cart

    await page.locator(productdetailspage.qtyInput).fill(qty);
    await page.locator(productdetailspage.addtoCartButton).click();

    await page.reload();
}

test.describe('shopping Cart Tests', (page) => {

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
            //await page.getByAltText('Tricentis Demo Web Shop').click()

        }

        await addtoCart(page, categoriesLeftMenu, productdetailspage, categoriesLeftMenu.AvailableCategories.APPAREL_AND_SHOES, "Blue Jeans", "25");


    });

    test.only("Verify product and Price Details in the cart", async ({ page }) => {

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
            //await page.getByAltText('Tricentis Demo Web Shop').click()

        }

        //click on Apparel category from the left menu
        await addtoCart(page, categoriesLeftMenu, productdetailspage, categoriesLeftMenu.AvailableCategories.APPAREL_AND_SHOES, "Blue Jeans", "25");
        await addtoCart(page, categoriesLeftMenu, productdetailspage, categoriesLeftMenu.AvailableCategories.APPAREL_AND_SHOES, "Casual Golf Belt", "25");

        await topLevelLinks.clickShoppingCartLink();
        await page.locator(shoppingCartPage.shoppingCart).hover();


        //get shoppingCartdata and validate it against Cart-total summary data
        const shoppingCartItemsData = await shoppingCartPage.getShoppingCartData()

        const shoppingCartTotals = await shoppingCartPage.getShoppingCartTotals(shoppingCartItemsData)

        const totalQuanities = await shoppingCartTotals.totalQuantities
        const totalPrice = await shoppingCartTotals.totalPrice


        let actualShoppingCartQty = await topLevelLinks.getShoppingCartLinkQty();


        //let actualShoppingCartQty = parseInt(shoppingCartQtyElementText.match(/\d+/));
        expect(actualShoppingCartQty).toBe(totalQuanities)

        const cartTotalData = await shoppingCartPage.getCartTotalTableData()

        console.log(cartTotalData);

        const cartTotalSubTotal = cartTotalData['Sub-Total']

        expect(totalPrice).toBe(cartTotalSubTotal)

    });

});

