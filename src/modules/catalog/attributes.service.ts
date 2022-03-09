import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Adata } from './attributes';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  private url = 'http://127.0.0.1:8000/api/attribute/';

  constructor(private http: HttpClient) { }

  getAttributesData(page: number): Observable<Adata> {

    return this.http.get<Adata>(this.url + 'show?page=' + page);
  }

  deleteAttribute(id: number) {
    return this.http.get(this.url + 'delete/' + id)
  }

  postAttribute(data: any) {
    return this.http.post(this.url + 'insert', data)
  }

  editAttribute(id: number, data: any) {
    return this.http.put(this.url + 'edit/' + id, data)
  }

  searchAttribute(data: any): Observable<Adata> {
    return this.http.get<Adata>(this.url + 'search?query=' + data)
  }
}
