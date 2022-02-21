import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AppCommonModule } from '@common/app-common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//import { CatalogRoutingModule } from './catalog-routing.module';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';



@NgModule({
  declarations: [ProductsComponent, CategoriesComponent, AddProductComponent, EditProductComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule,
    AppCommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CatalogModule { }
