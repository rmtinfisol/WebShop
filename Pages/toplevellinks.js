export class TopLevelLinks {

    constructor(page) {
        this.page = page;
        this.shoppingCartQty = '//a/span[@class="cart-qty"]'
        this.topNavigationLinks = '.header-links'
        this.cartQty = `${this.topNavigationLinks} .cart-qty`

    }

    async clickLoginLink() {
        await this.page.click('//a[@href="/login"]');
    }

    async clickLogOutLink() {
        await this.page.click('//a[@href="/logout"]');
    }

    async clickRegisterLink() {
        await this.page.click('//a[@href="/register"]');
    }

    async clickShoppingCartLink() {
        await this.page.click('//div[@class="header-links"]//a[@href="/cart"]');
    }

    async clickWishlistLink() {
        await this.page.click('//div[@class="header-links"]//a[@href="/wishlist"]');
    }

    async clickUserAccountInfo() {
        await this.page.click('.header-links a.account');
    }

    async getUserAccountinfo() {
        return await this.page.locator('.header-links a.account').textContent();
    }

    //if you want to know the QTY displayed
    async getShoppingCartLinkQty() {
        return parseInt((await this.page.locator(this.shoppingCartQty).textContent()).match(/\d+/));
    }

    async topNavLinks() {
        return this.page.locator(this.topNavigationLinks);
    }

    async isShoppingcartEmpty() {
        let shoppingCartQtyLocator = await this.page.locator(this.cartQty);
        let shoppingCartQty = await shoppingCartQtyLocator.textContent()

        if (shoppingCartQty?.trim() !== '(0)') {
            return false;
        } else {
            return true;
        }

    }

    async isUserLoggedIn() {
        
        const logOutLink = this.page.getByRole('link', {name: 'Log out'})
        

        if (await logOutLink.isVisible()){
            console.log("User already logged in")
            return true;
        }
        else{
            console.log("User not logged in")
            return false;
        }


    }

}