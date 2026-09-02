import { test, expect } from '@playwright/test';
import { UserRegistration } from '../Pages/userRegistration';
import { Addresses } from '../Pages/addresses';
import { AccountInfo } from '../Pages/accountInfo';
import { Login } from '../Pages/login';
import { TopLevelLinks } from '../Pages/toplevellinks';
//import { describe } from 'node:test';


test.describe('Address page tests', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('Login and Add an address to a newly created user', async ({ page }) => {

        const addresses = new Addresses(page);
        const accountInfo = new AccountInfo(page);
        const topLevelLinks = new TopLevelLinks(page);
        const userRegistration = new UserRegistration(page);

        // Navigate to the homepage and click on the register link
        await page.goto('https://demowebshop.tricentis.com/');
        topLevelLinks.clickRegisterLink();

        // Generate random user data and register a new user

        const newUser = await userRegistration.registerNewUserwithRandomData();

        await userRegistration.clickContinueButton();


        // Verify that the user is logged in by checking the account info

        expect(await topLevelLinks.getUserAccountinfo()).toBe(newUser.email);
        await topLevelLinks.clickUserAccountInfo();

        // Navigate to user Account page and verify that the user is on the account info page

        expect(await page.title()).toBe('Demo Web Shop. Account');
        expect(await page.locator(accountInfo.pageTitle).textContent()).toBe('My account - Customer info');

        // Navigate to the addresses page 

        await page.click(addresses.leftMenuAddressLink);

        // Click on the add new address button and verify that the user is on the add new address page

        await page.locator(addresses.addNewAddressButton).click();

        expect(await page.locator(addresses.myAccountPageHeadingInfo).textContent()).toContain('Add new address');

        // Fill in the address form and submit

        addresses.addressData.firstName = newUser.firstName;
        addresses.addressData.lastName = newUser.lastName;
        addresses.addressData.email = newUser.email;

        await addresses.enterNewOrUpdateExistingAddress(addresses.addressData);


        expect(await page.locator('.page-title > h1').textContent()).toContain('My account - Addresses');

        const firstAddress = await addresses.getFirstAddressAdded(addresses.addressData);
        await expect(firstAddress).toContainText(addresses.addressData.firstName);
        await expect(firstAddress).toContainText(addresses.addressData.lastName);
        await expect(firstAddress).toContainText(addresses.addressData.email);
        await expect(firstAddress).toContainText(addresses.addressData.company);
        await expect(firstAddress).toContainText(addresses.addressData.country);
        await expect(firstAddress).toContainText(addresses.addressData.city);
        await expect(firstAddress).toContainText(addresses.addressData.address1);
        await expect(firstAddress).toContainText(addresses.addressData.zipPostalCode);
        await expect(firstAddress).toContainText(addresses.addressData.phoneNumber);


    });

    test('Login and Edit an existing address', async ({ page }) => {

        const addresses = new Addresses(page);
        const topLevelLinks = new TopLevelLinks(page);
        const userRegistration = new UserRegistration(page);

        await page.goto('https://demowebshop.tricentis.com/');
        topLevelLinks.clickRegisterLink();

         // Generate random user data and register a new user

        await userRegistration.registerNewUserwithRandomData();
        await userRegistration.clickContinueButton();

        //Navigate to user account info page.
        await topLevelLinks.clickUserAccountInfo();

        // Navigate to the addresses page 

        await page.click(addresses.leftMenuAddressLink);

        //add a new address to have an existing address entry to edit

        await page.locator(addresses.addNewAddressButton).click();

        const firstAddressData = await addresses.enterNewOrUpdateExistingAddress(addresses.addressData);

        //logging the first address entry for debugging purposes
        console.log('First address entry:', firstAddressData);

        //Click on the edit button of the first address 

        await page.locator(addresses.addressList).first().locator(addresses.editButton).click();
        expect(await page.locator('.page-title > h1').textContent()).toContain('Edit address');

        //Edit the address details and save

        const updatedAddressData = {
               firstName: addresses.addressData.firstName + 'Updated',
               lastName: addresses.addressData.lastName + 'Updated',
               email: 'updated.' + addresses.addressData.email,
               company: addresses.addressData.company + 'Updated',
               country: 'United States',
               city: addresses.addressData.city + 'Updated',
               address1: addresses.addressData.address1 + 'Updated',
               zipPostalCode: '5678',
               phoneNumber: '99 88 77 66 55 44'
        };

        
        await addresses.enterNewOrUpdateExistingAddress(updatedAddressData);
        //Verify that the address entry is updated with the new details

        const updatedFirstAddress = await addresses.getFirstAddressAdded(updatedAddressData);
        await expect(updatedFirstAddress).toContainText(updatedAddressData.firstName);
        await expect(updatedFirstAddress).toContainText(updatedAddressData.lastName);
        await expect(updatedFirstAddress).toContainText(updatedAddressData.email);
        await expect(updatedFirstAddress).toContainText(updatedAddressData.company);
        await expect(updatedFirstAddress).toContainText(updatedAddressData.country);
        await expect(updatedFirstAddress).toContainText(updatedAddressData.city);
        await expect(updatedFirstAddress).toContainText(updatedAddressData.address1);
        await expect(updatedFirstAddress).toContainText(updatedAddressData.zipPostalCode);
        await expect(updatedFirstAddress).toContainText(updatedAddressData.phoneNumber);

    })

});