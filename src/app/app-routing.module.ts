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
    // {
    //     path: 'charts',
    //     loadChildren: () =>
    //         import('modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
    // },
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
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
