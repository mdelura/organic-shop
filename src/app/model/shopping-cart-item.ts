import { KeyedProduct } from './product';

export interface ShoppingCartItem {
    product: KeyedProduct;
    quantity: number;
}
