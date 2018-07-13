import { KeyedProduct } from './product';

export class ShoppingCartItem {
    constructor(public product: KeyedProduct, public quantity: number) {
    }

    get totalPrice(): number { return this.product.price * this.quantity; }
}
