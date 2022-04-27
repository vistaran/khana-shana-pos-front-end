import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyExpenseService {

  url = environment.apiUrl + 'expense_reports'

  constructor(
    private http: HttpClient
  ) { }

  getExpenseByGroup(year: number, month: number): Observable<any> {
    return this.http.get<any>(this.url + '/totalExpense?year= ' + year + '&month=' + month)
  }

  getExpenseByItem(year: number, month: number, page: number): Observable<any> {
    return this.http.get<any>(this.url + '/showItem?year=' + year + '&month=' + month + '&page=' + page)
  }



}
