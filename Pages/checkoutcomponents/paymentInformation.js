import { test, expect } from "@playwright/test";

export class PaymentInformation {
    constructor(page) {
        this.page = page;
        this.screenTitle = this.page.getByRole('heading', { name: 'Payment information' });
        this.creditCardType = this.page.locator('#CreditCardType');
        this.cardHolderName = this.page.getByRole('textbox', { name: 'Cardholder name' });
        this.creditCardNumber = this.page.getByRole('textbox', { name: 'Card number' });
        this.expirationMonth = this.page.getByRole('combobox', {name: 'Expiration date'});
        this.expirationYear = this.page.locator('#ExpireYear')
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.cardCode = this.page.getByRole('textbox', { name: 'Card code ' });
        this.backButton = this.page.getByRole('link', { name: 'Back' });

        this.cashOnDeliveryPaymentInformation = this.page.getByText('You will pay by COD')
        this.checkMailOrderPaymentInformation = this.page.getByText('Mail Personal or Business')

        this.purchaseOrder = this.page.getByRole('textbox', { name: 'PO Number' })

    }

    async paymentviaCreditCard() {

        await this.creditCardType.selectOption({label: 'Visa'});
        await this.cardHolderName.fill('Barbara Gordon');
        await this.creditCardNumber.fill('4485564059489345');
        await this.expirationMonth.selectOption({label: '04'});
        await this.expirationYear.selectOption({label: '2028'});
        await this.cardCode.fill('123');

        await this.continueButton.click();

        await expect(this.page.locator('#payment-info-please-wait')).toBeHidden();
        
    }

}