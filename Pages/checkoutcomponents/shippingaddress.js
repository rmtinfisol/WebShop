import { expect } from "@playwright/test";

export class ShippingAddress {
    constructor(page) {
        this.page = page;
        this.root = page.locator('#opc-shipping');
        this.shippingAddressDropDownLabel = page.locator('label[for="shipping-address-select"]');
        this.continueButton = this.root.getByRole('button', { name: 'Continue' });
        this.inStorePickUp = this.root.locator('#PickUpInStore')
    }

    async getDropdownLabelText() {

        return await this.shippingAddressDropDownLabel.textContent();
    }

    async selectInstorePicup() {
        await this.inStorePickUp.click({force: true});
    }
}