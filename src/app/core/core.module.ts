import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from 'app/core/components/toolbar/toolbar.component';
import { HomeComponent } from 'app/core/components/home/home.component';
import { LoginComponent } from 'app/core/components/login/login.component';
import { ShoppingModule } from 'app/shopping/shopping.module';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '../../../node_modules/@angular/router';

@NgModule({
  imports: [
    SharedModule,
    ShoppingModule,
    RouterModule.forChild([])
  ],
  declarations: [
    ToolbarComponent,
    HomeComponent,
    LoginComponent
  ],
  exports: [
    ToolbarComponent
  ]
})
export class CoreModule { }
