export class CategoriesLeftMenu {
    constructor(page) {
        this.page = page;
        this.computersLink = '//div[@class="listbox"]//a[contains(text(), "Computers")]';
        this.electronicsLink = '//div[@class="listbox"]//a[contains(text(), "Electronics")]';
        this.apparelLink = '//div[@class="listbox"]//a[contains(text(), "Apparel")]';
        this.digitalDownloadsLink = '//div[@class="listbox"]//a[contains(text(), "Digital downloads")]';
        this.booksLink = '//div[@class="listbox"]//a[contains(text(), "Books")]';
        this.jewelryLink = '//div[@class="listbox"]//a[contains(text(), "Jewelry")]';
        this.giftCardsLink = '//div[@class="listbox"]//a[contains(text(), "Gift Cards")]';
        this.computersSubCategories = {
            desktopsLink: '//div[@class="listbox"]//a[contains(text(), "Desktops")]',
            notebooksLink: '//div[@class="listbox"]//a[contains(text(), "Notebooks")]',
            accessoriesLink: '//div[@class="listbox"]//a[contains(text(), "Accessories")]'
        };

        this.AvailableCategories = Object.freeze({
        BOOKS: 'Books',
        COMPUTERS: 'Computers',
        DESKTOPS: 'Desktops',
        NOTEBOOKS: 'Notebooks',
        ACCESSORIES: 'Accessories',
        ELECTRONICS: 'Electronics',
        APPAREL_AND_SHOES: 'ApparelAndShoes',
        DIGITAL_DOWNLOADS: 'Digital Downloads',
        JEWELRY: 'Jewelry',
        GIFT_CARDS: 'GiftCards'
    }); 

    }


    async selectCategory(category) {
    
        switch (category) {

        case this.AvailableCategories.BOOKS:
            await this.page.locator(this.booksLink).click();
            break;

        case this.AvailableCategories.COMPUTERS:
            await this.page.locator(this.computersLink).click();
            break;

        case this.AvailableCategories.DESKTOPS:
            await this.page.locator(this.computersSubCategories.desktopsLink).click();
            break;

        case this.AvailableCategories.NOTEBOOKS:
            await this.page.locator(this.computersSubCategories.notebooksLink).click();
            break;

        case this.AvailableCategories.ACCESSORIES:
            await this.page.locator(this.computersSubCategories.Accessories).click();
            break;

        case this.AvailableCategories.ELECTRONICS:
            await this.page.locator(this.electronicsLink).click();
            break;
        
        case this.AvailableCategories.APPAREL_AND_SHOES:
            await this.page.locator(this.apparelLink).click();
            break;
        
    }

}
}
