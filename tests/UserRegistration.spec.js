import {test,expect} from '@playwright/test';
import { UserRegistration } from '../Pages/userRegistration';
import { Addresses } from '../Pages/addresses'; 
import { AccountInfo } from '../Pages/accountInfo';
import { Login } from '../Pages/login';


test.describe('User Registration', () => {

  test('should register a new user successfully', async ({ page }) => {

    const userRegistration = new UserRegistration(page);

    await page.goto('https://demowebshop.tricentis.com/');

    await page.locator(userRegistration. registerlink).click();

    const pageTitle = await page.title();
    expect(pageTitle).toBe('Demo Web Shop. Register');
    
    await userRegistration.registerNewUser('John', 'Doe', 'john.doe1e@example.com', 'Password123');


    const successMessage = await page.locator('.result').textContent();
    expect(successMessage).toContain('Your registration completed');

    await page.click('input[value="Continue"]');

  });

  test.only('Login and Add an address to a newly created user', async ({ page }) => {

    const addresses = new Addresses(page);
    const accountInfo = new AccountInfo(page);
    const login = new Login(page);
    
    await page.goto('https://demowebshop.tricentis.com/');

    await login.loginUser('john.doe1e@example.com', 'Password123');

   
    expect(page.locator(addresses.useAccountinfo)).toHaveText('john.doe1e@example.com');
    await page.click(addresses.useAccountinfo);

    expect( await page.title()).toBe('Demo Web Shop. Account');
    expect(await page.locator(accountInfo.pageTitle)).toHaveText('My account - Customer info');

    await page.click(addresses.leftMenuAddressLink);

    await page.getByRole('button', { name: 'Add new' }).click();

    expect(await page.locator(addresses.myAccountPageHeadingInfo).textContent()).toContain('Add new address');    

    await addresses.addNewAddress(addresses.addressData);

   

     
    expect(await page.locator('.page-title > h1').textContent()).toContain('My account - Addresses');    


  });

});

