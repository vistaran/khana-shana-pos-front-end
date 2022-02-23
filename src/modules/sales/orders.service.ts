import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OData } from './orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private url: string = '/assets/data/orders.json'
  
  constructor(private http: HttpClient) { }

  getOrdersData(): Observable<OData[]> {
    return this.http.get<OData[]>(this.url);
  }
}
