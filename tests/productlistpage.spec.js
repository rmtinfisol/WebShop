import { test, expect } from '../fixtures/clearShoppingCart';
import { CategoriesLeftMenu } from '../Pages/categoriesleftmenu';
import { ProductLists } from '../Pages/productlists';

test("Verify Product Page Layout changes on View As filter selection", async ({ page, emptyShoppingCart }) => {

    const categoriesleftmenu = new CategoriesLeftMenu(page)
    const productlists = new ProductLists(page)

    //await categoriesleftmenu.selectCategory(categoriesleftmenu.AvailableCategories.BOOKS)

    //await categoriesleftmenu.selectCategory(categoriesleftmenu.AvailableCategories.COMPUTERS);
    //await categoriesleftmenu.selectCategory(categoriesleftmenu.AvailableCategories.DESKTOPS);

    const booksListItem = page.locator('.block-category-navigation ul li')
        .filter({ has: page.getByRole('link', { name: 'Books' }) });

    await booksListItem.getByRole('link', { name: 'Books' }).click();

    //Select View as List

    await page.locator('#products-viewmode').selectOption({ label: 'List' });

    await page.waitForLoadState('networkidle');

    let listContainer = page.locator('.product-list');

    await expect(listContainer).toBeVisible();

    let gridContainer = page.locator('.product-grid');

    await expect(gridContainer).not.toBeVisible();

    // Change View as to Grid

    await page.locator('#products-viewmode').selectOption({ label: 'Grid' });
    await page.waitForLoadState('networkidle')

    gridContainer = page.locator('.product-grid');

    await expect(gridContainer).toBeVisible();

    listContainer = page.locator('.product-list');

    await expect(listContainer).not.toBeVisible();
    // const gridLayOut = page.locator('.page-body')
    //     .filter({ has: (page.locator('.product-grid')) })

    // console.log(await gridLayOut.count())

})

test("Display Size per page and Product Grid is dispayed correct number of items", async ({ page, emptyShoppingCart }) => {

    const categoriesleftmenu = new CategoriesLeftMenu(page)
    const productlists = new ProductLists(page)

    await categoriesleftmenu.selectCategory(categoriesleftmenu.AvailableCategories.BOOKS)

    await page.locator('#products-pagesize').selectOption({ label: '4' });
    await page.waitForLoadState('networkidle');

    let hasNextPage = true;
    let productListItemsCount = 0

    const productListItems = await productlists.productListTitles()

    do {
        const nextPage = page.getByRole('link', { name: 'Next' })
        productListItemsCount += await productListItems.count()
        if (await nextPage.count() > 0) {
            hasNextPage = true;
            await expect(nextPage).toBeVisible();
            const productListFirstItem = await productListItems.first().innerText()
            await nextPage.click()
            const productListItemsNextPage = await productlists.productListTitles()

            expect(productListFirstItem).not.toBe(await productListItemsNextPage.first().innerText())

        }
        else {
            hasNextPage = false;
            console.log(hasNextPage)
            break;
        }

    } while (hasNextPage = true);

    console.log("Product List Items Count" + productListItemsCount)

    const isNextButtonExist = await productlists.pagerNextbuttonexist()

    if (isNextButtonExist)
        console.log('Not in the final page')
    else {
        console.log('Final product list page')
    }
})

test("Verify Books list page has three price filters and selecting Under 25 displaying books with actual price under 25 ", async ({ page, emptyShoppingCart }) => {

    // Filters [0] - under Filters [1] price range  Filters [2] - Over
    const categoriesleftmenu = new CategoriesLeftMenu(page)
    const productlists = new ProductLists(page)

    await categoriesleftmenu.selectCategory(categoriesleftmenu.AvailableCategories.BOOKS)

    const filters = await productlists.priceFilters();
    //const priceFilters = await filtersByPrice.all()
    //console.log(await priceFilters.innerText())

    const total = filters.length
    //const texts = await filtersByPrice.allInnerTexts()

    expect(total).toBe(3);

    console.log(filters[1]);

    const selectedFilter = await productlists.filtersByPrice(filters[1])

    console.log(await selectedFilter.innerText());
    await selectedFilter.click();

    const selectedPriceRange = await page.locator('.selected-price-range').innerText();
    expect(selectedPriceRange).toBe(filters[1]);

    const {min, max} = await productlists.priceRangeInFilters(filters[1])

    const actualPricesInPage = await productlists.getAllActualPrices();

    actualPricesInPage.forEach(price => {
        const numPrice = parseFloat(price.replace('$', '').trim());
        expect(numPrice).toBeLessThan(max)
        expect(numPrice).toBeGreaterThan(min)
    })

    page.pause()

     
})