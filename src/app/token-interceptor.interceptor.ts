import { UserService } from '@modules/auth/services';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token: any = localStorage.getItem('token');

        if (token) {
            // let parseToken = JSON.parse(token);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request).pipe(
            map((res: any) => {
                console.log(res);

                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                let errorMsg: any;

                console.log(error);

                if (error instanceof HttpErrorResponse) {
                    errorMsg = error.error;
                    console.log(error, 'err from inter');

                    if (error.status === 401) {
                        this.userService.logout();
                        localStorage.clear();
                        this.router.navigate(['/']);
                        localStorage.setItem('showLogoutWarning', 'true');
                    }
                }
                return throwError(() => { errorMsg });
            })
        );
    }
}
