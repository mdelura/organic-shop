import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../model/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  subscription: Subscription;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    const cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      // tslint:disable-next-line:forin
      for (const productId in cart.items) {
         this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
