import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
        private toast: AppToastService,
        private sanitizer: DomSanitizer
    ) {
        if (this.activatedRoute.snapshot.queryParams.outlet) {
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
            this.length = this.userData.length;
            this.total = result.user.total;
            this.showloader = false;

            this.userData.forEach((ele: any) => {
                let temp = '';
                temp = 'data:image/jpeg;base64,' + ele.user_avatar;
                ele.image = this.sanitizer.bypassSecurityTrustUrl(temp);
            })

            console.log(this.userData);

        }, err => {
            this.showloader = false
            this.toast.error('Error', 'Server error.')
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
        if (confirm('Are you sure you want to delete?')) {
            this.userService.deleteUser(id).subscribe(data => {
                this.getUserData();
                this.toast.success('Success', 'User Deleted Successfully.')
            }, err => {
                this.toast.error('Error', 'Server error.')
            });
        }
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
        }, err => {
            this.showloader = false
            this.toast.error('Error', 'Server error.')
        })
    }


}


