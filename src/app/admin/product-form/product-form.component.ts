import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Observable } from 'rxjs';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    public dialog: MatDialog,
    categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.get(this.id).take(1).subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.navigateToAdminProducts();
  }

  delete() {
    this.dialog.open(DialogComponent, {
      data: { prompt: 'Are you sure you want to delete this product?' }
    })
      .afterClosed()
      .subscribe(result => {
        if (result === 'yes') {
          this.productService.delete(this.id);
          this.navigateToAdminProducts();
        }
    });
  }

  private navigateToAdminProducts() {
    this.router.navigate(['/admin/products']);
  }
}
