import { expect } from "@playwright/test";

export class PaymentMethod {
    constructor(page){
        this.page = page;
        this.root = page.locator('#opc-payment_method');
        this.continueButton = page.getByRole('button', { name: 'Continue' })
    }

    async selectPaymentMethod(paymentMethod){
        await this.page.getByRole("radio", {name : paymentMethod , exact: false}).check();
    }

    async screenTitle(){
        let screenTitle = await this.page.getByRole('heading', { name: 'Payment method', level: 2 }).textContent()
        screenTitle = screenTitle.toLowerCase();
        return screenTitle
    }

    
}