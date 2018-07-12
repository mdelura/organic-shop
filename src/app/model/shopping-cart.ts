import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    constructor(public items: any) {
    }

    get cartItems(): ShoppingCartItem[] {
        const items: ShoppingCartItem[] = [];
        for (const key of Object.keys(this.items)) {
            items.push(this.items[key]);
        }

        return items;
    }

    public get totalItemsCount(): number {
        let itemsCount = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.items) {
           itemsCount += this.items[productId].quantity;
        }

        return itemsCount;
    }
}
