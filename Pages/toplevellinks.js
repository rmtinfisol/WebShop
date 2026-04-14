export class TopLevelLinks {
    
    constructor (page) {
        this.page = page;
        
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

    async clickUserAccountInfo(){
        await this.page.click('.header-links a.account');
    }

    async getUserAccountinfo() {
        return await this.page.locator('.header-links a.account').textContent();
    }    
}