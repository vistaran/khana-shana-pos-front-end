import { EditTableComponent } from './edit-table/edit-table.component';
import { AddTableComponent } from './add-table/add-table.component';
import { TableManagementComponent } from './table-management/table-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

import { AddSaleComponent } from './add-sale/add-sale.component';
import { EditSaleComponent } from './edit-sale/edit-sale.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { OrdersComponent } from './orders/orders.component';
import { RefundsComponent } from './refunds/refunds.component';
import { SalesModule } from './sales.module';
import { SalesComponent } from './sales/sales.component';
import { ShipmentComponent } from './shipment/shipment.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sales',
    },
    {
        path: 'sales',
        canActivate: [],
        component: SalesComponent,
        data: {
            title: 'Sales',
            activeTopNav: '₹ Sales'
        } as SBRouteData,
    },
    {
        path: 'add_sale',
        canActivate: [],
        component: AddSaleComponent,
        data: {
            title: 'Add Sale',
            activeTopNav: '₹ Sales'
        } as SBRouteData,
    },
    {
        path: 'edit_sale/:id',
        canActivate: [],
        component: EditSaleComponent,
        data: {
            title: 'Edit Sale',
            activeTopNav: '₹ Sales'
        } as SBRouteData,
    },
    {
        path: 'table_management',
        canActivate: [],
        component: TableManagementComponent,
        data: {
            title: 'Sales',
            activeTopNav: 'Table Management'
        } as SBRouteData,
    },
    {
        path: 'add_table',
        canActivate: [],
        component: AddTableComponent,
        data: {
            title: 'Add Table',
            activeTopNav: 'Table Management'
        } as SBRouteData,
    },
    {
        path: 'edit_table/:id',
        canActivate: [],
        component: EditTableComponent,
        data: {
            title: 'Edit Table',
            activeTopNav: 'Table Management'
        } as SBRouteData,
    },

    // {
    //   path: 'orders',
    //   canActivate: [],
    //   component: OrdersComponent,
    //   data: {
    //       title: 'Orders',
    //   } as SBRouteData,
    // },
    // {
    //   path: 'shipments',
    //   canActivate: [],
    //   component: ShipmentComponent,
    //   data: {
    //       title: 'Shipments',
    //   } as SBRouteData,
    // },
    // {
    //   path: 'invoices',
    //   canActivate: [],
    //   component: InvoicesComponent,
    //   data: {
    //       title: 'Invoices',
    //   } as SBRouteData,
    // },
    // {
    //   path: 'refunds',
    //   canActivate: [],
    //   component: RefundsComponent,
    //   data: {
    //       title: 'Refunds',
    //   } as SBRouteData,
    // },
];

@NgModule({
    imports: [SalesModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalesRoutingModule { }
