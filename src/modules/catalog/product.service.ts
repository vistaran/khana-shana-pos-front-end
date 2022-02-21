import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PData } from './prodList';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = '/assets/data/product.json'

  constructor(private http: HttpClient) { }

  getProductData(): Observable<PData[]> {
    
    return this.http.get<PData[]>(this.url);
  }
}
