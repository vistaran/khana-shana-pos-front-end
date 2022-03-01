import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OData } from './outletData';

@Injectable({
    providedIn: 'root',
})
export class OutletDataService {
    private url = 'https://7d58-43-241-194-80.ngrok.io/api/outlet/show?page=1';

    constructor(private http: HttpClient) {}

    getOutletData(): Observable<OData[]> {
        return this.http.get<OData[]>(this.url);
    }
}
