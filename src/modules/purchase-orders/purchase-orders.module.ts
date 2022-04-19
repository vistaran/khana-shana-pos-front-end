import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AddPurchaseOrderComponent } from './add-purchase-order/add-purchase-order.component';
import { EditPurchaseOrderComponent } from './edit-purchase-order/edit-purchase-order.component';
// import { PurchaseOrdersRoutingModule } from './purchase-orders-routing.module';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';


@NgModule({
  declarations: [PurchaseOrdersComponent, AddPurchaseOrderComponent, EditPurchaseOrderComponent],
  imports: [
    CommonModule,
    // PurchaseOrdersRoutingModule,
    NavigationModule,
    AppCommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgSelectModule
  ]
})
export class PurchaseOrdersModule { }
