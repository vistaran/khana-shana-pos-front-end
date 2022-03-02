import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
//import { Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { data } from 'jquery';
//import { relative } from 'path';
import { AddUserComponent } from '../add-user/add-user.component';
import { OutletDataService } from '../outlet-data.service';
import { OData } from '../outletData';
import { UserDataService } from '../user-data.service';

@Component({
    selector: 'sb-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
    
    // items = {length: 12};

    constructor(
        private userData: UserDataService,
        private outletData: OutletDataService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        //this.refreshOutlet();
    }
    public udata: any = [];
    public odata: any;
    public odata_next: any;
    public odata_last: any;
    public outletList: any;
    
    public length: any  = 0;
    page = 1;
    // limit: any = 10;
    // skip: any;

    pageSize = 10;

    
    ngOnInit() {
        this.userData.getUserData().subscribe(data => (this.udata = data));

        //this.outletData.getOutletData().subscribe(result => (this.odata = result)); 
        this.getOutletData();

    }

    getOutletData() {
           
        this.outletData.getOutletData(this.page).subscribe(result => this.odata = result)
    }

    onPageChange(event : number) {
        
        this.page = event;
        this.getOutletData();
        console.log('Here >>>', this.page);
    }

    onClick() {
        this.router.navigate(['/pos/adduser']);
    }

    onClick2() {
        this.router.navigate(['/pos/addoutlet']);
    }

    deleteRow(d: any) {
        const index = this.udata.indexOf(d);
        this.udata.splice(index, 1);
    }

    deleteRow2(d: any) {
        const index = this.odata.indexOf(d);
        this.odata.splice(index, 1);
    }


    refreshUser() {
        this.udata = this.udata
            .map((user: any, i: any) => ({ id: i + 1, ...user }))
            .slice(
                (this.page - 1) * this.pageSize,
                (this.page - 1) * this.pageSize + this.pageSize
            );
    }

    

    // refreshOutlet() {
    //   this.odata = this.odata
    //     .map((outlet: any, i: any) => ({id: i + 1, ...outlet}))
    //     .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    // }
}
