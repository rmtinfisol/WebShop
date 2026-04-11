import {test,expect} from '@playwright/test';
import { UserRegistration } from '../Pages/userRegistration';
import { Addresses } from '../Pages/addresses'; 
import { AccountInfo } from '../Pages/accountInfo';
import { Login } from '../Pages/login';
import { TopLevelLinks } from '../Pages/toplevellinks';


test.describe('User Registration', () => {

  test('should register a new user successfully', async ({ page }) => {

    const topLevelLinks = new TopLevelLinks(page);

    const userRegistration = new UserRegistration(page);

    await page.goto('https://demowebshop.tricentis.com/');

    await topLevelLinks.clickRegisterLink();

    // Verify that we are on the registration page
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Demo Web Shop. Register');

    // Register a new user with random data    
    const newUser = await userRegistration.registerNewUserwithRandomData();
    
    // Log the registered user details for debugging purposes
    console.log('Registered user details:', newUser);

// Verify that the registration was successful by checking for the success message
    const successMessage = await page.locator(userRegistration.registrationSuccessMessage).textContent();
    expect(successMessage).toContain('Your registration completed');

    await page.click('input[value="Continue"]');

  });

});

