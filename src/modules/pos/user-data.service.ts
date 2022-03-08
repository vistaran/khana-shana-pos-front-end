import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { searchUser, UData } from './userData';



@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private url = 'http://127.0.0.1:8000/api/user/'

  constructor(private http: HttpClient) { }

  getUserData(page: number): Observable<UData> {

    return this.http.get<UData>(this.url + 'show?page=' + page);
  }

  deleteUser(id: number) {
    return this.http.get(this.url + 'delete/' + id)
  }

  editUser(id: number, data: any) {
    return this.http.put(this.url + 'edit/' + id, data)
  }

  postOutletData(data: any) {
    return this.http.post(this.url + 'insert', data);
  }

  searchUser(data: any): Observable<searchUser> {
    return this.http.get<searchUser>(this.url + 'search?query=' + data)
}
}
