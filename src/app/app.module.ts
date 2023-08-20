import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppToastsComponentComponent } from './app-toasts-component/app-toasts-component.component';
import { AppComponent } from './app.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { TokenInterceptor } from './token-interceptor.interceptor';

@NgModule({
    declarations: [AppComponent, SearchfilterPipe, AppToastsComponentComponent],
    imports: [BrowserModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        NgbToastModule
    ],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: TokenInterceptor,
        //     multi: true,
        // },
        // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
