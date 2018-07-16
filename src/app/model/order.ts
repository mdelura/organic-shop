import { ShoppingCartItem } from './shopping-cart-item';
import { OrderItem } from './order-item';

export class Order {
    datePlaced: number;
    items: OrderItem[];

    constructor(public userId: string, public shipping: any, items: ShoppingCartItem[] | OrderItem[]) {
        this.datePlaced = new Date().getTime();
        const cartItems = items as ShoppingCartItem[];

        if (cartItems) {
            this.items = cartItems.map(i => {
                return {
                  product: {
                    title: i.title,
                    imageUrl: i.imageUrl,
                    price: i.price
                  },
                  quantity: i.quantity,
                  totalPrice: i.totalPrice
                };
            });
        } else {
            this.items = items as OrderItem[];
        }
    }
}

export class KeyedOrder extends Order {
    constructor(public key: string, order: Order) {
        super(order.userId, order.shipping, order.items);
    }
}
