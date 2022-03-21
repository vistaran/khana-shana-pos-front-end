import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AttributeFamilyService } from '../attribute-family.service';

@Component({
  selector: 'sb-attribute-family',
  templateUrl: './attribute-family.component.html',
  styleUrls: ['./attribute-family.component.scss']
})
export class AttributeFamilyComponent implements OnInit {

  afData: any = [];
  public length = 0;
  public total = 0;

  page = 1;
  pageSize = 5;
  searchValue: any
  showloader: any

  constructor(private attributeFamily: AttributeFamilyService, private router: Router) { }

  ngOnInit(): void {
    this.getFamily()
  }

  getFamily() {
    this.showloader = true
    this.attributeFamily.getFamily(this.page).subscribe(result => {
      this.afData = result.Attributes.data;
      this.length = result.Attributes.per_page;
      this.total = result.Attributes.total;
      this.showloader = false
    });
  }

  onPageChange(event: any) {
    this.page = event;
    this.getFamily();
    console.log('Here >>>', this.page, this.afData);
  }

  onClick() {
    this.router.navigate(['/catalog/addAttributeFamily']);
  }

  deleteRow(id: number) {
    this.attributeFamily.deleteFamily(id).subscribe(data => {
      this.getFamily();
    });
    console.log('Deleted!');
  }
  search(event: any) {
    this.showloader = true
    this.attributeFamily.searchFamily(this.searchValue).subscribe(res => {
      this.afData = res.Attributes_Family.data
      this.length = this.afData.length;
      this.total = res.Attributes_Family.total;
      this.showloader = false
      console.log(this.afData)
    })
  }
}
