import { Component, OnInit } from '@angular/core';
// import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

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
    activeId = 1

    constructor(
        private userService: UserDataService,
        private outletData: OutletDataService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toast: AppToastService
    ) { 
        if(this.activatedRoute.snapshot.queryParams.outlet) {
            this.activeId = 2
        }
    }


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
        }, err => {
            this.showloader = false
            this.toast.show('Error', 'Server error', {className: 'bg-danger text-light'})
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


