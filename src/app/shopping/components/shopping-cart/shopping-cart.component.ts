import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'app/dialog/dialog.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  displayedColumns = [ 'thumbnail', 'title', 'quantity', 'price' ];

  @Input('header') header = 'Shopping Cart';
  @Input('showActions') showActions = true;

  constructor(public dialog: MatDialog, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart() {
    this.dialog.open(DialogComponent, {
      data: { prompt: 'Are you sure you want clear the shopping cart?' }
    })
      .afterClosed()
      .subscribe(result => {
        if (result === 'yes') {
          this.shoppingCartService.clearCart();
        }
    });
  }
}
