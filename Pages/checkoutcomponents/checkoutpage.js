
import { BillingAddress } from './billingaddress';
import { ConfirmOrder } from './confirmorder';
import { PaymentInformation } from './paymentInformation';
import { PaymentMethod } from './paymentmethod';
import { ShippingAddress } from './shippingaddress';
import { ShippingMethod } from './shippingmethod';

export class CheckOutPage {

    constructor(page) {

        this.page = page;
        this.billingAddress = new BillingAddress(this.page);
        this.shippingAddress = new ShippingAddress(this.page);
        this.shippingMethod = new ShippingMethod(this.page);
        this.paymentMethod = new PaymentMethod(this.page);
        this.paymentInformation = new PaymentInformation(this.page);
        this.confirmOrder = new ConfirmOrder(this.page);
    }

}