import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Data, Orders } from './sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  url = environment.apiUrl + 'orders/';

  constructor(
    private http: HttpClient
  ) { }

  createAuthrorizationHeader(): HttpHeaders {

    let headers = new HttpHeaders();
    const token: any = localStorage.getItem('token');

    headers = headers.set('Authorization', 'Bearer ' + token);
    return headers;
  }

  getOrderData(): Observable<Orders> {
    return this.http.get<Orders>(this.url)
  }

  postOrder(data: any) {
    const headers = this.createAuthrorizationHeader();
    return this.http.post(this.url, data, { headers });
  }

  deleteOrder(id: number) {
    return this.http.delete(this.url + id)
  }

  editOrderFormData(id: number):Observable<Data> {
    return this.http.get<Data>(this.url + id)
  }



}
