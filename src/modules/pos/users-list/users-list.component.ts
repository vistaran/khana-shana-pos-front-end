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
    searchValue: any

    constructor(
        private userData: UserDataService,
        private outletData: OutletDataService,
        private router: Router,
        private route: ActivatedRoute
    ) { }


    ngOnInit() {
        this.getUserData();
    }


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

    deleteRow(id: number) {

        this.userData.deleteUser(id).subscribe(data => {
            this.getUserData();
        });
        console.log(this.udata);
      }

      search(event: any) {
        this.userData.searchUser(this.searchValue).subscribe(res => {
          this.udata = res.Users.data
          this.length = this.udata.length;
          this.total = res.Users.total;
          console.log(this.udata)
        })
      }


}


