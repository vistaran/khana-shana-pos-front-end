import { Pipe, PipeTransform } from '@angular/core';
import { Data } from '@modules/pos/outletData';
import { OData } from '@modules/sales/orders';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {
  constructor(private http: HttpClient) { }
  private url = 'https://2ae7-43-241-193-145.ngrok.io/api/outlet/';
  searchOutlet(data: any) {
    return this.http.get<OData>(this.url + 'search', data)
  }
  transform(outletData: Data, searchValue: string): Data {
    if (!outletData || !searchValue) {
      return outletData;
    }
    return outletData;
  }

}
