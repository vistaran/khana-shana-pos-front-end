import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SData } from './shipment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  private url: string = '/assets/data/shipment.json'
  
  constructor(private http: HttpClient) { }

  getOrdersData(): Observable<SData[]> {
    return this.http.get<SData[]>(this.url);
  }
}
