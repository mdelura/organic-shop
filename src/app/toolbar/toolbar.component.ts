import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../model/app-user';
import { CategoryService, Category } from '../category.service';
import { Observable } from '../../../node_modules/rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  appUser: AppUser;
  categories$: Observable<Category[]>;
  activeCategory;

  constructor(private auth: AuthService, categoryService: CategoryService, route: ActivatedRoute) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.categories$ = categoryService.getAll();
    route.queryParamMap.subscribe(p => this.activeCategory = p.get('category'));
  }

  logout() {
    this.auth.logout();
  }
}
