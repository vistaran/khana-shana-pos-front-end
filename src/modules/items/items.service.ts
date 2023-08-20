import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Data, Items } from './items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  getItemsService() {
      throw new Error('Method not implemented.');
  }
  getItems() {
      throw new Error('Method not implemented.');
  }

  private url = environment.apiUrl + 'purchase_items';
  // private searchUrl = environment.apiUrl + 'search/purchase_items?query='

  constructor(
    private http: HttpClient
  ) { }

  getItemsData(page: number, limit: number): Observable<Items> {
    return this.http.get<any>(this.url + '?page=' + page + '&limit=' + limit);
  }

  getItemsData2(limit: number): Observable<Items> {
    return this.http.get<any>(this.url + '?limit=' + limit);
  }

  postItemsData(data: any) {
    return this.http.post(this.url, data);
  }

  deleteItem(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

  editItem(id: number, data: any) {
    return this.http.put(this.url + '/' + id, data)
  }

  patchItemData(id: number): Observable<Data> {
    return this.http.get<Data>(this.url + '/' + id);
  }

  searchItems(data: any): Observable<any> {
    return this.http.get<any>(this.url + '?query=' + data)
  }

}
