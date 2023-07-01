import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

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

  constructor(
    private attributeService: AttributesService,
    private router: Router,
    private toast: AppToastService
  ) { }

  ngOnInit(): void {

    this.getAttributesData()

  }

  // For getting attributes data for table listing
  getAttributesData() {
    this.showloader = true
    this.attributeService.getAttributesData(this.page).subscribe({
      next: result => {
        this.attributesData = result.Attributes.data;
        this.length = this.attributesData.length;
        this.total = result.Attributes.total;
        this.showloader = false
        console.log(this.attributesData, this.length, this.total, this.page);
      }, error: err => {
        this.showloader = false
        this.toast.error('Error', 'Server error.')
      }
    })
  }

  // For navigating to add attribute form on click
  onClick() {
    this.router.navigate(['/catalog/addattribute']);
  }

  // For deleting attribute data
  deleteRow(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.attributeService.deleteAttribute(id).subscribe({
        next: data => {
          this.getAttributesData();
          this.toast.success('Success', 'Attribute Deleted Successfully.')
        }, error: err => {
          this.toast.error('Error', 'Server error.')
        }
      });
    }
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
    this.attributeService.searchAttribute(this.searchValue).subscribe({
      next: res => {
        this.attributesData = res.Attributes.data;
        this.length = this.attributesData.length;
        this.total = res.Attributes.total;
        this.showloader = false
        console.log(this.attributesData)
      }, error: err => {
        this.toast.error('Error', 'Server error.')
        this.showloader = false
      }
    });
  }
}


