import { CategoriesLeftMenu } from "./categoriesleftmenu";
import { TopLevelLinks } from "./toplevellinks";

export class CommonLinks {
    constructor (page) {
        this.categoriesLeftMenu = new CategoriesLeftMenu(page);
        this.topLevelLinks = new TopLevelLinks(page);
    }
}