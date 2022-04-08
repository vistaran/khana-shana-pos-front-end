import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

import { CustomerManagementModule } from './customer-management.module';
import { CustomerManagementComponent } from './customer-management/customer-management.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'customer_management',
  },
  {
    path: 'customer_management',
    canActivate: [],
    component: CustomerManagementComponent,
    data: {
      title: 'Customers',
    } as SBRouteData,
  },
];

@NgModule({
  imports: [CustomerManagementModule ,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
