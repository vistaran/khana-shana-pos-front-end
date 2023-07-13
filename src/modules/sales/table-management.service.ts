import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TableManagementService {

    url = environment.apiUrl + 'tables_management';

    constructor(
        private http: HttpClient
    ) { }

    getTableManagementData(page?: number) {
        return this.http.get(this.url + '?page=' + page);
    }

    addTableData(data: any) {
        return this.http.post(this.url, data);
    }

    getTableManagementDataById(id: any) {
        return this.http.get(this.url + '/' + id);
    }

    editTableData(id: any, data: any) {
        return this.http.put(this.url + '/' + id, data);
    }

    deleteTableData(id: any) {
        return this.http.delete(this.url + '/' + id);

    }

    unOccupyTable(id: any, data: any) {
        return this.http.put(environment.apiUrl + 'unoccupy_table/' + id, data);
    }

    unOccupyTableFromSales(id: any, data: any) {
        return this.http.put(environment.apiUrl + 'unoccupy_table_from_sales/' + id, data);
    }
}
