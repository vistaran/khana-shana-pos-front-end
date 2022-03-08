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
  public id= 0;
  page = 1;
  pageSize = 10;
  itemsPerPage: any;
  searchValue: any
  // outlets: Data = [ '', '', '','','', '', '','','', '','']

  constructor(private outletData: OutletDataService, private router: Router, private route:ActivatedRoute) {
    // this.getOutletData();
  }

  ngOnInit(): void {
    this.getOutletData();
  }

  getOutletData() {

    this.outletData.getOutletData(this.page).subscribe(result => {
        this.odata = result.outlets.data
        this.length = result.outlets.per_page;
        this.total = result.outlets.total;

    })
  }

  onPageChange(event : number) {
    this.page = event;
    this.getOutletData();
    console.log('Here >>>', this.page, this.odata);
  }

  deleteRow2(id: number) {

    // const index = this.odata.indexOf(this.id);
    // this.odata.splice(id, 1);
    this.outletData.deleteOutlet(id).subscribe(data => {
        this.getOutletData();
    });
    console.log(this.odata);
  }

  search(event: any) {
    this.outletData.searchOutlet(this.searchValue).subscribe(res => {
      this.odata = res.Outlets.data
    })
  }

  onClick() {
    this.router.navigate(['/pos/edit/editoutlet']);
  }

  onClick2() {
    this.router.navigate(['/pos/addoutlet']);
  }
<<<<<<< HEAD
  getKey(event: any) {
    return (event.target.value);
  }
  
  search(event: any) {
    this.outletData.search(this.searchValue).subscribe(data => {
      console.log(this.searchValue);
      console.table(data.outlets.data);
    })
  }

=======
>>>>>>> c4f3c0612d3e0b9d6c65b8369a12e19d09d46bc5
}



