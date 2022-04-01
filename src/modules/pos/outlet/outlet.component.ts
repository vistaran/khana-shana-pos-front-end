import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { map } from 'rxjs/operators';

import { OutletDataService } from '../outlet-data.service';
import { Data } from '../outletData';

@Component({
  selector: 'sb-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit {

  public odata: any;
  public length = 0;
  public total = 0;
  public id = 0;
  page = 1;
  pageSize = 10;
  itemsPerPage: any;
  searchValue: any
  showloader: any
  // outlets: Data = [ '', '', '','','', '', '','','', '','']

  constructor(private outletService: OutletDataService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: AppToastService
    ) { }

  ngOnInit(): void {
    this.getOutletData();
  }

  // To get outlet data for table listing
  getOutletData() {
    this.showloader = true
    this.outletService.getOutletData(this.page).subscribe(result => {
      this.odata = result.outlets.data
      this.length = result.outlets.per_page;
      this.total = result.outlets.total;
      this.showloader = false
    })
  }

  // For updating data on page change
  onPageChange(event: number) {
    this.page = event;
    this.getOutletData();
    console.log('Here >>>', this.page, this.odata);
  }

  // For deleting outlet
  deleteRow(id: number) {
    if(confirm('Are you sure you want to delete?')) {
      this.outletService.deleteOutlet(id).subscribe(data => {
        this.getOutletData();
        this.toast.success('Success', 'Deleted successfully.');
      }, err => {
        this.toast.error('Error', 'Server error.');
      });
      console.log(this.odata);
    }
  }

  // For searching outlets table data
  search(event: any) {
    this.showloader = true
    this.outletService.searchOutlet(this.searchValue).subscribe(res => {
      this.odata = res.outlets.data
      this.length = this.odata.length;
      this.total = res.outlets.total;
      this.showloader = false
      console.log(this.odata.length)
    })
  }

}



