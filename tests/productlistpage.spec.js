import { test, expect } from '../fixtures/clearShoppingCart';
import { CategoriesLeftMenu } from '../Pages/categoriesleftmenu';
import { ProductLists } from '../Pages/productlists';

test("Product List Page Layout", async ({ page, emptyShoppingCart }) => {

    const categoriesleftmenu = new CategoriesLeftMenu(page)
    const productlists = new ProductLists(page)

    //await categoriesleftmenu.selectCategory(categoriesleftmenu.AvailableCategories.BOOKS)

    //await categoriesleftmenu.selectCategory(categoriesleftmenu.AvailableCategories.COMPUTERS);
    //await categoriesleftmenu.selectCategory(categoriesleftmenu.AvailableCategories.DESKTOPS);

    const booksListItem = page.locator('.block-category-navigation ul li')
        .filter({ has: page.getByRole('link', { name: 'Books' }) });

       await booksListItem.getByRole('link', { name: 'Books' }).click();


})