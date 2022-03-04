import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    } as SBRouteData,
  },
  {
    path: 'addproduct',
    canActivate: [],
    component: AddProductComponent,
    data: {
        title: 'Add Product',
    } as SBRouteData,
  },
  {
    path: 'editproduct',
    canActivate: [],
    component: EditProductComponent,
    data: {
        title: 'Add Product',
    } as SBRouteData,
  },
  {
    path: 'categories',
    canActivate: [],
    component: CategoriesComponent,
    data: {
        title: 'Categories',
    } as SBRouteData,
  },
  {
    path: 'addcategory',
    canActivate: [],
    component: AddCategoryComponent,
    data: {
        title: 'Add Category',
    } as SBRouteData,
  },
  {
    path: 'editcategory/:id',
    canActivate: [],
    component: EditCategoryComponent,
    data: {
        title: 'Edit Category',
    } as SBRouteData,
  },
  {
    path: 'attributes',
    canActivate: [],
    component: AttributesComponent,
    data: {
        title: 'Attributes',
    } as SBRouteData,
  },
  {
    path: 'addattribute',
    canActivate: [],
    component: AddAttributeComponent,
    data: {
        title: 'Add Attribute',
    } as SBRouteData,
  },
  {
    path: 'editattribute',
    canActivate: [],
    component: EditAttributeComponent,
    data: {
        title: 'Edit Attribute',
    } as SBRouteData,
  },
  {
    path: 'attributeFamily',
    canActivate: [],
    component: AttributeFamilyComponent,
    data: {
        title: 'Attribute Family',
    } as SBRouteData,
  },
  {
    path: 'addAttributeFamily',
    canActivate: [],
    component: AddAttributeFamilyComponent,
    data: {
        title: 'Add Attribute Family',
    } as SBRouteData,
  },
  {
    path: 'editfamily',
    canActivate: [],
    component: EditAttributeFamilyComponent,
    data: {
        title: 'Edit Attribute Family',
    } as SBRouteData,
  },
];

@NgModule({
  imports: [CatalogModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
