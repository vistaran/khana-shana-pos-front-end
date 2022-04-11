import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { VendorsService } from '../vendors.service';

@Component({
  selector: 'sb-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  public vendorData: any = [];
  activeId = 1;
  public length = 0;
  public total = 0;
  public id = 0;
  page = 1;
  pageSize = 10;
  itemsPerPage: any;
  searchValue: any
  showloader: any
  status: any


  constructor(
    private vendorService: VendorsService,
    private toast: AppToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVendorsData();
  }

  getVendorsData() {
    this.showloader = true;
    this.vendorService.getVendorsData(this.page).subscribe(data => {
      this.vendorData = data.vendors.data;
      this.length = this.vendorData.length
      this.showloader = false;
      console.log(this.vendorData);
    }, err => {
      this.showloader = false
      this.toast.show('Error', 'Server error', { className: 'bg-danger text-light' })
    });
  }

  onClick() {
    this.router.navigate(['/pos/addvendor']);
  }

  onPageChange(event: number) {
    this.page = event;
    this.getVendorsData();
  }

  deleteRow(id: number) {

    this.vendorService.deleteVendor(id).subscribe(data => {
      this.getVendorsData();
      this.toast.success('Success', 'Deleted Successfully.')
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
  }

}
