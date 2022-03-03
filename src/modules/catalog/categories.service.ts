import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cdata } from './categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url: string = 'http://127.0.0.1:8000/api/category/show';
  private postUrl: string = 'http://127.0.0.1:8000/api/category/insert'
  
  constructor(private http: HttpClient) { }

  getCategoriesData(page: number): Observable<Cdata> {
    
    return this.http.get<Cdata>(this.url + '?page=' + page);

  }

  postCategory(data: any) {
    return this.http.post(this.postUrl, data)
  }

}
