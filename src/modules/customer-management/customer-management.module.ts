import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CustomerManagementComponent } from './customer-management/customer-management.component';


@NgModule({
  declarations: [CustomerManagementComponent],
  imports: [
    CommonModule,
    NavigationModule,
    AppCommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
    // CustomerManagementRoutingModule
  ]
})
export class CustomerManagementModule { }
