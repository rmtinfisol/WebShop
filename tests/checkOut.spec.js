import { test, expect } from '../fixtures/clearShoppingCart'
import { TopLevelLinks } from '../Pages/toplevellinks';
import { ShoppingCartPage } from '../Pages/shoppingcartpage';
import { CategoriesLeftMenu } from '../Pages/categoriesleftmenu';
import { ProductDetailsPage } from '../pages/productdetailspage'
import { ProductLists } from '../Pages/productlists';

test('Checkout with Cash on Delivery', async ({ emptyShoppingCart, page }) => {

    //const topLevelLinks = new TopLevelLinks(page)
    const categoriesleftmenu = new CategoriesLeftMenu(page)
    const productdetailspage = new ProductDetailsPage(page)
    const productlists = new ProductLists(page)

    await productdetailspage.addItemsToCart(categoriesleftmenu, productlists, categoriesleftmenu.AvailableCategories.BOOKS, 'Fiction', 5) 



 })