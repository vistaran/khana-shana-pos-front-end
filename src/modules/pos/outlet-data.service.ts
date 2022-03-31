import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { OutletData } from './outletData';

@Injectable({
    providedIn: 'root',
})
export class OutletDataService {
    private url = environment.apiUrl + '/outlet/';


    constructor(private http: HttpClient) { }

    // For getting Outlet data
    getOutletData(page: number): Observable<OutletData> {
        return this.http.get<OutletData>(this.url + 'show?page=' + page)
    }

    // For deleting outlet data
    deleteOutlet(id: number) {
        return this.http.get(this.url + 'delete/' + id)
    }

    // For adding outlet
    postOutletData(data: any) {
        return this.http.post(this.url + 'insert', data);
    }

    // For editing outlet data
    editOutlet(id: number, data: any) {
        return this.http.put(this.url + 'edit/' + id, data)
    }

    // For searching outlet data
    searchOutlet(data: any): Observable<OutletData> {
        return this.http.get<OutletData>(this.url + 'search?query=' + data)
    }

    // To get edit outlet form field values
    editOutletForm(id: number) {
        return this.http.get(this.url + 'show/' + id)
    }
}
