import { TopLevelLinks } from '../Pages/toplevellinks';
import { CategoriesLeftMenu } from '../Pages/categoriesleftmenu';
import { Login } from '../Pages/login';
import { ProductDetailsPage } from '../Pages/productdetailspage';
import { subscribe } from 'node:diagnostics_channel';


export class ShoppingCartPage {

    constructor(page) {
        this.page = page;
        this.shoppingCartPageTitle = 'div.page-title';
        this.shoppingCart = 'table.cart';
        this.shoppingCartRows = 'tbody tr';
        this.removeFromCartChkBox = 'input[name="removefromcart"]';
        this.shoppingCartProduct = 'a.product-name';
        this.shoppingCartQtyInput = 'input.qty-input';
        this.shoppingCartSubTotal = 'span.product-subtotal';
        this.shoppingCartPrice = 'span.product-unit-price';
        this.updateShoppingCartButton = '//input[@value="Update shopping cart"]';
        this.continueShoppingButton = '//input[@value="Continue shopping"]';
        this.applyCouponButton = '//input[@value="Apply coupon"]';
        this.estimateShippingButton = '//input[@value="Estimate shipping"]';
        this.checkoutButton = '//button[@value="checkout"]';
        this.addGiftCardButton = '//input[@value="Add gift card"]';
        this.couponCodeTxtBox = '//input[@name="discountcouponcode"]';
        this.giftCardTxtBox = '//input[@name="giftcardcouponcode"]';
        this.termsOfServiceChkBox = '#termsofservice';
        this.countryDropdown = '#CountryId';
        this.zipcodeTxtBox = '#ZipPostalCode';
        this.stateProvinceIdDropdown = '#StateProvinceId';
        this.cartTotal = 'table.cart-total';
        this.cartTotalTableRows = 'table.cart-total tr'
        this.cartTotalTableFieldName = '.cart-total-left'
        this.cartTotalTableFieldValue = '.cart-total-right'

    }

    async selectShoppingCartItemsforRemoval() {
        const removeItem = this.page.locator(`${this.shoppingCart} ${this.shoppingCartRows} ${this.removeFromCartChkBox}`);
        const count = await removeItem.count();
        console.log("Cart Item Count: " + count)

        for (let i = 0; i < count; i++) {
            await removeItem.nth(i).check();
        }
    }

    async   isShoppingcartEmpty() {

        const rowCount = await this.page.locator(`${this.shoppingCart} ${this.shoppingCartRows}`).count();
        if (rowCount > 0) {
            console.log("shopping cart is not empty")
            return false;
        } else {
            console.log("shopping cart is  empty")
            return true;
        }

    }

    async emptyShoppingCart() {

        await this.selectShoppingCartItemsforRemoval()
        await this.page.locator(this.updateShoppingCartButton).click();
        await this.page.getByAltText('Tricentis Demo Web Shop').click()
    }

    //function to read UI shopping cart and return an object with data (Price, quantity and Total data as numbers and float)

    async getShoppingCartData() {
        const allCartItems = [];

        const shoppingCartTable = this.page.locator(this.shoppingCart);
        const shoppingCartItemRows = shoppingCartTable.locator(this.shoppingCartRows);
        const rowCount = await shoppingCartItemRows.count();

        for (let i = 0; i < rowCount; i++) {
            const cartItemrow = shoppingCartItemRows.nth(i);

            const cartItems = {
                removeItemElement: cartItemrow.locator(this.removeFromCartChkBox),
                productName: await cartItemrow.locator(this.shoppingCartProduct).textContent(),
                price: parseFloat((await cartItemrow.locator(this.shoppingCartPrice).textContent()).replace(/[^0-9.]/g, '')),
                quantity: parseInt(await cartItemrow.locator(this.shoppingCartQtyInput).inputValue()),
                total: parseFloat((await cartItemrow.locator(this.shoppingCartSubTotal).textContent()).replace(/[^0-9.]/g, ''))
            };

            allCartItems.push(cartItems);
        }

        return allCartItems;
    }


    async getCartTotalTableData() {

        
        const cartTotalTableData = {}

        const rows = await this.page.locator(this.cartTotalTableRows).all();

        for (const row of rows) {
            const name = await row.locator(this.cartTotalTableFieldName).textContent();
            const value = parseFloat(await row.locator(this.cartTotalTableFieldValue).textContent());

            const cleanKey = name.trim().replace(/:/g, '');

            cartTotalTableData[cleanKey] = value;

            
        }

        return cartTotalTableData;

    }

    //get total items count and Total price data from cartTotalTableData object. You get this object from function getCartTotalTableData()

    async getShoppingCartTotals(cartItemsData){

        let totalQuanitiesinCart = 0;
            let totalpriceinShoppingcart= 0;

            for (const cartItem of cartItemsData) {

                const productName = cartItem.productName;
                const productPrice = cartItem.price
                const totalPrice = cartItem.total;
                const quantity = cartItem.quantity;

                totalQuanitiesinCart += quantity;
                totalpriceinShoppingcart += totalPrice
                
            }
         return {
                    totalQuantities: totalQuanitiesinCart,
                    totalPrice: totalpriceinShoppingcart
                
                }
    }


}


