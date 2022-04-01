import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { data } from 'jquery';
import { Observable } from 'rxjs';

import { AFData, AttributeFamilySearch, EditFamily, FamilyAttribute } from './attributeFamily';

@Injectable({
  providedIn: 'root'
})
export class AttributeFamilyService {

  private url = environment.apiUrl + '/attribute_family/';
  private grUrl = environment.apiUrl + '/group/';

  constructor(private http: HttpClient) { }

  // For getting attribute family data
  getFamily(page: number): Observable<AFData> {
    return this.http.get<AFData>(this.url + 'show?page=' + page);
  }

  // For deleting attribute family data
  deleteFamily(id: number) {
    return this.http.get(this.url + 'delete/' + id)
  }

  // To add attribute family
  postFamily(data: any) {
    return this.http.post(this.url + 'insert', data)
  }

  // For editing attribute family
  editFamily(id: number, data: any) {
    return this.http.put(this.url + 'edit/' + id, data)
  }

  // For searching attribute family data
  searchFamily(data: any): Observable<AttributeFamilySearch> {
    return this.http.get<AttributeFamilySearch>(this.url + 'search?query=' + data)
  }

  // To get group data in edit family form
  getGroup(): Observable<EditFamily> {
    return this.http.get<EditFamily>(this.grUrl + 'show');
  }

  // For adding group data
  addGroup(data: any) {
    return this.http.post(this.grUrl + 'insert/3', data)
  }

  // To delete group data
  deleteGroup(id: number) {
    return this.http.get(this.grUrl + 'delete/' + id)
  }

  // For adding attribute in group
  addAttribute(data: any, attr_id: number) {
    return this.http.post(this.grUrl + 'insertAttribute/' + attr_id, data)
  }

  // To get attributes list in group
  showAttribute(): Observable<FamilyAttribute> {
    return this.http.get<FamilyAttribute>(this.grUrl + 'attribute_group_show');
  }
}
