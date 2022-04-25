import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '@modules/auth/containers';
import { UserService } from '@modules/auth/services';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {

    email = localStorage.getItem('Email')

    constructor(
        public userService: UserService,
        private router: Router,
        private toast: AppToastService
        ) { }
    ngOnInit() { }

    onClick() {
        // this.userService.logout().subscribe(data => {
        //     this.router.navigate(['/auth/login']);
        //     this.toast.success('Success', 'Logged out Successfully.')
        // }, err => {
        //     this.toast.error('Error', 'Server error.')
        // });
        localStorage.clear();
        this.router.navigate(['/auth/login']);
        this.toast.success('Success', 'Logged out Successfully.')

    }
}
