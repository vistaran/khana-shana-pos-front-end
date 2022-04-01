import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { PData } from './prodList';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.apiUrl + '/product/';

  constructor(private http: HttpClient) { }

  // For getting products data
  getProducts(page: number): Observable<PData> {
    return this.http.get<PData>(this.url + 'show?page=' + page);
  }

  // For deleting products data
  deleteProducts(id: number) {
    return this.http.get(this.url + 'delete/' + id)
  }

  // For adding products data
  postProducts(data: any) {
    return this.http.post(this.url + 'insert', data)
  }

  // For editing products data
  editProducts(id: number, data: any) {
    return this.http.put(this.url + 'edit/' + id, data)
  }

  // For searching products data
  searchProducts(data: any): Observable<PData> {
    return this.http.get<PData>(this.url + 'search?query=' + data)
  }
}
