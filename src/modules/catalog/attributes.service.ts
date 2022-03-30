import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adata } from './attributes';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  private url: string = '/assets/data/attributes.json';

  constructor(private http: HttpClient) { }

  getAttributesData(): Observable<Adata[]> {
    
    return this.http.get<Adata[]>(this.url);
  }
}
