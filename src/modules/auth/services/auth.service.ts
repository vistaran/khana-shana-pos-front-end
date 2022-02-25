import { User } from '@modules/auth/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AuthService {

    baseURL: string = "http://feaa-2405-201-201e-f0a3-d473-cee7-420f-5149.ngrok.io";
    constructor(private http: HttpClient) {}

    login(credentials: {email: string, password: string}):Observable<any> {
        return this.http.post(this.baseURL + 'auth/login', credentials)
            
    }

    getAuth$(): Observable<{}> {
        return of({});
    }

    getUser(): Observable<User[]> {
        console.log('getUser '+this.baseURL + 'user')
        return this.http.get<User[]>(this.baseURL + 'user')
    }

    addUser(user: User):Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(user);
        console.log(body)
        return this.http.post(this.baseURL + 'user', body,{'headers':headers})
    }
}

