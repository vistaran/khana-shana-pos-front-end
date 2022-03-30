import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';

import { addOutlet } from './outlet.model';
import { OData, OutletSearch} from './outletData';

@Injectable({
    providedIn: 'root',
})
export class OutletDataService {
    private url = 'https://ae20-43-241-193-33.ngrok.io/api/outlet/';


    constructor(private http: HttpClient) {}

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

}
