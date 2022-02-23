import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from './invoices';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private url: string = '/assets/data/invoice.json'
  
  constructor(private http: HttpClient) { }

  getInvoiceData(): Observable<IData[]> {
    return this.http.get<IData[]>(this.url);
  }
}
