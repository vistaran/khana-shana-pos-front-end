import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryListService {

  url = 'https://trial.mobiscroll.com/content/countries.json'

  constructor(
    private http: HttpClient
  ) { }

  getCountryList() {
    return this.http.get(this.url)
  }

}
