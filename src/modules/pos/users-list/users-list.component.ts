import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserDataService } from '../user-data.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { relative } from 'path';
import { AddUserComponent } from '../add-user/add-user.component';


@Component({
  selector: 'sb-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  
  public udata: Object = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private userData: UserDataService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(){

    this.userData.getUserData()
      .subscribe( data => this.udata = data);
  }
   
  onClick() {
    this.router.navigate(['/pos/adduser']);
  }
}
