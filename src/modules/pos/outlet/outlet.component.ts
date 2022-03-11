import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private outletData: OutletDataService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOutletData();
  }

  getOutletData() {
    this.showloader = true
    this.outletData.getOutletData(this.page).subscribe(result => {
      this.odata = result.outlets.data
      this.length = result.outlets.per_page;
      this.total = result.outlets.total;
      this.showloader = false
    })
  }

  onPageChange(event: number) {
    this.page = event;
    this.getOutletData();
    console.log('Here >>>', this.page, this.odata);
  }

  deleteRow2(id: number) {

    this.outletData.deleteOutlet(id).subscribe(data => {
      this.getOutletData();
    });
    console.log(this.odata);
  }

  search(event: any) {
    this.showloader = true
    this.outletData.searchOutlet(this.searchValue).subscribe(res => {
      this.odata = res.Outlets.data
      this.length = this.odata.length;
      this.total = res.Outlets.total;
      this.showloader = false
      console.log(this.odata.length)
    })
  }

  onClick() {
    this.router.navigate(['/pos/edit/editoutlet']);
  }

  onClick2() {
    this.router.navigate(['/pos/addoutlet']);
  }
}



