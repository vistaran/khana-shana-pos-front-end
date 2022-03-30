import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cdata } from './categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url = 'http://127.0.0.1:8000/api/category/';


  constructor(private http: HttpClient) { }

  getCategoriesData(page: number): Observable<Cdata> {
    return this.http.get<Cdata>(this.url + 'show?page=' + page);
  }

  deleteCategory(id: number) {
    return this.http.get(this.url + 'delete/' + id)
}

  postCategory(data: any) {
    return this.http.post(this.url + 'insert', data)
  }

  editCategory(id: number, data: any) {
    return this.http.put(this.url + 'edit/' + id, data)
  }

}
