import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AdminModule } from 'app/admin/admin.module';
import { DialogComponent } from 'app/dialog/dialog.component';
import { ShoppingModule } from 'app/shopping/shopping.module';
import { SharedModule } from 'shared/shared.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ProductsComponent } from './shopping/components/products/products.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AdminModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    ShoppingModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
