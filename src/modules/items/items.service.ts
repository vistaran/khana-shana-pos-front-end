import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Data, Items } from './items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private url = environment.apiUrl + 'purchase_items/';

  constructor(
    private http: HttpClient
  ) { }


  getItemsData(): Observable<Items> {
    return this.http.get<any>(this.url);
  }

  postItemsData(data: any) {
    return this.http.post(this.url, data);
  }

  deleteItem(id: number) {
    return this.http.delete(this.url + id)
  }

  editItem(id: number, data: any) {
    return this.http.put(this.url + id, data)
  }

  patchItemData(id: number): Observable<Data> {
    return this.http.get<any>(this.url + id);
  }

}
