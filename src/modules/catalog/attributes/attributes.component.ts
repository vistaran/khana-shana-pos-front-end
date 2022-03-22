import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AttributesService } from '../attributes.service';

@Component({
  selector: 'sb-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {

  public attributesData: any = [];
  public length = 0;
  public total = 0;

  page = 1;
  pageSize = 5;
  searchValue: any
  showloader: any

  constructor(private attributeService: AttributesService, private router: Router) { }

  ngOnInit(): void {

    this.getAttributesData()

  }

  // For getting attributes data for table listing
  getAttributesData() {
    this.showloader = true
    this.attributeService.getAttributesData(this.page).subscribe(result => {
      this.attributesData = result.Attributes.data;
      this.length = result.Attributes.per_page;
      this.total = result.Attributes.total;
      this.showloader = false
      console.log(this.attributesData, this.length, this.total, this.page);
    });
  }

  // For navigating to add attribute form on click
  onClick() {
    this.router.navigate(['/catalog/addattribute']);
  }

  // For deleting attribute data
  deleteRow(id: number) {
    this.attributeService.deleteAttribute(id).subscribe(data => {
      this.getAttributesData();
    });
    console.log(this.attributesData);
  }

  // For updating data on page change
  onPageChange(event: any) {
    this.page = event;
    this.getAttributesData();
    console.log('Here >>>', this.page, this.attributesData);
  }

  // For searching attributes data from table
  search(event: any) {
    this.showloader = true
    this.attributeService.searchAttribute(this.searchValue).subscribe(res => {
      this.attributesData = res.Attributes.data;
      this.length = this.attributesData.length;
      this.total = res.Attributes.total;
      this.showloader = false
      console.log(this.attributesData)
    })
  }
}


