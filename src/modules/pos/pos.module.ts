import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [UsersListComponent, AddUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    NavigationModule,
    RouterModule
  ]
})
export class PosModule { }
