import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AttributeFamilyService } from '../attribute-family.service';

@Component({
  selector: 'sb-attribute-family',
  templateUrl: './attribute-family.component.html',
  styleUrls: ['./attribute-family.component.scss']
})
export class AttributeFamilyComponent implements OnInit {

  attributeFamilyData: any = [];
  public length = 0;
  public total = 0;

  page = 1;
  pageSize = 5;
  searchValue: any
  showloader: any

  constructor(private attributeFamilyService: AttributeFamilyService, private router: Router) { }

  ngOnInit(): void {
    this.getFamily()
  }

  // To get attribute family data for table listing
  getFamily() {
    this.showloader = true
    this.attributeFamilyService.getFamily(this.page).subscribe(result => {
      this.attributeFamilyData = result.attributefamily.data;
      this.length = result.attributefamily.per_page;
      this.total = result.attributefamily.total;
      this.showloader = false
    });
  }

  // To update data on page change
  onPageChange(event: any) {
    this.page = event;
    this.getFamily();
    console.log('Here >>>', this.page, this.attributeFamilyData);
  }

  // For navigating to add attribute family form on click
  onClick() {
    this.router.navigate(['/catalog/addAttributeFamily']);
  }

  // For deleting attribute family
  deleteRow(id: number) {
    this.attributeFamilyService.deleteFamily(id).subscribe(data => {
      this.getFamily();
    });
    console.log('Deleted!');
  }

  // For searching data from table
  search(event: any) {
    this.showloader = true
    this.attributeFamilyService.searchFamily(this.searchValue).subscribe(res => {
      this.attributeFamilyData = res.attributes_family.data
      this.length = this.attributeFamilyData.length;
      this.total = res.attributes_family.total;
      this.showloader = false
      console.log(this.attributeFamilyData)
    })
  }
}
