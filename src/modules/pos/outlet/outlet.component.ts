import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { OutletDataService } from '../outlet-data.service';

@Component({
  selector: 'sb-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit {

  public outletData: any;
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
    this.outletService.getOutletData(this.page).subscribe({
      next: result => {
        this.outletData = result.outlets.data
        this.length = this.outletData.length;
        this.total = result.outlets.total;
        this.showloader = false
      }, error: err => {
        this.toast.error('Error', 'Server error.')
        this.showloader = false
      }
    });
  }

  // For updating data on page change
  onPageChange(event: number) {
    this.page = event;
    this.getOutletData();
    console.log('Here >>>', this.page, this.outletData);
  }

  // For deleting outlet
  deleteRow(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.outletService.deleteOutlet(id).subscribe({
        next: data => {
          this.getOutletData();
          this.toast.success('Success', 'Outlet Deleted successfully.');
        }, error: err => {
          this.toast.error('Error', 'Server error.');
        }
      });
    }
  }

  // For searching outlets table data
  search(event: any) {
    this.showloader = true
    this.outletService.searchOutlet(this.searchValue).subscribe({
      next: (res: any) => {
        this.outletData = res.outlets.data
        this.length = this.outletData.length;
        this.total = res.outlets.total;
        this.showloader = false
        console.log(this.outletData.length)
      }, error: err => {
        this.toast.error('Error', 'Server error.')
        this.showloader = false
      }
    });
  }

}



