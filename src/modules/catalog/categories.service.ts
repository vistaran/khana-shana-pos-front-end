import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Cdata, SearchCategory } from './categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // private url = environment.apiUrl + 'category/';
  private url = 'http://63b9-103-39-129-200.ngrok.io/api/category/'


  constructor(private http: HttpClient) { }

  // For getting categories data
  getCategoriesData(page: number): Observable<Cdata> {
    return this.http.get<Cdata>(this.url + 'show?page=' + page);
  }

  // For deleting category data
  deleteCategory(id: number) {
    return this.http.get(this.url + 'delete/' + id)
  }

  // For adding Category data
  postCategory(data: any) {
    return this.http.post(this.url + 'insert', data)
  }

  // For editing category
  editCategory(id: number, data: any) {
    return this.http.put(this.url + 'edit/' + id, data)
  }

  // For searching category data
  searchCategory(data: any): Observable<SearchCategory> {
    return this.http.get<SearchCategory>(this.url + 'search?query=' + data)
  }

  // To get edit category form field values
  getEditCategoryData(id: number) {
    return this.http.get(this.url + 'show/' + id)
  }

}
