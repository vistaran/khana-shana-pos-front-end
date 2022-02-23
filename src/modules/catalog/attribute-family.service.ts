import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AFData } from './attributeFamily';

@Injectable({
  providedIn: 'root'
})
export class AttributeFamilyService {

  private url: string = '/assets/data/attributeFamily.json';

  constructor(private http: HttpClient) { }

  getAttributeFamily(): Observable<AFData[]> {
    
    return this.http.get<AFData[]>(this.url);
  }
}
