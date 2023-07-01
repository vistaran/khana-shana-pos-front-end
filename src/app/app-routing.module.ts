import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login',
    },
    {
        path: 'sales',
        loadChildren: () =>
            import('modules/sales/sales-routing.module').then(m => m.SalesRoutingModule),
    },
    {
        path: 'catalog',
        loadChildren: () =>
            import('modules/catalog/catalog-routing.module').then(m => m.CatalogRoutingModule),
    },
    {
        path: 'customer_management',
        loadChildren: () =>
            import('modules/customer-management/customer-management-routing.module').then(m => m.CustomerManagementRoutingModule),
    },
    {
        path: 'pos',
        loadChildren: () =>
            import('modules/pos/pos-routing.module').then(m => m.PosRoutingModule),
    },
    {
        path: 'item_groups',
        loadChildren: () =>
            import('modules/item-groups/item-groups-routing.module').then(m => m.ItemGroupsRoutingModule),
    },
    {
        path: 'items',
        loadChildren: () =>
            import('modules/items/items-routing.module').then(m => m.ItemsRoutingModule),
    },
    {
        path: 'purchase_orders',
        loadChildren: () =>
            import('modules/purchase-orders/purchase-orders-routing.module').then(m => m.PurchaseOrdersRoutingModule),
    },
    {
        path: 'menu',
        loadChildren: () =>
            import('modules/qrcode-menu/qrcode-menu-routing.module').then(m => m.QrcodeMenuRoutingModule),
    },
    {
        path: 'reports',
        loadChildren: () =>
            import('modules/reports/reports-routing.module').then(m => m.ReportsRoutingModule),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('modules/dashboard/dashboard-routing.module').then(
                m => m.DashboardRoutingModule
            ),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    // {
    //     path: 'tables',
    //     loadChildren: () =>
    //         import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
    // },
    // {
    //     path: 'version',
    //     loadChildren: () =>
    //         import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
    // },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
