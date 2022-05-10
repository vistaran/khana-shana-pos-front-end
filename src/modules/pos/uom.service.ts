import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Data, UOM } from './uom';

@Injectable({
  providedIn: 'root'
})
export class UomService {

  private url = environment.apiUrl + 'units';

  constructor(
    private http: HttpClient
  ) { }

  getUOMData(page: number): Observable<UOM> {
    return this.http.get<UOM>(this.url + '?page=' + page);
  }

  deleteUomData(id: number) {
    return this.http.delete(this.url + '/' + id)
  }

  postUomData(data: any) {
    return this.http.post(this.url, data);
  }

  editUomData(id: number, data: any) {
    return this.http.put(this.url + '/' + id, data)
  }

  patchUomData(id: number): Observable<Data> {
    return this.http.get<Data>(this.url + '/' + id);
  }

  searchUomData(page: any, data: any) {
    return this.http.get(this.url + '?page=' + page + '&&query=' + data)
  }
}
