import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { SalesRoutingModule } from './sales-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSaleComponent } from './add-sale/add-sale.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { OrdersComponent } from './orders/orders.component';
import { RefundsComponent } from './refunds/refunds.component';
import { SalesComponent } from './sales/sales.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { EditSaleComponent } from './edit-sale/edit-sale.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [OrdersComponent, ShipmentComponent, InvoicesComponent, RefundsComponent, SalesComponent, AddSaleComponent, EditSaleComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule,
    AppCommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class SalesModule { }
