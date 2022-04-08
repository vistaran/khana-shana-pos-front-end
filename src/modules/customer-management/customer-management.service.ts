import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomerData } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {

  private url = '/assets/data/customer.json'

  constructor(
    private http: HttpClient
  ) { }

  getCustomerData(): Observable<CustomerData[]> {
    return this.http.get<CustomerData[]>(this.url);
  }

}
