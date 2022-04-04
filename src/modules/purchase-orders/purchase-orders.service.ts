import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { PurchaseOrder } from './purchaseOrders';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {

  private url = environment.apiUrl + 'purchase_order/';

  constructor(
    private http: HttpClient
  ) { }

  getPurchaseOrdersData(): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(this.url);
  }

}
