import {test, expect} from "@playwright/test";

export class ConfirmOrder {
    constructor (page){
        this.page = page;
        this.root = page.locator('#opc-confirm_order');
        this.confirmOrderDetails = page.locator('#checkout-confirm-order-load');
        this.confirmOrderButton = this.root.getByRole('button', { name: 'Confirm' });
    }

        async screenTitle(){
        let screenTitle = await this.page.getByRole('heading', { name: 'Confirm Order', level: 2 }).textContent()
        screenTitle = screenTitle.toLowerCase();
        return screenTitle
    }
}