import { expect } from '@playwright/test';

export class BillingAddress {

    constructor (page) {
        this.page = page;
        this.root = page.locator('#opc-billing');
        this.addressSelectLabel = this.root.locator('label[for="billing-address-select"]');
        this.addressDropDown = this.root.locator('#billing-address-select');
    }

    async verifyDropDownLabelText(){
        const expectedText = "Select a billing address from your address book or enter a new address."
        await expect(this.addressSelectLabel).toHaveText(expectedText);
        
    }

    async billingAddressSelectOption(addressText){

        await this.addressDropDown.selectOption({ label: addressText });
    }
}