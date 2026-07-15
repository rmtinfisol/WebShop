import { expect } from "@playwright/test";

export class ShippingAddress {
    constructor(page){
        this.page = page;
        this.root = page.locator('#opc-shipping');
        this.shippingAddressDropDownLabel = page.locator('label[for="shipping-address-select"]').textContent();
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.confirmOrderButton = page.getByRole('button', { name: 'Confirm' });
    }

}