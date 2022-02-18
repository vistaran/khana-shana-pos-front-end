import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OData } from './outletData';

@Injectable({
  providedIn: 'root'
})
export class OutletDataService {

  private url: string = '/assets/data/odata.json'

  constructor(private http: HttpClient) { }

  getOutletData(): Observable<OData[]> {
    
    return this.http.get<OData[]>(this.url);
  }
}
