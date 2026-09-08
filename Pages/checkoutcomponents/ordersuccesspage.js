import {test, expect} from '@playwright/test'

export class OrderSuccessPage {
    constructor(page){
        this.page = page;
        //this.pageTitle = this.page.getByRole('heading', { level: 1 })
        this.pageTitle = this.page.getByRole('heading', { name: /Thank you/i });
        this.successMessage = this.page.getByText(/your order has been successfully processed!/i);
        this.orderNumberElement = this.page.getByText(/order number:/i);
        this.continueButton = this.page.getByRole('button', {name: /continue/i });
    }

    async validateAndExtractOrderNumber () {
        await expect(this.pageTitle).toHaveText(/thank you/i)
        await expect(this.successMessage).toHaveText(/Your order has been successfully processed!/i)
        const orderNumberWithText = await this.orderNumberElement.textContent();
        console.log(orderNumberWithText);

        const match = orderNumberWithText.match(/\d+/);
        const orderNumber = match ? match[0] : null;
        console.log(orderNumber);
        return orderNumber
    }
}