import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { KeyedProduct } from '../../model/product';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  dataSource: MatTableDataSource<KeyedProduct>;

  displayedColumns = [ 'title', 'price', 'edit' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(productService: ProductService) {
    this.subscription = productService.getAllKeyedProducts()
      .subscribe(products => this.initializeDataSource(products));
   }

   initializeDataSource(products: KeyedProduct[]) {
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.filterPredicate =
    (data: KeyedProduct, filter: string) => data.title.toLowerCase().includes(filter.trim().toLowerCase());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
