import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserDataService } from '../user-data.service';
//import { Subject } from 'rxjs'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
//import { relative } from 'path';
import { AddUserComponent } from '../add-user/add-user.component';
import { OutletDataService } from '../outlet-data.service';


@Component({
  selector: 'sb-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

  

export class UsersListComponent implements OnInit {

  public udata: any = [];

  public odata: any = [];

  page = 1;
  pageSize = 10;
  items = {length: 512};

  constructor(private userData: UserDataService, private outletData: OutletDataService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(){

    this.userData.getUserData()
      .subscribe( data => this.udata = data);

    this.outletData.getOutletData()
      .subscribe( data => this.odata = data);
      
    }
   
  onClick() {
    this.router.navigate(['/pos/adduser']);
  }

  onClick2() {
    this.router.navigate(['/pos/addoutlet']);
  }

  deleteRow(d: any){
    const index = this.udata.indexOf(d);
    this.udata.splice(index, 1);
  }

  deleteRow2(d: any){
    const index = this.odata.indexOf(d);
    this.odata.splice(index, 1);
  }

}
