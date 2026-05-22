import { CategoriesLeftMenu } from '../Pages/categoriesleftmenu';
import { expect } from '@playwright/test';
import { ProductLists } from '../Pages/productlists';

export class ProductDetailsPage {
    constructor(page) {

        //practising selectors with xpath
        this.page = page;
        this.productName = '.product-name'
        this.stockAvailabilityStatus = '//div[@class="stock"]//span[@class="value"]'
        this.qtyInput = '//input[contains(@id, "EnteredQuantity")]'
        this.addtoCartButton = '//div[@class="add-to-cart-panel"]//input[@value="Add to cart"]'
        this.productOverview = '.overview'


    }

    categoriesLeftMenu = new CategoriesLeftMenu(this.page)
    productLists = new ProductLists(this.page)

    async addItemsToCart(categoriesLeftMenu, productLists, productCategory, itemtobuy, qty) {

        //Clicking on product category
        await categoriesLeftMenu.selectCategory(productCategory);

        //Add to cart by clicking Add to Cart Button on Product List page
        //let addtoCartButton = await productLists.getAddToCartButtonForAnItem(itemtobuy)
        //await addtoCartButton.click()

        //Filter by price

        let filters = await productLists.filtersByPrice('under 25.00')
        await filters.click();
        await this.page.getByRole('link', { name: "Remove Filter" }).click();

        //const itemOptions = filters.locator('li')
        //const totalOptions = await itemOptions.count();




        //Select the product you want to buy and navigate to Prduct details page.

        let selectedProduct;
        selectedProduct = await productLists.selectProductContainer(itemtobuy)

        let actualPrice = await productLists.getActualPrice(itemtobuy)

        let allActualPrices = await productLists.getAllActualPrices()

        await selectedProduct.getByRole('link', { name: itemtobuy, exact: true }).click();


        //await selectedProduct.getByText(itemtobuy, { exact:true }).click()


        //await this.page.getByText(itemtobuy, { exact: true }).click()

        //await expect(this.page.getByText(itemtobuy)).toBeVisible();

        //await expect(this.page.getByRole('heading', {itemprop : 'name'})).toHaveText(itemtobuy);
        await expect(
            this.page.getByRole('heading', { name: itemtobuy })
        ).toContainText(itemtobuy);
        
        await this.page.getByLabel('Qty:').fill(qty.toString())

        await this.page.locator(this.productOverview)
            .getByRole('button', { name: /Add to Cart/i }).click()

    }

}