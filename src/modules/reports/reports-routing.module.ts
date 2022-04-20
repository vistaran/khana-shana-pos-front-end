import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

import { ExpenseByGroupComponent } from './expense-by-group/expense-by-group.component';
import { MonthlyExpenseComponent } from './monthly-expense/monthly-expense.component';
import { ReportsModule } from './reports.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'expense_by_group',
  },
  {
    path: 'expense_by_group',
    canActivate: [],
    component: ExpenseByGroupComponent,
    data: {
      title: 'Expense By Item Group',
    } as SBRouteData,
  },
  {
    path: 'monthly_expense',
    canActivate: [],
    component: MonthlyExpenseComponent,
    data: {
      title: 'Monthly Expense',
    } as SBRouteData,
  },
];

@NgModule({
  imports: [ReportsModule ,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
