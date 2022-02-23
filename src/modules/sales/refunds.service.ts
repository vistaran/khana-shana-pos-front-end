import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RData } from './refunds';

@Injectable({
  providedIn: 'root'
})
export class RefundsService {

  private url: string = '/assets/data/refund.json'
  
  constructor(private http: HttpClient) { }

  getOrdersData(): Observable<RData[]> {
    return this.http.get<RData[]>(this.url);
  }
}
