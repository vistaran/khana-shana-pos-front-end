import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UData } from './userData';
import { DataTablesModule } from 'angular-datatables';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  

  dtOptions: DataTables.Settings = {};


  private url: string = '/assets/data/userData.json'

  constructor(private http: HttpClient) { }

  getUserData(): Observable<UData[]> {
    
    return this.http.get<UData[]>(this.url);
  }
}
