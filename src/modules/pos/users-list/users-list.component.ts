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
    public udata: any = [];
    public odata: any;
    public odata_del: any;
    public length: number = 0;
    public total: number = 0;
    public id: number= 0;
     

    page = 1;
    pageSize = 10;
    itemsPerPage: any;
    


    constructor(
        private userData: UserDataService,
        private outletData: OutletDataService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        //this.refreshOutlet();
        this.getOutletData();
        //this.deleteRow2(this.id);
    }
    
    
    ngOnInit() {
        this.userData.getUserData().subscribe(data => (this.udata = data));

        //this.outletData.getOutletData().subscribe(result => (this.odata = result)); 
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

    deleteRow2(id: number) {

        //const index = this.odata.indexOf(this.id);
        this.odata.splice(id, 1);
        this.outletData.deleteOutlet(id);
        this.getOutletData();
        console.log(this.odata);
        
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


