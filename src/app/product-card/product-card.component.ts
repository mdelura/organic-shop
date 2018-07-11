import { Component, OnInit, Input } from '@angular/core';
import { Product, KeyedProduct } from '../model/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: KeyedProduct;
  @Input('showActions') showActions = true;
  @Input('shoppingCart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) {
      return 0;
    }

    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
