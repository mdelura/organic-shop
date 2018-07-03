import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../model/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: { key: string, value: Product }[];
  filteredProducts: { key: string, value: Product }[];
  subscription: Subscription;

  displayedColumns = [ 'title', 'price', 'edit' ];


  constructor(productService: ProductService) {
    this.subscription = productService.getAll()
      .map(actions => {
        return actions.map(action => ({ key: action.key, value: action.payload.val() as Product }));
        })
        .subscribe(products => this.filteredProducts = this.products = products);
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(filter: string) {
    filter = filter.toLowerCase();
    this.filteredProducts = (filter)
      ? this.products.filter(p => p.value.title.toLowerCase().includes(filter))
      : this.filteredProducts = this.products;
  }

}
