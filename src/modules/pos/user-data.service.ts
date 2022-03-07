import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UData } from './userData';



@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  
  private url: string = '/assets/data/userData.json'

  constructor(private http: HttpClient) { }

  getUserData(): Observable<UData[]> {
    
    return this.http.get<UData[]>(this.url);
  }
}
