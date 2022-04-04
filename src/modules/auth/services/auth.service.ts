import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@modules/auth/models';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

// import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AuthService {
    baseURL = environment.apiUrl;
    constructor(private http: HttpClient) {}

    // login(credentials: {email: string, password: string}):Observable<any> {
    //     return this.http.post(this.baseURL + 'auth/login', credentials)
    // }

    login(data: any) {
        return this.http.post(this.baseURL + 'auth/login', data);
    }

    getAuth$(): Observable<{}> {
        return of({});
    }

    getUser(): Observable<User[]> {
        console.log('getUser ' + this.baseURL + 'user');
        return this.http.get<User[]>(this.baseURL + 'user');
    }

    addUser(user: User): Observable<any> {
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(user);
        console.log(body);
        return this.http.post(this.baseURL + 'user', body, { headers });
    }
}
