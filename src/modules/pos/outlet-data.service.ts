import { data } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OData, addOutlet } from './outletData';

@Injectable({
    providedIn: 'root',
})
export class OutletDataService {
    private url = 'http://127.0.0.1:8000/api/outlet/show';
    private delUrl = 'http://127.0.0.1:8000/api/outlet/delete';
    private postUrl = 'http://127.0.0.1:8000/api/outlet/insert';
    
    constructor(private http: HttpClient) {}

    getOutletData(page: number): Observable<OData> {
        return this.http.get<OData>(this.url + '?page=' + page)
    }

    deleteOutlet(id: number) {
        return this.http.get(this.delUrl + id)
    }

    postOutletData(data: any) {
        return this.http.post<addOutlet>(this.postUrl, data);
    }

}
