import { test, expect } from '@playwright/test';
import { UserRegistration } from '../Pages/userRegistration';
import { Addresses } from '../Pages/addresses';
import { AccountInfo } from '../Pages/accountInfo';
import { Login } from '../Pages/login';
import { TopLevelLinks } from '../Pages/toplevellinks';
//import { describe } from 'node:test';


test.describe('Address page tests', () => {

    test('Login and Add an address to a newly created user', async ({ page }) => {

        const addresses = new Addresses(page);
        const accountInfo = new AccountInfo(page);
        const login = new Login(page);
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

        await addresses.addNewAddress(addresses.addressData);

        expect(await page.locator('.page-title > h1').textContent()).toContain('My account - Addresses');


    });

});