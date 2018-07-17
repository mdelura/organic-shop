import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';
import { MatComponentsModule } from 'shared/mat-components.module';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng4-validators';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    MatComponentsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    ProductCardComponent,
    ProductQuantityComponent,
    MatComponentsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
