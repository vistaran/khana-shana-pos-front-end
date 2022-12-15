import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QrcodeDataService {

    private url = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    getMenuData() {
        return this.http.get<any>(this.url + 'category/qrcode');
    }

    getQrCode() {
        return this.http.get(this.url + 'qrcode');
    }
}
