import { ShoppingCartItem } from './shopping-cart-item';

export class OrderItem {
    product: {
        title: string;
        imageUrl: string;
        price: number;
    };
    quantity: number;
    totalPrice: number;

    constructor(shoppingCartItem: ShoppingCartItem) {
        this.product  = {
            title: shoppingCartItem.title,
            imageUrl: shoppingCartItem.imageUrl,
            price: shoppingCartItem.price
        };
        this.quantity = shoppingCartItem.quantity;
        this.totalPrice = shoppingCartItem.totalPrice;
    }
}
