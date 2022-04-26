import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyExpenseService {

  url = environment.apiUrl + 'expense_reports/totalExpense'

  constructor(
    private http: HttpClient
  ) { }

  getExpenseReport(year: number, month: number): Observable<any> {
    return this.http.get<any>(this.url + '?year= ' + year + '&month=' + month)
  }

}
