import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '../../node_modules/angularfire2/database';
import { KeyedProduct } from './model/product';
import 'rxjs/add/operator/take';
import { ShoppingCart } from './model/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${cartId}`);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);

    return result.key;
  }

  async addToCart(product: KeyedProduct) {
    this.changeProductQuantity(product, 1);
  }

  removeFromCart(product: KeyedProduct) {
    this.changeProductQuantity(product, -1);
  }

  private async changeProductQuantity(product: KeyedProduct, amount: number) {
    const cartId = await this.getOrCreateCartId();
    const item: AngularFireObject<{}> = this.getItem(cartId, product.key);

    const itemSnap$ = item.snapshotChanges();
    itemSnap$.take(1).subscribe((data: any) => {
      const prod = { key: data.payload.key, ...data.payload.val() };
      item.update({ product: product, quantity: (prod.quantity || 0) + amount });
      });
  }
}
