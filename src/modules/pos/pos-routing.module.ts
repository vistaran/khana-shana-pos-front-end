import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '@common/app-common.module';
import { SBRouteData } from '@modules/navigation/models';
import { NavigationModule } from '@modules/navigation/navigation.module';

import { AddOutletComponent } from './add-outlet/add-outlet.component';
import { AddUomComponent } from './add-uom/add-uom.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { EditOutletComponent } from './edit-outlet/edit-outlet.component';
import { EditUomComponent } from './edit-uom/edit-uom.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';
import { OutletComponent } from './outlet/outlet.component';
import { PosModule } from './pos.module';
import { UomComponent } from './uom/uom.component';
import { UsersListComponent } from './users-list/users-list.component';
import { VendorsComponent } from './vendors/vendors.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
    },
    {
        path: 'users',
        canActivate: [],
        component: UsersListComponent,
        data: {
            title: 'POS Users',
            activeTopNav: 'Users'
        } as SBRouteData,
    },
    {
        path: 'adduser',
        canActivate: [],
        component: AddUserComponent,
        data: {
            title: 'Add User',
            activeTopNav: 'Users'
        } as SBRouteData,
    },
    {
        path: 'outlet',
        canActivate: [],
        component: OutletComponent,
        data: {
            title: 'Outlet',
            activeTopNav: 'Users'
        } as SBRouteData,
    },
    {
        path: 'addoutlet',
        canActivate: [],
        component: AddOutletComponent,
        data: {
            title: 'Outlet',
            activeTopNav: 'Users'
        } as SBRouteData,
    },
    {
        path: 'edit/edituser/:id',
        canActivate: [],
        component: EditUserComponent,
        data: {
            title: 'Edit User',
            activeTopNav: 'Users'
        } as SBRouteData,
    },
    {
        path: 'edit/editoutlet/:id',
        canActivate: [],
        component: EditOutletComponent,
        data: {
            title: 'Edit Outlet',
            activeTopNav: 'Users'
        } as SBRouteData,
    },
    {
        path: 'vendors',
        canActivate: [],
        component: VendorsComponent,
        data: {
            title: 'Vendors',
            activeTopNav: 'Vendors'
        } as SBRouteData,
    },
    {
        path: 'addvendor',
        canActivate: [],
        component: AddVendorComponent,
        data: {
            title: 'Add Vendor',
            activeTopNav: 'Vendors'
        } as SBRouteData,
    },
    {
        path: 'edit/editvendor/:id',
        canActivate: [],
        component: EditVendorComponent,
        data: {
            title: 'Edit Vendor',
            activeTopNav: 'Vendors'
        } as SBRouteData,
    },
    {
        path: 'uom',
        canActivate: [],
        component: UomComponent,
        data: {
            title: 'UOM',
            activeTopNav: 'UOM'
        } as SBRouteData,
    },
    {
        path: 'adduom',
        canActivate: [],
        component: AddUomComponent,
        data: {
            title: 'Add UOM',
            activeTopNav: 'UOM'
        } as SBRouteData,
    },
    {
        path: 'edit/edituom/:id',
        canActivate: [],
        component: EditUomComponent,
        data: {
            title: 'Edit UOM',
            activeTopNav: 'UOM'
        } as SBRouteData,
    },
];

@NgModule({
    imports: [PosModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PosRoutingModule {}
