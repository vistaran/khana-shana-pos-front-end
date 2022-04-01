import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UOM } from './uom';

@Injectable({
  providedIn: 'root'
})
export class UomService {

  private url = '/assets/data/uom.json';

  constructor(
    private http: HttpClient
  ) { }

  getUOMData(): Observable<UOM[]> {
    return this.http.get<UOM[]>(this.url);
  }
}
