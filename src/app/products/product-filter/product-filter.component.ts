import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Category, CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: Observable<Category[]>;
  activeCategory;

  constructor(categoryService: CategoryService, route: ActivatedRoute) {
    this.categories$ = categoryService.getAll();
    route.queryParamMap.subscribe(p => this.activeCategory = p.get('category'));
   }

  ngOnInit() {
  }
}
