import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cdata } from './categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url: string = '/assets/data/categories.json';
  
  constructor(private http: HttpClient) { }

  getCategoriesData(): Observable<Cdata[]> {
    
    return this.http.get<Cdata[]>(this.url);
  }

}
