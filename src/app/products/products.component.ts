import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    productService: ProductService) {

      productService
        .getAllKeyedProducts()
        .switchMap(products => {
          this.products = products;
          return route.queryParamMap;
        })
        .subscribe(params => {
          const category =  params.get('category');
            this.filteredProducts = (category) && (this.products)
              ? this.products.filter(p => p.category === params.get('category'))
              : this.products;
        });
   }

  ngOnInit() {
  }

}
