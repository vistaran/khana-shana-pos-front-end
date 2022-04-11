import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

import { AddPurchaseOrderComponent } from './add-purchase-order/add-purchase-order.component';
import { EditPurchaseOrderComponent } from './edit-purchase-order/edit-purchase-order.component';
import { PurchaseOrdersModule } from './purchase-orders.module';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'purchase_orders',
  },
  {
    path: 'purchase_orders',
    canActivate: [],
    component: PurchaseOrdersComponent,
    data: {
      title: 'Purchase Orders',
    } as SBRouteData,
  },
  {
    path: 'add_purchase_order',
    canActivate: [],
    component: AddPurchaseOrderComponent,
    data: {
      title: 'Add Purchase Order',
    } as SBRouteData,
  },
  {
    path: 'edit_purchase_order/:id',
    canActivate: [],
    component: EditPurchaseOrderComponent,
    data: {
      title: 'Edit Order',
    } as SBRouteData,
  },
];

@NgModule({
  imports: [PurchaseOrdersModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrdersRoutingModule { }
