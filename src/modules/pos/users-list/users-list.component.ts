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

    public userData: any = [];
    public length = 0;
    public total = 0;
    public id = 0;
    page = 1;
    pageSize = 10;
    itemsPerPage: any;
    searchValue: any
    showloader: any

    constructor(
        private userService: UserDataService,
        private outletData: OutletDataService,
        private router: Router,
        private route: ActivatedRoute
    ) { }


    ngOnInit() {
        this.getUserData();
    }

    // To get user data for table listing
    getUserData() {
        this.showloader = true
        this.userService.getUserData(this.page).subscribe(result => {
            this.userData = result.user.data
            this.length = result.user.per_page;
            this.total = result.user.total;
            this.showloader = false
        })
    }

    // To update data on page change
    onPageChange(event: number) {
        this.page = event;
        this.getUserData();
        console.log('Here >>>', this.page, this.userData);
    }

    // For navigating to add user form on click
    onClick() {
        this.router.navigate(['/pos/adduser']);
    }

    // For deleting user
    deleteRow(id: number) {

        this.userService.deleteUser(id).subscribe(data => {
            this.getUserData();
        });
        console.log(this.userData);
    }

    // For searching users data from table
    search(event: any) {
        this.showloader = true
        this.userService.searchUser(this.searchValue).subscribe(res => {
            this.userData = res.users.data
            this.length = this.userData.length;
            this.total = res.users.total;
            this.showloader = false
            console.log(this.userData)
        })
    }


}


