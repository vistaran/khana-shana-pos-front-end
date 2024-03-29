import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private url = environment.apiUrl + 'user/update_shop_details';
    constructor(
        private http: HttpClient
    ) { }

    updateShopDetails(data: any) {
        return this.http.post(this.url, data);
    }
}
