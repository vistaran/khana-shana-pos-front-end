import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { AppToastsComponentComponent } from './app-toasts-component/app-toasts-component.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [AppComponent, SearchfilterPipe, AppToastsComponentComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbToastModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
