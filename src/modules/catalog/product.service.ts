import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Data, ProductData } from './prodList';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.apiUrl + 'product';
  // private url = 'http://63b9-103-39-129-200.ngrok.io/api/product'

  constructor(private http: HttpClient) { }

  // For getting products data
  getProducts(): Observable<ProductData> {
    return this.http.get<ProductData>(this.url);
  }

  // For deleting products data
  deleteProducts(id: number) {
    return this.http.delete(this.url + '/'+ id)
  }

  // For adding products data
  postProducts(data: any) {
    return this.http.post(this.url, data)
  }

  // For editing products data
  editProducts(id: number, data: any) {
    return this.http.put(this.url + '/' + id, data)
  }

  // For searching products data
  searchProducts(data: any): Observable<ProductData> {
    return this.http.get<ProductData>(this.url + 'search?query=' + data)
  }

  editPatchData(id: any):Observable<Data> {
    return this.http.get<Data>(this.url + '/' + id)
  }
}
