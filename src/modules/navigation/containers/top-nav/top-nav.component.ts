import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationService } from '@modules/navigation/services';
import { DomSanitizer } from '@angular/platform-browser';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { UserDataService } from '@modules/pos/user-data.service';
@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {

    showloader : any
    public userData: any = [];
    public length = 0;
    public total = 0;
    shopName:any;

    constructor(private navigationService: NavigationService,
        private userService: UserDataService,
        private sanitizer: DomSanitizer,
        private toast: AppToastService,) {}
    ngOnInit() {
        this.getshopDetails();
    }

    getshopDetails() {

    
        this.userService.getshopDetails().subscribe({
            next: (result: any) => {
                this.shopName = result.shop_name
                    console.log(result.shop_name);
                }, error: err => {
                   
                    this.toast.error('Error', 'Server error.')
                }
            })
    }
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
}
