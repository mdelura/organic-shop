import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OrderService } from '../../order.service';
import { KeyedOrder } from '../../model/order';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  dataSource: MatTableDataSource<KeyedOrder>;

  displayedColumns = [ 'customer', 'date', 'view' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService) {
  }

  initializeDataSource(orders: KeyedOrder[]) {
    this.dataSource = new MatTableDataSource(orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }
  ngOnInit() {
    this.subscription = this.orderService.getOrders()
    .subscribe(orders => this.initializeDataSource(orders));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
