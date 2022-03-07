import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    constructor() {
        this.user = {
            id: '123',
            first_name: 'Start',
            lastname: 'Bootstrap',
            username: 'start_',
            email: 'no-reply@startbootstrap.com'
        };
    }

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }
}
