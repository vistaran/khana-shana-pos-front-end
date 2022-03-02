import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OData } from './outletData';

@Injectable({
    providedIn: 'root',
})
export class OutletDataService {
    private url = 'http://127.0.0.1:8000/api/outlet/show';
    
    constructor(private http: HttpClient) {}

    getOutletData(page: number): Observable<OData> {
        return this.http.get<OData>(this.url + '?page=' + page)
    }

    
}
