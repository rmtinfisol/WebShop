
import { test } from "@playwright/test";

export class CheckOut {

    constructor(page) {

        this.page = page;
        this.checkOutPageTitle = '.page-title h1';
        this.addressDropdown = '#billing-address-select';
        this.billingAddressContinueButton = 'input[onclick="Billing.save()"]';
        this.shippingAddressContinueButton = 'input[onclick="Shipping.save()"]';
        //this.shippingGroundRadioButton = '#shippingoption_0'
        //this.shippingGroundRadioButtonLabel = '#shippingoption_0 + label';
        //this.groundShippingDescription = '.method-name:has(#shippingoption_0) + .method-description';
        //this.shippingNextDayAir = '#shippingoption_1';
        //this.shippingNextDayAirRadioButtonLabel = '#shippingoption_1 + label';
        //this.nextDayAirShippingDescription = '.method-name:has(#shippingoption_1) + .method-description';
        //this.shipping2ndDayAir = '#shippingoption_2';
        //this.shipping2ndDayAirRadioButtonLabel = '#shippingoption_2 + label';
        //this.shipping2ndDayAirDescription = '.method-name:has(#shippingoption_2) + .method-description';
        this.shippingMethodContinueButton = '.shipping-method-next-step-button';
        this.paymentMethods = {
            'COD': '0',
            'check': '1',
            'credit': '2',
            'purchaseOrder': '3'
        };

        this.shippingMethodDescriptionMaster = {
            'Ground (10.00)': 'Compared to other shipping methods, like by flight or over seas, ground shipping is carried out closer to the earth',
            'Next Day Air (40.00)': 'The one day air shipping',
            '2nd Day Air (20.00)': 'The two day air shipping'
        }
        this.paymentMethodContinueButton = '.payment-method-next-step-button';
        this.creditCardType = '#CreditCardType';
        this.cardHolderName = '#CardholderName';
        this.cardNumber = '#CardNumber';
        this.expireMonth = '#ExpireMonth';
        this.expireYear = '#ExpireYear';
        this.cardCode = '#CardCode';
        this.paymentInformationContinueButton = '.payment-info-next-step-button';
        this.confirmContinueButton = '.confirm-order-next-step-button';
    }


    async shippingMethod(id) {
        const shippingOption = (`#shippingoption_${id}`)
        const shippingOptionElement = await this.page.locator(shippingOption);
        return shippingOptionElement

    }

    async shippingMethodLabel(id) {
        return this.page.locator(`#shippingoption_${id} + label`)
    }

    //This is done by the description ID proerty of the element
    async shippingMethodDescription(id) {
        const shippingMethodRadioButtonLocator = await this.shippingMethod(id);
        const shippingMethodRadioButtonParent = await shippingMethodRadioButtonLocator.locator('..');

        //const tagName1 = await shippingMethodRadioButtonParent.evaluate(el => el.tagName)
        //console.log(tagName1)

        const shippingMethodDiscription = await shippingMethodRadioButtonParent.locator('//following-sibling::div').textContent();
        return shippingMethodDiscription.trim();
    }
    //Selecting shipping method by radiobutton label

  async getShippingMethodDescription(methodName) {
        const listItems = this.page
            .locator('li')
            .filter({ has: this.page.getByLabel(methodName, { exact: true }) })
            .locator('.method-description');

        const listItemsAray = await listItems.allInnerTexts()

        for (let i = 0; i < listItemsAray.length; i++) {
            const listItem = listItemsAray[i];
            if (listItem == this.shippingMethodDescriptionMaster[methodName]) {
                return listItem
                break;
            }

        }


    }


    async selectShippingMethodByLabel(labelText) {

        return this.page.getByRole('radio', { name: labelText })
        //const listItemwithLabelText = await this.page.locator('li').filter({ hasText: labelText });
        //return await listItemwithLabelText.getByText(labelText);
    }




    //acceptable values for Pyment Method are COD, Check, Credit or Purchase Order
    async paymentMethodElement(paymentMethod) {

        const methodId = this.paymentMethods[paymentMethod]

        if (!methodId) {
            console.log(`Invalid Payment Method ${paymentMethod} No Mapping exist`)
        } 

        const paymentMethodLocator = `#paymentmethod_${methodId}`

        return await this.page.locator(paymentMethodLocator);

    }
}

