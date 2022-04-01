import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Vendors } from './vendorData';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  private url = environment.apiUrl + 'vendors/';

  constructor(
    private http: HttpClient
  ) { }

  getVendorsData(): Observable<Vendors> {
    return this.http.get<Vendors>(this.url);
  }

  postVendorData(data: any) {
    return this.http.post<Vendors>(this.url, data);
  }

  deleteVendor(id: number) {
    return this.http.delete(this.url + id)
  }

}
