import { Component, OnInit, Input } from '@angular/core';
import { KeyedProduct } from '../model/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../model/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: KeyedProduct;
  @Input('showActions') showActions = true;
  @Input('shoppingCart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
