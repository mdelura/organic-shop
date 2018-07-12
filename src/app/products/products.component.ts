import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from '../../../node_modules/rxjs';
import { ShoppingCart } from '../model/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
      productService
        .getAllKeyedProducts()
        .switchMap(products => {
          this.products = products;
          return route.queryParamMap;
        })
        .subscribe(params => {
          const category =  params.get('category');
            this.filteredProducts = category
              ? this.products.filter(p => p.category === params.get('category'))
              : this.products;
        });
   }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
