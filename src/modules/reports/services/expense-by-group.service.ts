import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseByGroupService {

  url = environment.apiUrl + 'expense_reports/expense';
  // https://posapidemo.vistaran.com/api/expense_reports/expense?

  constructor(
    private http: HttpClient
  ) { }

  getExpenseByGroupData(startDate: any, endDate: any): Observable<any> {
    return this.http.get<any>(this.url + '?startdate=' + startDate + '&&enddate=' + endDate)
  }

}
