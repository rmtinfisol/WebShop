import { test, expect } from '@playwright/test';
import { TopLevelLinks } from '../Pages/toplevellinks';
import { CategoriesLeftMenu } from '../Pages/categoriesleftmenu';
import { Login } from '../Pages/login';
import { ProductDetailsPage } from '../Pages/productdetailspage';
import { ShoppingCartPage } from '../Pages/shoppingcartpage';
import { CheckOut } from '../Pages/checkout';
import { CheckOutPage } from '../Pages/checkoutcomponents/checkoutpage';

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
    expect(headingText).toContain(itemtobuy);

    //Enter quantify and add to cart

    await page.locator(productdetailspage.qtyInput).fill(qty);
    await page.locator(productdetailspage.addtoCartButton).click();

    await page.reload();
}

async function paymentCreditCard(page, checkout) {

    await page.locator(checkout.creditCardType).select('Visa')
    await page.locator(checkout.cardHolderName).fill('Barbara Gordon')
    await page.locator(checkout.cardNumber).fill('4485564059489345')
    await page.locator(checkout.expireMonth).select('04')
    await page.locator(checkout.expireYear).select('2024')
    await page.locator(checkout.cardCode).fill('123')

    await page.locatpr(checkout.paymentInformationContinueButton).click()

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
       

        const isUserLoggedIn = await topLevelLinks.isUserLoggedIn()
        expect(isUserLoggedIn).toBeTruthy();

        const cartEmpty = await topLevelLinks.isShoppingcartEmpty()

        // const cartqty = await page.locator(topLevelLinks.shoppingCartQty).innerText()
        if (!cartEmpty) {

            await clearShoppingCart(page)
            //await page.getByAltText('Tricentis Demo Web Shop').click()

        }

        await addtoCart(page, categoriesLeftMenu, productdetailspage, categoriesLeftMenu.AvailableCategories.APPAREL_AND_SHOES, "Blue Jeans", "25");


    });

    test("Verify product and Price Details in the cart", async ({ page }) => {

        const topLevelLinks = new TopLevelLinks(page);
        const categoriesLeftMenu = new CategoriesLeftMenu(page);
        const login = new Login(page);
        const productdetailspage = new ProductDetailsPage(page);
        const shoppingCartPage = new ShoppingCartPage(page);


        // Navigate to the homepage and click on the login link
        await page.goto('https://demowebshop.tricentis.com/');


        const cartEmpty = await topLevelLinks.isShoppingcartEmpty()

        if (!cartEmpty) {

            await clearShoppingCart(page)
        }

        //click on Apparel category from the left menu
        await addtoCart(page, categoriesLeftMenu, productdetailspage, categoriesLeftMenu.AvailableCategories.APPAREL_AND_SHOES, "Blue Jeans", "25");
        await addtoCart(page, categoriesLeftMenu, productdetailspage, categoriesLeftMenu.AvailableCategories.APPAREL_AND_SHOES, "Casual Golf Belt", "25");

        await topLevelLinks.clickShoppingCartLink();
        await page.locator(shoppingCartPage.shoppingCart).hover();


        //get shoppingCartdata and validate it against Cart-total summary data
        const shoppingCartItemsData = await shoppingCartPage.getShoppingCartData()

        //verify shopping cart total for each line item = price* quantity

        for (const item of shoppingCartItemsData) {

            expect(item.price * item.quantity).toBe(item.total)

        }

        const shoppingCartTotals = await shoppingCartPage.getShoppingCartTotals(shoppingCartItemsData)

        const totalQuanities = await shoppingCartTotals.totalQuantities
        const totalPrice = await shoppingCartTotals.totalPrice

        let actualShoppingCartQty = await topLevelLinks.getShoppingCartLinkQty();


        // verifying Item count displayed in shoppingCart is matching with some of quanties for each item
        expect(actualShoppingCartQty).toBe(totalQuanities)


        const cartTotalData = await shoppingCartPage.getCartTotalTableData()

        console.log(cartTotalData);

        const cartTotalSubTotal = cartTotalData['Sub-Total']

        //verify total price of all items in shopping cart is matching with subTotal in cart Total Data
        expect(totalPrice).toBe(cartTotalSubTotal)

    });

    test("Verify a user can purchase items and complete the checkout successfully", async ({ page }) => {

        const topLevelLinks = new TopLevelLinks(page);
        const categoriesLeftMenu = new CategoriesLeftMenu(page);
        const login = new Login(page);
        const productdetailspage = new ProductDetailsPage(page);
        const shoppingCartPage = new ShoppingCartPage(page);
        const checkout = new CheckOut(page);

        // Navigate to the homepage and click on the login link
        await page.goto('https://demowebshop.tricentis.com/');

  
        const cartEmpty = await topLevelLinks.isShoppingcartEmpty()

        if (!cartEmpty) {

            await clearShoppingCart(page)
        }

        //click on Apparel category from the left menu
        await addtoCart(page, categoriesLeftMenu, productdetailspage, categoriesLeftMenu.AvailableCategories.APPAREL_AND_SHOES, "Blue Jeans", "25");
        // await addtoCart(page, categoriesLeftMenu, productdetailspage, categoriesLeftMenu.AvailableCategories.APPAREL_AND_SHOES, "Casual Golf Belt", "25");

        await topLevelLinks.clickShoppingCartLink();

        await page.locator(shoppingCartPage.termsOfServiceChkBox).check();

        //await page.locator(shoppingCartPage.checkoutButton).click();
        await page.getByRole('button', { name: 'checkout' }).click();

        await page.locator(checkout.addressDropdown).selectOption({ index: 0 });

        //clicking continue button twice for moving to Shipping Address (no instore pickup)


        await page.locator(checkout.billingAddressContinueButton).click();
        //await page.getByRole('input', { value : 'Continue' }).click();
        await page.locator(checkout.shippingAddressContinueButton).click();


        //Select shipping method

        const shipMethodRadio = await checkout.selectShippingMethodByLabel(/Next Day Air/i);
        await shipMethodRadio.click();


        const shippingMethodDescription = await checkout.getShippingMethodDescription('Next Day Air (40.00)');

        expect(checkout.shippingMethodDescriptionMaster['Next Day Air (40.00)']).toBe(shippingMethodDescription);


        //click continue button in shipping Method screen

        await page.locator(checkout.shippingMethodContinueButton).click();

        //select Payment method

        const paymentMethod = await checkout.paymentMethodElement("COD");
        await paymentMethod.check();
        await page.locator(checkout.paymentMethodContinueButton).click();

        //Payment information
        await page.locator(checkout.paymentInformationContinueButton).click();

        await page.locator(checkout.confirmContinueButton).click();
        await expect(page.locator('#confirm-order-please-wait')).toBeHidden();
    })

    test("Complete an order with Instore Pickup and Payment via Check / Money Order", async ({ page }) => {

        const topLevelLinks = new TopLevelLinks(page);
        const categoriesLeftMenu = new CategoriesLeftMenu(page);
        const productdetailspage = new ProductDetailsPage(page);
        const shoppingCartPage = new ShoppingCartPage(page);
        const checkOutPages = new CheckOutPage(page);


        await page.goto('https://demowebshop.tricentis.com/')

        const cartEmpty = await topLevelLinks.isShoppingcartEmpty()

        if (!cartEmpty) {
            await clearShoppingCart(page)
        }

        //click on Apparel category from the left menu
        await addtoCart(page, categoriesLeftMenu, productdetailspage, categoriesLeftMenu.AvailableCategories.APPAREL_AND_SHOES, "Blue Jeans", "25");
        await topLevelLinks.clickShoppingCartLink()

        await page.locator(shoppingCartPage.termsOfServiceChkBox).check();

        await page.getByRole('button', {name: 'Checkout'}).click();
        
        //await checkOutPages.billingAddress.selectAddressByIndex(0);

        await checkOutPages.performCheckOut(0,true, 'Check / Money Order');

        

     });



});

