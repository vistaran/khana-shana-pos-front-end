import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Data, OrderDetails, Orders } from './sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  url = environment.apiUrl + 'orders';
  customerUrl = environment.apiUrl + 'customer';

  constructor(
    private http: HttpClient
  ) { }

  createAuthrorizationHeader(): HttpHeaders {

    let headers = new HttpHeaders();
    const token: any = localStorage.getItem('token');

    headers = headers.set('Authorization', 'Bearer ' + token);
    return headers;
  }

  getOrderData(page: number): Observable<Orders> {
    return this.http.get<Orders>(this.url + '?page=' + page)
  }

  postOrder(data: any) {
    const headers = this.createAuthrorizationHeader();
    return this.http.post(this.url, data, { headers });
  }

  editOrder(id: number,data: any) {
    const headers = this.createAuthrorizationHeader();
    console.log(headers);
    return this.http.put(this.url + '/' + id, data, { headers })
  }

  deleteOrder(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

  orderDetailData(id: number):Observable<OrderDetails> {
    return this.http.get<OrderDetails>(this.url + '/' + id)
  }

  searchSales(page: any, data: any) {
    return this.http.get(this.url + '?page=' + page + '&&query=' + data)
  }

  // For Customer Data
  getCustomerData(limit: number) {
    return this.http.get(this.customerUrl + '?limit=' + limit)
  }

}
