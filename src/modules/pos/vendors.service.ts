import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Data, Vendors } from './vendorData';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  private url = environment.apiUrl + 'vendors';

  constructor(
    private http: HttpClient
  ) { }

  getVendorsData(page: number): Observable<Vendors> {
    return this.http.get<Vendors>(this.url + '?page=' + page);
  }

  postVendorData(data: any): Observable<Vendors> {
    return this.http.post<Vendors>(this.url, data);
  }

  deleteVendor(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

  editVendor(id: number, data: any) {
    return this.http.put(this.url + '/' + id, data)
  }

  patchVendorData(id: number): Observable<Data> {
    return this.http.get<Data>(this.url + '/' + id);
  }

  searchVendor(page: any, data: any) {
    return this.http.get(this.url + '?page=' + page + '&&query=' + data);
  }

}
