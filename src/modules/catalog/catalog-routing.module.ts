import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

import { AddAttributeFamilyComponent } from './add-attribute-family/add-attribute-family.component';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AttributeFamilyComponent } from './attribute-family/attribute-family.component';
import { AttributesComponent } from './attributes/attributes.component';
import { CatalogModule } from './catalog.module';
import { CategoriesComponent } from './categories/categories.component';
import { EditAttributeFamilyComponent } from './edit-attribute-family/edit-attribute-family.component';
import { EditAttributeComponent } from './edit-attribute/edit-attribute.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    canActivate: [],
    component: ProductsComponent,
    data: {
      title: 'Products',
      activeTopNav: 'Menu Items'
    } as SBRouteData,
  },
  {
    path: 'addproduct',
    canActivate: [],
    component: AddProductComponent,
    data: {
      title: 'Add Product',
      activeTopNav: 'Menu Items'
    } as SBRouteData,
  },
  {
    path: 'editproduct/:id',
    canActivate: [],
    component: EditProductComponent,
    data: {
      title: 'Edit Product',
      activeTopNav: 'Menu Items'
    } as SBRouteData,
  },
  {
    path: 'categories',
    canActivate: [],
    component: CategoriesComponent,
    data: {
      title: 'Categories',
      activeTopNav: 'Menu Categories'
    } as SBRouteData,
  },
  {
    path: 'addcategory',
    canActivate: [],
    component: AddCategoryComponent,
    data: {
      title: 'Add Category',
      activeTopNav: 'Menu Categories'
    } as SBRouteData,
  },
  {
    path: 'editcategory/:id',
    canActivate: [],
    component: EditCategoryComponent,
    data: {
      title: 'Edit Category',
      activeTopNav: 'Menu Categories'
    } as SBRouteData,
  },
  {
    path: 'attributes',
    canActivate: [],
    component: AttributesComponent,
    data: {
      title: 'Attributes',
      activeTopNav: 'Attributes'
    } as SBRouteData,
  },
  {
    path: 'addattribute',
    canActivate: [],
    component: AddAttributeComponent,
    data: {
      title: 'Add Attribute',
      activeTopNav: 'Attributes'
    } as SBRouteData,
  },
  {
    path: 'editattribute/:id',
    canActivate: [],
    component: EditAttributeComponent,
    data: {
      title: 'Edit Attribute',
      activeTopNav: 'Attributes'
    } as SBRouteData,
  },
  {
    path: 'attributeFamily',
    canActivate: [],
    component: AttributeFamilyComponent,
    data: {
      title: 'Attribute Family',
      activeTopNav: 'Attribute Family'
    } as SBRouteData,
  },
  {
    path: 'addAttributeFamily',
    canActivate: [],
    component: AddAttributeFamilyComponent,
    data: {
      title: 'Add Attribute Family',
      activeTopNav: 'Attribute Family'
    } as SBRouteData,
  },
  {
    path: 'editfamily/:id',
    canActivate: [],
    component: EditAttributeFamilyComponent,
    data: {
      title: 'Edit Attribute Family',
      activeTopNav: 'Attribute Family'
    } as SBRouteData,
  },
];

@NgModule({
  imports: [CatalogModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
