import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemsModule } from './items.module';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'items',
  },
  {
    path: 'items',
    canActivate: [],
    component: ItemsComponent,
    data: {
      title: 'Items',
      activeTopNav: 'Items'
    } as SBRouteData,
  },
  {
    path: 'add_item',
    canActivate: [],
    component: AddItemComponent,
    data: {
      title: 'Add Item',
      activeTopNav: 'Items'
    } as SBRouteData,
  },
  {
    path: 'edit_item/:id',
    canActivate: [],
    component: EditItemComponent,
    data: {
      title: 'Edit Item',
      activeTopNav: 'Items'
    } as SBRouteData,
  },
];

@NgModule({
  imports: [ItemsModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
