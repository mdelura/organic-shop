import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '../../node_modules/angularfire2/database';
import { KeyedProduct } from './model/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from './model/shopping-cart';
import { Observable } from '../../node_modules/rxjs';
import { ShoppingCartItem } from './model/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addToCart(product: KeyedProduct) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: KeyedProduct) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object(`/shopping-carts/${cartId}/items`).remove();
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${cartId}`)
      .valueChanges()
      .map(sc => new ShoppingCart(sc['items']));
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
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

  private async updateItem(product: KeyedProduct, amount: number) {
    const cartId = await this.getOrCreateCartId();
    const item: AngularFireObject<{}> = this.getItem(cartId, product.key);

    const itemSnap$ = item.snapshotChanges();
    itemSnap$.take(1).subscribe((data: any) => {
      const cartItem = { key: data.payload.key, ...data.payload.val() };
      const quantity = (cartItem.quantity || 0) + amount;

      if (quantity === 0) {
        item.remove();
      } else {
        item.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }
    });
  }
}
