import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AppCommonModule } from '@common/app-common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import { SalesRoutingModule } from './sales-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RefundsComponent } from './refunds/refunds.component';


@NgModule({
  declarations: [OrdersComponent, ShipmentComponent, InvoicesComponent, RefundsComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule,
    AppCommonModule,
    NgbModule
  ]
})
export class SalesModule { }
