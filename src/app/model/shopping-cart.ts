import { ShoppingCartItem } from './shopping-cart-item';
import { KeyedProduct } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [key: string]: ShoppingCartItem }) {
        for (const key of Object.keys(this.itemsMap)) {
            const item = this.itemsMap[key];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    public get totalItemsCount(): number {
        let itemsCount = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.itemsMap) {
           itemsCount += this.itemsMap[productId].quantity;
        }

        return itemsCount;
    }

    public get totalPrice(): number {
        let total = 0;
        for (const item of this.items) {
            total += item.totalPrice;
        }
        return total;
    }

    getQuantity(product: KeyedProduct) {
        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }
}
