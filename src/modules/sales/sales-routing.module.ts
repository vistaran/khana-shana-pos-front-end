import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';
import { InvoicesComponent } from './invoices/invoices.component';

import { OrdersComponent } from './orders/orders.component';
import { RefundsComponent } from './refunds/refunds.component';
import { SalesModule } from './sales.module';
import { ShipmentComponent } from './shipment/shipment.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'orders',
  },
  {
    path: 'orders',
    canActivate: [],
    component: OrdersComponent,
    data: {
        title: 'Orders',
    } as SBRouteData,
  },
  {
    path: 'shipments',
    canActivate: [],
    component: ShipmentComponent,
    data: {
        title: 'Shipments',
    } as SBRouteData,
  },
  {
    path: 'invoices',
    canActivate: [],
    component: InvoicesComponent,
    data: {
        title: 'Invoices',
    } as SBRouteData,
  },
  {
    path: 'refunds',
    canActivate: [],
    component: RefundsComponent,
    data: {
        title: 'Refunds',
    } as SBRouteData,
  },
];

@NgModule({
  imports: [SalesModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
