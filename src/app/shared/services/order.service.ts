import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { KeyedOrder, Order } from 'shared/models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(): Observable<KeyedOrder[]> {
    return this.db.list('/orders')
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const order = action.payload.val() as Order;
          return new KeyedOrder(action.key, order);
        });
      });
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', i => i.orderByChild('userId').equalTo(userId));
  }
}
