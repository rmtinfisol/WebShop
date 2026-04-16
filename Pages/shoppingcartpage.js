import { TopLevelLinks } from '../Pages/toplevellinks';
import { CategoriesLeftMenu } from '../Pages/categoriesleftmenu';
import { Login } from '../Pages/login';
import { ProductDetailsPage } from '../Pages/productdetailspage';


export class ShoppingCartPage {
    
    constructor(page) {
        this.page = page;
        this.shoppingCartPageTitle = '//div[@class="page-title"]';
        this.shoppingCart = '//table[@class="cart"]';
        this.shoppingCartRows = 'tbody tr';
        this.removeFromCartChkBox = '//input[@name="removefromcart"]';
        this.shoppingCartProduct = 'a.product-name';
        this.shoppingCartQtyInput = 'input.qty-input';
        this.shoppingCartSubTotal = 'span.product-subtotal';
        this.shoppingCartPrice = 'span.product-unit-price';
        this.updateShoppingCartButton = '//input[@value="Update shopping cart"]';
        this.continueShoppingButton = '//input[@value="Continue shopping"]';
        this.applyCouponButton = '//input[@value="Apply coupon"]';
        this.estimateShippingButton = '//input[@value="Estimate shipping"]';
        this.checkoutButton = '//input[@value="checkout"]';
        this.addGiftCardButton = '//input[@value="Add gift card"]';
        this.couponCodeTxtBox = '//input[@name="discountcouponcode"]';
        this.giftCardTxtBox = '//input[@name="giftcardcouponcode"]';
        this.termsOfServiceChkBox = '#termsofservice';
        this.countryDropdown = '#CountryId';
        this.zipcodeTxtBox = '#ZipPostalCode';
        this.stateProvinceIdDropdown = '#StateProvinceId';
        this.cartTotal = '//table[@class="cart-total"]//tr';

    }

        async selectShoppingCartItemsforRemoval() {
        const shoppingCartTable = await this.page.locator(this.shoppingCart);
        const cartrows = await shoppingCartTable.locator(this.shoppingCartRows);
        const removeItem = await cartrows.locator(this.removeFromCartChkBox)

        for (let i = 0; i < await removeItem.count(); i++) {
            await removeItem.nth(i).check();
        }
    }

    async verifyShoppingcartIsEmpty() {

        if (await this.page.locator(this.shoppingCart).count > 1) {
            console.log("shopping cart is not empty")
            return false;
        }
        else {
            console.log("shopping cart is  empty")
            return true;
        }

    }

    async emptyShoppingCart() {

        await this.selectShoppingCartItemsforRemoval()
        await this.page.locator(this.updateShoppingCartButton).click();

        // Verify shopping cart is empty        
       // const exist = await this.verifyShoppingcartIsEmpty();
        await this.page.getByAltText('Tricentis Demo Web Shop').click()
    }

    async getShoppingCartData() {
        const allCartItems = [];

        const shoppingCartTable = this.page.locator(this.shoppingCart);
        const shoppingCartItemRows = shoppingCartTable.locator(this.shoppingCartRows);
        const rowCount = await shoppingCartItemRows.count();

        for (let i = 0; i < rowCount; i++) {
            const cartItemrow = shoppingCartItemRows.nth(i);

            const cartItems = {
                removeItemElement: await cartItemrow.locator(this.removeFromCartChkBox),
                productName: await cartItemrow.locator(this.shoppingCartProduct).textContent(),
                price: parseFloat((await cartItemrow.locator(this.shoppingCartPrice).textContent()).replace(/[^0-9.]/g, '')),
                quantity: parseInt(await cartItemrow.locator(this.shoppingCartQtyInput).inputValue()),
                total: parseFloat((await cartItemrow.locator(this.shoppingCartSubTotal).textContent()).replace(/[^0-9.]/g, ''))
            };

            allCartItems.push(cartItems);
        }

        return allCartItems;
    }


}