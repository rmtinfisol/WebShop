import { test, expect } from '../fixtures/clearShoppingCart'
//import { TopLevelLinks } from '../Pages/toplevellinks';
import { ShoppingCartPage } from '../Pages/shoppingcartpage';
//import { CategoriesLeftMenu } from '../Pages/categoriesleftmenu';
import { ProductDetailsPage } from '../Pages/productdetailspage';
import { ProductLists } from '../Pages/productlists';
import { CheckOutPage } from '../Pages/checkoutcomponents/checkoutpage';
import { CommonLinks } from '../pages/commonlinks';

test('Checkout with Cash on Delivery', async ({ emptyShoppingCart, page }) => {

    //const topLevelLinks = new TopLevelLinks(page)
   // const categoriesleftmenu = new CategoriesLeftMenu(page)
    const productdetailspage = new ProductDetailsPage(page)
    const productlists = new ProductLists(page)
    const checkOutPage = new CheckOutPage(page)
    //const topLevelLinks = new TopLevelLinks(page)
    const shoppingCartPage = new ShoppingCartPage(page)
    const commonLinks = new CommonLinks(page)

    await productdetailspage.addItemsToCart(commonLinks.categoriesLeftMenu, productlists, commonLinks.categoriesLeftMenu.AvailableCategories.BOOKS, 'Fiction', 5)
    await commonLinks.topLevelLinks.clickShoppingCartLink();

    await page.locator(shoppingCartPage.termsOfServiceChkBox).setChecked(true);

    await page.getByRole('button', { name: /checkout/i }).click();

    await checkOutPage.billingAddress.verifyDropDownLabelText();

    await page.getByRole("button", { name: /continue/i }).first().click()
    //await checkOutPage.billingAddress.billingAddressSelectOption('New Address')

    const heading = await page.locator('#opc-shipping').getByRole("heading", { level: 2 }).textContent();
    console.log(heading)

    const shippingAddressDropDownLabel = await page.locator('label[for="shipping-address-select"]').textContent();
    console.log(shippingAddressDropDownLabel)

    await expect(checkOutPage.shippingAddress.continueButton).toBeVisible();
    await checkOutPage.shippingAddress.continueButton.click();
    //await page.getByLabel('Select a shipping address from your address book or enter a new address.').selectOption({ label: 'New Address' });

    // Waits for the loading indicator to disappear completely
    await expect(page.locator('#shipping-please-wait')).toBeHidden();


    await checkOutPage.shippingMethod.selectShippingMethod("Next Day Air (0.00)");
    let screenTitle = await checkOutPage.shippingMethod.screenTitle()

    // compare title case-insensitively
    expect(screenTitle).toMatch(/shipping method/i);

    await checkOutPage.shippingMethod.continueButton.click()

    await expect(page.locator('#shipping-method-please-wait')).toBeHidden();

    screenTitle = await checkOutPage.paymentMethod.screenTitle();

    expect(screenTitle).toMatch(/payment method/i);

    await checkOutPage.paymentMethod.selectPaymentMethod(`Credit Card`);

    await checkOutPage.paymentMethod.continueButton.click()

    await checkOutPage.paymentInformation.paymentviaCreditCard();

    const confirmOrderScreenTitle = await checkOutPage.confirmOrder.screenTitle();
    expect(confirmOrderScreenTitle).toMatch(/Confirm Order/i);

    const confirmOrderDetails = await checkOutPage.confirmOrder.confirmOrderDetails.allTextContents()

    expect(confirmOrderDetails).toEqual(
        expect.arrayContaining([
            expect.stringContaining('Billing Address'),
            expect.stringContaining('Shipping Address'),
            expect.stringContaining('Payment Method'),
            expect.stringContaining('Shipping Method')
        ]));




    expect(checkOutPage.confirmOrder.confirmOrderDetails).toContainText(
    'John Doe',
            'Credit Card',
            'Next Day Air',
            'Fiction',
            'Total: 120.00')
        
    



    // Confirms that every item captured in the block is a valid, non-null string
    //expect(confirmOrderDetails).toEqual(expect.arrayOf(String));



})