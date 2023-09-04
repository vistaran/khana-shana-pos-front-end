import { UserDataService } from '@modules/pos/user-data.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-shop-details',
    templateUrl: './shop-details.component.html',
    styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {
    showloader: any
    shopDetails: any

    constructor(
        private toast: AppToastService,
        private userService: UserDataService,

    ) { }

    ngOnInit(): void {
        this.getshopDetails();
    }

    getshopDetails() {
        this.userService.getshopDetails().subscribe({
            next: (result: any) => {
                this.shopDetails = result;
            },
        })
    }
}
