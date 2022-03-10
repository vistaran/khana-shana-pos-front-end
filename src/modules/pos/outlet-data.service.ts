import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { data } from 'jquery';

import { addOutlet } from './outlet.model';
import { OData, OutletSearch } from './outletData';

@Injectable({
    providedIn: 'root',
})
export class OutletDataService {
    private url = 'http://127.0.0.1:8000/api/outlet/';


    constructor(private http: HttpClient) { }

    getOutletData(page: number): Observable<OData> {
        return this.http.get<OData>(this.url + 'show?page=' + page)
    }

    deleteOutlet(id: number) {
        return this.http.get(this.url + 'delete/' + id)
    }

    postOutletData(data: any) {
        return this.http.post<addOutlet>(this.url + 'insert', data);
    }

    editOutlet(id: number, data: any) {
        return this.http.put(this.url + 'edit/' + id, data)
    }

    searchOutlet(data: any): Observable<OutletSearch> {
        return this.http.get<OutletSearch>(this.url + 'search?query=' + data)
    }

    editOutletForm(id: number) {
        return this.http.get(this.url + 'show/' + id)
    }
}
