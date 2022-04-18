import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

import { AddItemGroupComponent } from './add-item-group/add-item-group.component';
import { EditItemGroupComponent } from './edit-item-group/edit-item-group.component';
import { ItemGroupsModule } from './item-groups.module';
import { ItemGroupsComponent } from './item-groups/item-groups.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'item_groups',
  },
  {
    path: 'item_groups',
    canActivate: [],
    component: ItemGroupsComponent,
    data: {
      title: 'Item Groups',
    } as SBRouteData,
  },
  {
    path: 'add_item_group',
    canActivate: [],
    component: AddItemGroupComponent,
    data: {
      title: 'Add Item Group',
    } as SBRouteData,
  },
  {
    path: 'edit_item_group/:id',
    canActivate: [],
    component: EditItemGroupComponent,
    data: {
      title: 'Edit Item Group',
    } as SBRouteData,
  },
]

@NgModule({
  imports: [ItemGroupsModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemGroupsRoutingModule { }
