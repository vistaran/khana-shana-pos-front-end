import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PData } from './prodList';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://127.0.0.1:8000/api/product/';

  constructor(private http: HttpClient) { }

  getProducts(page: number): Observable<PData> {
    return this.http.get<PData>(this.url + 'show?page=' + page);
  }

  deleteProducts(id: number) {
    return this.http.get(this.url + 'delete/' + id)
  }

  postProducts(data: any) {
    return this.http.post(this.url + 'insert', data)
  }

  editProducts(id: number, data: any) {
    return this.http.put(this.url + 'edit/' + id, data)
  }

  searchProducts(data: any): Observable<PData> {
    return this.http.get<PData>(this.url + 'search?query=' + data)
  }
}
