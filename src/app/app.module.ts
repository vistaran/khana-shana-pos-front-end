import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppToastsComponentComponent } from './app-toasts-component/app-toasts-component.component';
import { AppComponent } from './app.component';
import { SearchfilterPipe } from './searchfilter.pipe';

@NgModule({
    declarations: [AppComponent, SearchfilterPipe, AppToastsComponentComponent],
    imports: [BrowserModule, CommonModule, AppRoutingModule, HttpClientModule, NgbToastModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
