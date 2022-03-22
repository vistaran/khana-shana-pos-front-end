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

  // For getting attributes data
  getAttributesData(page: number): Observable<Adata> {

    return this.http.get<Adata>(this.url + 'show?page=' + page);
  }

  // For deleting attributes data
  deleteAttribute(id: number) {
    return this.http.get(this.url + 'delete/' + id)
  }

  // For adding attributes
  postAttribute(data: any) {
    return this.http.post(this.url + 'insert', data)
  }

  // To edit attribute
  editAttribute(id: number, data: any) {
    return this.http.put(this.url + 'edit/' + id, data)
  }

  // For searching attributes data
  searchAttribute(data: any): Observable<Adata> {
    return this.http.get<Adata>(this.url + 'search?query=' + data)
  }
}
