import {test,expect} from '@playwright/test';

test.describe('User Registration', () => {

  test('should register a new user successfully', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await page.click("a.ico-register");

    await page.check('#gender-male');
    await page.fill('#FirstName', 'John');
    await page.fill('#LastName', 'Doe');
    await page.fill('#Email', 'john.doe1e@example.com');
    await page.fill('#Password', 'Password123');
    await page.fill('#ConfirmPassword', 'Password123');
    await page.click('input#register-button');

    const pageTitle = await page.title();
    expect(pageTitle).toBe('Demo Web Shop. Register');

    const successMessage = await page.locator('.result').textContent();
    expect(successMessage).toContain('Your registration completed');

    await page.click('input[value="Continue"]');

  });

  test.only('Login and Add an address to a newly created user', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await page.click("a.ico-login");
    await page.fill('#Email', 'john.doe1e@example.com');
    await page.fill('#Password', 'Password123');
    await page.click('input.login-button');

    expect(page.locator('.header-links a.account')).toHaveText('john.doe1e@example.com');
    await page.click('.header-links a.account');

    expect( await page.title()).toBe('Demo Web Shop. Account');
    expect(await page.locator('.page-title')).toHaveText('My account - Customer info');

    await page.click("li a[href='/customer/addresses'][class='inactive']");

    await page.getByRole('button', { name: 'Add new' }).click();

    expect(await page.locator('.page-title > h1').textContent()).toContain('Add new address');    

    await page.fill('#Address_FirstName', 'John');
    await page.fill('#Address_LastName', 'Doe');
    await page.fill('#Address_Email', 'john.doe1e@example.com');
    await page.fill('#Address_Company', 'Example Inc.');
    await page.selectOption('select#Address_CountryId', 'Austria');
    await page.locator('#Address_City').fill('Vienna');
    await page.locator('#Address_Address1').fill('Vienna Street 1');
    await page.locator("input[name='Address.ZipPostalCode']").fill('1234');
    await page.locator('#Address_PhoneNumber').fill('00 11 22 33 44 55');
    await page.getByRole('button', { name: 'Save' }).click();

   
    expect(await page.locator('.page-title > h1').textContent()).toContain('My account - Addresses');    


  });

});

