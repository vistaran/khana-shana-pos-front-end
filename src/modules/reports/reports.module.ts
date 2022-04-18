import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ExpenseByGroupComponent } from './expense-by-group/expense-by-group.component';
// import { ReportsRoutingModule } from './reports-routing.module';


@NgModule({
  declarations: [ExpenseByGroupComponent],
  imports: [
    CommonModule,
    NavigationModule,
    AppCommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ]
})
export class ReportsModule { }
