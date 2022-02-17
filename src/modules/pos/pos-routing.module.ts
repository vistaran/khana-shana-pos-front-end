import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppCommonModule } from '@common/app-common.module';
import { SBRouteData } from '@modules/navigation/models';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AddUserComponent } from './add-user/add-user.component';
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
  } 

];

@NgModule({
  imports: [PosModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
