import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AddAttributeFamilyComponent } from './add-attribute-family/add-attribute-family.component';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AttributeFamilyComponent } from './attribute-family/attribute-family.component';
import { AttributesComponent } from './attributes/attributes.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditAttributeFamilyComponent } from './edit-attribute-family/edit-attribute-family.component';
import { EditAttributeComponent } from './edit-attribute/edit-attribute.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';
import { SearchPipe } from './search.pipe';


// import { CatalogRoutingModule } from './catalog-routing.module';



@NgModule({
  declarations: [ProductsComponent,
    CategoriesComponent,
    AddProductComponent,
    EditProductComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AttributesComponent,
    AddAttributeComponent,
    EditAttributeComponent,
    AttributeFamilyComponent,
    AddAttributeFamilyComponent,
    EditAttributeFamilyComponent,
    SearchPipe],

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
