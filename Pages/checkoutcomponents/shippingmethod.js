import { expect } from "@playwright/test";

export class ShippingMethod {
    constructor(page){
        this.page = page;
        this.root = page.locator('#opc-shipping_method');
        this.continueButton = page.getByRole('button', { name: 'Continue' })
    }

    async selectShippingMethod(shippingType){
        await this.page.getByRole("radio", {name : shippingType , exact: false}).check();
    }

    async screenTitle(){
        let screenTitle = await this.page.getByRole('heading', { name: 'Shipping method', level: 2 }).textContent()
        screenTitle = screenTitle.toLowerCase();
        return screenTitle
    }

    
}