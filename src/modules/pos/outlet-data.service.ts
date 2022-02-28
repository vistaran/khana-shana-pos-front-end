import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OData } from './outletData';

@Injectable({
  providedIn: 'root'
})
export class OutletDataService {

  private url: string = 'https://b275-2405-201-201e-f0a3-54ca-9e18-9c97-73c3.ngrok.io/api/outlet/show'

  constructor(private http: HttpClient) { }

  getOutletData(): Observable<OData[]> {
    
    return this.http.get<OData[]>(this.url);
    
  }
}
