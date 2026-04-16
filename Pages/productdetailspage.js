export class ProductDetailsPage {
    constructor(page) {

        //practising selectors with xpath
        this.page = page;
        this.productName='//div[@class="product-name"]//h1'
        this.stockAvailabilityStatus='//div[@class="stock"]//span[@class="value"]'
        this.qtyInput='//input[@id="addtocart_36_EnteredQuantity"]'
        this.addtoCartButton='//div[@class="add-to-cart-panel"]//input[@value="Add to cart"]'


    }

}