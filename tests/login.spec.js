import {test,expect} from "@playwright/test";

test("Creating the storage state", async ({page}) =>{

    //Login to Application
    await page.goto('https://demowebshop.tricentis.com/login')
    await page.locator('#Email').fill('qr1w0.hnqmj@example.com')
    await page.locator('#Password').fill('Password123')
    await page.locator('.login-button').click();
    await page.waitForTimeout(5000)
    //Save the storage state

    await page.context().storageState({path:'test_data/authentication.json'})


})