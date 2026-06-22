import { test, expect } from '@playwright/test';

export class ProductLists {
    constructor(page) {
        this.page = page;
        this.productGrid = '.product-grid';
        this.productItems = '.product-item';
        this.productTitles = '.product-title a';
        this.oldPrice = '.price.old-price';
        this.actualPrice = '.price.actual-price';
        this.priceRangeSelector = 'ul.price-range-selector li';
    }

    _productItemLocator(itemName) {
        return this.page.locator(this.productItems).filter({
            has: this.page.getByRole('link', { name: itemName, exact: true })
        });
    }

    async selectProductContainer(itemName) {
        return this._productItemLocator(itemName);
    }

    async getAddToCartButtonForAnItem(itemName) {
        return this._productItemLocator(itemName)
            .getByRole('button', { name: 'Add to cart' });
    }

    async getOldPrice(itemName) {
        const productItem = this._productItemLocator(itemName);
        const oldPrice = await productItem.locator(this.oldPrice).innerText();

        console.log(oldPrice); // Output: 35.00
        return oldPrice;
    }

    async getActualPrice(itemName) {
        const productItem = this._productItemLocator(itemName);
        const actualPrice = await productItem.locator(this.actualPrice).innerText();

        console.log(actualPrice);
        return actualPrice;
    }

    async getAllActualPrices() {
        const allPrices = await this.page.locator(this.actualPrice)
        return await allPrices.allInnerTexts();
    }

    async filtersByPrice(filterRange) {
        const list = this.page.locator(this.priceRangeSelector)
            //.filter({ hasText: 'Under 25.00' });
            .getByRole('link', {name : filterRange})
        return list;

    }

    async productListTitles() {
        return this.page.locator(this.productTitles)
    }

    async pagerNextbuttonexist(){
        const nextButton = this.page.getByRole('link', {name: 'Next'})
        if (await nextButton.count() > 1)
            return true
        else{
            return false
        }
    }

    async pagerPreviousbuttonexist(){
        const nextButton = this.page.getByRole('link', {name: 'Previous'})
        if (await nextButton.count() > 1)
            return true
        else{
            return false
        }
    }

    async priceFilters(){
         const filtersByPrice = this.page.locator(this.priceRangeSelector);
         const filtertexts = await filtersByPrice.allInnerTexts();
         return filtertexts;
    }


    async priceRangeInFilters(filterText){
       const numbers = filterText.match(/\d+(\.\d+)?/g)?.map(Number) || [];

       let min = 0;
       let max = Infinity;

       if (filterText.toLowerCase().includes('under')){
        max = numbers[0];
       } 
       else if(filterText.toLowerCase().includes('over')) {
        min = numbers[0];
       }
       else if (numbers.length = 2){
        min = numbers[0];
        max = numbers[1];
       }
       return {min, max} ;
    }

}