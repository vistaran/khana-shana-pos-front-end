import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Data, ItemsData, PurchaseOrder } from './purchaseOrders';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {

  // token = localStorage.getItem('token');

  private url = environment.apiUrl + 'purchase_order/';
  private itemUrl = environment.apiUrl + 'purchase_items?group_id='

  constructor(
    private http: HttpClient
  ) { }

  getPurchaseOrdersData(): Observable<PurchaseOrder> {
    const headers = this.createAuthrorizationHeader();
    console.log(headers);
    return this.http.get<PurchaseOrder>(this.url, { headers });
  }

  createAuthrorizationHeader(): HttpHeaders {

    let headers = new HttpHeaders();
    const token: any = localStorage.getItem('token');
    console.log('Token: ', localStorage.getItem('token'));

    headers = headers.set('Authorization', 'Bearer ' + token);
    return headers;
  }

  postPurchaseOrderData(data: any) {

    const headers = this.createAuthrorizationHeader();
    console.log(headers);
    return this.http.post(this.url, data, { headers })
  }

  editPurchaseOrderData(id: number, data: any) {
    const headers = this.createAuthrorizationHeader();
    console.log(headers);
    return this.http.put(this.url + id, data, { headers })
  }

  deleteOrder(id: number) {
    return this.http.delete(this.url + id)
  }

  patchOrderData(id: number): Observable<Data> {
    return this.http.get<Data>(this.url + id);
  }

  // For purchase order forms
  getItemData(id: number): Observable<ItemsData> {
    return this.http.get<ItemsData>(this.itemUrl + id)
  }

}
