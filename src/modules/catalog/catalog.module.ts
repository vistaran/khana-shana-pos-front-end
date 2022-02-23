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
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AttributesComponent } from './attributes/attributes.component';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { EditAttributeComponent } from './edit-attribute/edit-attribute.component';
import { AttributeFamilyComponent } from './attribute-family/attribute-family.component';
import { AddAttributeFamilyComponent } from './add-attribute-family/add-attribute-family.component';
import { EditAttributeFamilyComponent } from './edit-attribute-family/edit-attribute-family.component';



@NgModule({
  declarations: [ProductsComponent, CategoriesComponent, AddProductComponent, EditProductComponent, AddCategoryComponent, EditCategoryComponent, AttributesComponent, AddAttributeComponent, EditAttributeComponent, AttributeFamilyComponent, AddAttributeFamilyComponent, EditAttributeFamilyComponent],
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
