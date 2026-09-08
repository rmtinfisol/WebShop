
import { expect } from '@playwright/test';
import { BillingAddress } from './billingaddress';
import { ConfirmOrder } from './confirmorder';
import { PaymentInformation } from './paymentInformation';
import { PaymentMethod } from './paymentmethod';
import { ShippingAddress } from './shippingaddress';
import { ShippingMethod } from './shippingmethod';
import { OrderSuccessPage } from './ordersuccesspage';

export class CheckOutPage {

    constructor(page) {

        this.page = page;
        this.billingAddress = new BillingAddress(this.page);
        this.shippingAddress = new ShippingAddress(this.page);
        this.shippingMethod = new ShippingMethod(this.page);
        this.paymentMethod = new PaymentMethod(this.page);
        this.paymentInformation = new PaymentInformation(this.page);
        this.confirmOrder = new ConfirmOrder(this.page);
        this.orderSuccesspage = new OrderSuccessPage(this.page);
    }

    async performCheckOut(addressIndex, inStorePickUp, paymentMethod) {
        //this.billingAddress.selectAddressByIndex(addressIndex);

        await this.page.getByRole('combobox').selectOption({ index: addressIndex })

        await this.page.getByRole('button', { name: 'Continue' }).click();

        if (inStorePickUp) {
            await this.page.getByRole('checkbox', { name: 'In-Store Pickup' }).check();
            //await this.shippingAddress.selectInstorePicup()
        }
        else {
            await this.page.getByRole('combobox').selectOption({ index: addressIndex })
        }

        await this.page.getByRole('button', { name: 'Continue' }).click();

        switch (paymentMethod) {
            case 'Cash On Delivery':
                await this.page.getByRole('radio', { name: /Cash On Delivery/i }).check();
                await this.page.getByRole('button', { name: 'Continue' }).click();
                await expect(this.paymentInformation.screenTitle).toBeVisible();
                await expect(this.paymentInformation.cashOnDeliveryPaymentInformation).toHaveText(/You will pay by COD/i);
                break;
            case 'Check / Money Order':
                await this.page.getByRole('radio', { name: /Check \/ Money Order/i }).check();
                await this.page.getByRole('button', { name: 'Continue' }).click();
                await expect(this.paymentInformation.screenTitle).toBeVisible();
                await expect(this.paymentInformation.checkMailOrderPaymentInformation).toBeVisible();
                break;
            case 'Credit Card':
                await this.page.getByRole('radio', { name: /Credit Card/i }).check();
                await this.page.getByRole('button', { name: 'Continue' }).click();
                await expect(this.paymentInformation.screenTitle).toBeVisible();
                await expect(this.paymentInformation.creditCardType).toBeVisible();
                await this.paymentInformation.paymentviaCreditCard()

                break;
            case 'Purchase Order':
                await this.page.getByRole('radio', { name: /Purchase Order/i }).check();
                await this.page.getByRole('button', { name: 'Continue' }).click();
                await expect(this.paymentInformation.screenTitle).toBeVisible();
                await expect(this.paymentInformation.purchaseOrder).toBeVisible();
                break;

            default:
                console.log("Invalid Payment Method!")
                break;
        }
        if (paymentMethod === 'Credit Card') {
            await expect(await this.confirmOrder.screenTitle()).toBe("confirm order");

        } else {
            await this.page.getByRole('button', { name: 'Continue' }).click();
        }

        await this.confirmOrder.confirmOrderButton.click();

        await this.orderSuccesspage.validateAndExtractOrderNumber();
    }

}