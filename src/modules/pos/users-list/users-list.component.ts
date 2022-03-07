import { Component, OnInit } from '@angular/core';
// import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

// import { relative } from 'path';
import { OutletDataService } from '../outlet-data.service';
import { UserDataService } from '../user-data.service';

@Component({
    selector: 'sb-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {

    // items = {length: 12};
    public udata: any = [];
    public length = 0;
    public total = 0;
    public id= 0;
    page = 1;
    pageSize = 10;
    itemsPerPage: any;

    constructor(
        private userData: UserDataService,
        private outletData: OutletDataService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        // this.refreshUser();
        // this.getOutletData();
        // this.deleteRow2(this.id);
    }


    ngOnInit() {
        this.getUserData();
    }

    // getOutletData() {

    //     this.outletData.getOutletData(this.page).subscribe(result => {
    //         this.odata = result.outlets.data
    //         this.length = result.outlets.per_page;
    //         this.total = result.outlets.total;

    //     })
    // }

    getUserData() {
        this.userData.getUserData(this.page).subscribe(result => {
            this.udata = result.user.data
            this.length = result.user.per_page;
            this.total = result.user.total;

        })
    }

    onPageChange(event : number) {
        this.page = event;
        this.getUserData();
        console.log('Here >>>', this.page, this.udata);
      }

    onClick() {
        this.router.navigate(['/pos/adduser']);
    }

    onClick2() {
        this.router.navigate(['/pos/outlet']);
    }

    deleteRow(id: number) {

        this.userData.deleteUser(id).subscribe(data => {
            this.getUserData();
        });
        console.log(this.udata);
      }

    // refreshUser() {
    //     this.udata = this.udata
    //         .map((user: any, i: any) => ({ id: i + 1, ...user }))
    //         .slice(
    //             (this.page - 1) * this.pageSize,
    //             (this.page - 1) * this.pageSize + this.pageSize
    //         );
    // }



    // refreshOutlet() {
    //   this.odata = this.odata
    //     .map((outlet: any, i: any) => ({id: i + 1, ...outlet}))
    //     .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    // }
}


