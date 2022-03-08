import { data } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OData} from './outletData';
import { addOutlet } from './outlet.model';

@Injectable({
    providedIn: 'root',
})
export class OutletDataService {
    private url = 'https://2ae7-43-241-193-145.ngrok.io/api/outlet/';
    
    
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

    search(data: any) {
        return this.http.get<OData>(this.url + 'search?query=' + data)
    }

}
