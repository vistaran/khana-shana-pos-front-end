import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule } from '@angular/router';
import { OutletComponent } from './outlet/outlet.component';
import { AddOutletComponent } from './add-outlet/add-outlet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditOutletComponent } from './edit-outlet/edit-outlet.component';


@NgModule({
  declarations: [UsersListComponent, AddUserComponent, OutletComponent, AddOutletComponent, EditUserComponent, EditOutletComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    NavigationModule,
    RouterModule,
    NgbModule
  ]
})
export class PosModule { }
