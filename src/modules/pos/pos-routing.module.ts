import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '@common/app-common.module';
import { SBRouteData } from '@modules/navigation/models';
import { NavigationModule } from '@modules/navigation/navigation.module';

import { AddOutletComponent } from './add-outlet/add-outlet.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditOutletComponent } from './edit-outlet/edit-outlet.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { OutletComponent } from './outlet/outlet.component';
import { PosModule } from './pos.module';
import { UsersListComponent } from './users-list/users-list.component';

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
        } as SBRouteData,
    },
    {
        path: 'adduser',
        canActivate: [],
        component: AddUserComponent,
        data: {
            title: 'Add User',
        } as SBRouteData,
    },
    {
        path: 'outlet',
        canActivate: [],
        component: OutletComponent,
        data: {
            title: 'Outlet',
        } as SBRouteData,
    },
    {
        path: 'addoutlet',
        canActivate: [],
        component: AddOutletComponent,
        data: {
            title: 'Outlet',
        } as SBRouteData,
    },
    {
        path: 'edit/edituser/:id',
        canActivate: [],
        component: EditUserComponent,
        data: {
            title: 'Edit User',
        } as SBRouteData,
    },
    {
        path: 'edit/editoutlet/:id',
        canActivate: [],
        component: EditOutletComponent,
        data: {
            title: 'Edit Outlet',
        } as SBRouteData,
    },
];

@NgModule({
    imports: [PosModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PosRoutingModule {}
