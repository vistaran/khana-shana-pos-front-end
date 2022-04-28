import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Address, CustomerAddress, CustomerData } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {

  // private url = 'http://63b9-103-39-129-200.ngrok.io/api/customer'
  private url = environment.apiUrl + 'customer'
  private addressUrl = environment.apiUrl + 'userAddress'
  private searchUrl = environment.apiUrl + 'search/customerSearch?query='

  constructor(
    private http: HttpClient
  ) { }

  getCustomerData(page: number, limit: number): Observable<CustomerData> {
    return this.http.get<CustomerData>(this.url + '?page=' + page + '&limit=' + limit);
  }

  // For deleting user data
  deleteCustomer(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

  // For editing user data
  editCustomer(id: number, data: any) {
    return this.http.put(this.url + '/' + id, data)
  }

  postCustomerData(data: any) {
    return this.http.post(this.url, data);
  }

  // For searching user data
  // searchCustomer(data: any): Observable<SearchCustomer> {
  //   return this.http.get<SearchCustomer>(this.url + 'search?query=' + data)
  // }

  // To get edit user form field values
  editCustomerForm<FetchCustomer>(id: number) {
    return this.http.get<FetchCustomer>(this.url + '/' + id)
  }

  // For customer Addresses
  getCustomerAddress(id: number): Observable<Address> {
    return this.http.get<Address>(this.addressUrl + '/' + id);
  }

  addCustomerAddress(data: any) {
    return this.http.post(this.addressUrl, data);
  }

  deleteCustomerAddress(id: number) {
    return this.http.delete(this.addressUrl + '/' + id)
  }

  editCustomerAddress(id: number, data: any) {
    return this.http.put(this.addressUrl + '/' + id, data)
  }

  editAddressFormData(id: number): Observable<CustomerAddress> {
    return this.http.get<CustomerAddress>(this.addressUrl + '/' + id + '/edit')
  }

  searchCustomer(data: any): Observable<CustomerData> {
    return this.http.get<CustomerData>(this.url + '?query=' + data)
  }

}
