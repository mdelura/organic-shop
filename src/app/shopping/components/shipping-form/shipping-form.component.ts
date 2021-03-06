import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Shipping } from '../../models/shipping';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {} as Shipping;
  userId: string;
  cart: ShoppingCart;
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService,
    private router: Router) { }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.subscriptions.push(cart$.subscribe(cart => this.cart = cart));
    this.subscriptions.push(this.authService.user$.subscribe(user => this.userId = user.uid));
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  async placeOrder() {
    const result = await this.orderService.placeOrder(new Order(this.userId, this.shipping, this.cart.items));
    this.router.navigate(['/order-success', result.key]);
  }
}
