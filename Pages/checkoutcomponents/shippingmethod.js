import { expect } from "@playwright/test";

export class ShippingMethod {
    constructor(page){
        this.page = page;
        this.root = page.locator('#opc-shipping_method');
        this.continueButton = page.getByRole('button', { name: 'Continue' })
        this.shippingMethodDescriptionMaster = {
            'Ground': 'Compared to other shipping methods, like by flight or over seas, ground shipping is carried out closer to the earth',
            'Next Day Air': 'The one day air shipping',
            '2nd Day Air': 'The two day air shipping'
        }
    }

    async selectShippingMethod(shippingType){
        await this.page.getByRole("radio", {name : shippingType , exact: false}).check();
    }

    async screenTitle(){
        let screenTitle = await this.page.getByRole('heading', { name: 'Shipping method', level: 2 }).textContent()
        screenTitle = screenTitle.toLowerCase();
        return screenTitle
    }

    //Acceptable shippingMethod values are Ground, Next Day Air or 2nd Day Air)
    async ShippingMethodDescription(shippingMethod){
        const description = this.shippingMethodDescriptionMaster[shippingMethod]
        const shippingMethodLabel = await this.root.getByText(description);
        return await shippingMethodLabel.innerText();
        

    }

    
}