import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AFData } from './attributeFamily';

@Injectable({
  providedIn: 'root'
})
export class AttributeFamilyService {

  private url = 'http://127.0.0.1:8000/api/attribute_family/';

  constructor(private http: HttpClient) { }

  getFamily(page: number): Observable<AFData> {
    return this.http.get<AFData>(this.url + 'show?page=' + page);
  }

  deleteFamily(id: number) {
    return this.http.get(this.url + 'delete/' + id)
  }

  postFamily(data: any) {
    return this.http.post(this.url + 'insert', data)
  }

  editFamily(id: number, data: any) {
    return this.http.put(this.url + 'edit/' + id, data)
  }

  searchFamily(data: any): Observable<AFData> {
    return this.http.get<AFData>(this.url + 'search?query=' + data)
  }
}
