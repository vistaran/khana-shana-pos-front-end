import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OutletDataService } from '../outlet-data.service';

@Component({
  selector: 'sb-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit {

  public odata: any;
  public odata_del: any;
  public length: number = 0;
  public total: number = 0;
  public id: number= 0;
     

  page = 1;
  pageSize = 10;
    temsPerPage: any;

  constructor(private outletData: OutletDataService, private router: Router, private route:ActivatedRoute) { }

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

    //const index = this.odata.indexOf(this.id);
    //this.odata.splice(id, 1);
    this.outletData.deleteOutlet(id).subscribe(data => {
        this.getOutletData();
    });

    console.log(this.odata);
    
  }

  onClick() {
    this.router.navigate(['/pos/edit/editoutlet']);
  }

  onClick2() {
    this.router.navigate(['/pos/addoutlet']);
}
}

  

