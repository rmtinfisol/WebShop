import { test, expect } from '@playwright/test';

export class ProductLists {
    constructor(page) {
        this.page = page;
        this.productGrid = '.product-grid';
        this.productItems = '.product-item';
        this.productTitles = '.product-title a';
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
        const oldPrice = await productItem.locator('.price.old-price').innerText();

        console.log(oldPrice); // Output: 35.00
        return oldPrice;
    }

    async getActualPrice(itemName) {
        const productItem = this._productItemLocator(itemName);
        const actualPrice = await productItem.locator('.price.actual-price').innerText();

        console.log(actualPrice);
        return actualPrice;
    }

    async getAllActualPrices() {
        const allPrices = await this.page.locator('.price.actual-price')
        return await allPrices.allInnerTexts();
    }

    async filtersByPrice(filterRange) {
        const list = this.page.locator('ul.price-range-selector')
            //.filter({ hasText: 'Under 25.00' });
            .getByRole('link', {name : filterRange})
        return list;

    }

}