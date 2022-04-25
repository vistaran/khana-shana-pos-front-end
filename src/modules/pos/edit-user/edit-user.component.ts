import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { OutletDataService } from '../outlet-data.service';
import { PasswordValidator } from '../password.validator';
import { UserDataService } from '../user-data.service';

@Component({
    selector: 'sb-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
    editUserForm!: FormGroup;
    id: any
    data: any

    outletData: any = []
    page = 1

    get userName() {
        return this.editUserForm.get('username');
    }

    get firstName() {
        return this.editUserForm.get('first_name');
    }

    get lastName() {
        return this.editUserForm.get('lastname');
    }

    get email() {
        return this.editUserForm.get('email');
    }

    get user_avatar() {
        return this.editUserForm.get('user_avatar');
    }

    get password() {
        return this.editUserForm.get('password');
    }

    get confirmPassword() {
        return this.editUserForm.get('confirm_password');
    }

    get outl() {
        return this.editUserForm.get('outlet_name');
    }

    get stat() {
        return this.editUserForm.get('status');
    }

    get phone() {
        return this.editUserForm.get('phone_no');
    }

    get outstat() {
        return this.editUserForm.get('outlet_status');
    }

    // outlet = ['Webkul Outlet', 'abc Outlet', 'wow Outlet', 'Yasmin Mueller'];
    status = ['active', 'inactive'];

    constructor(private fb: FormBuilder,
        private userService: UserDataService,
        private outletService: OutletDataService,
        private route: ActivatedRoute,
        private router: Router,
        private toast: AppToastService) { }

    ngOnInit(): void {
        this.editUserForm = this.fb.group(
            {
                first_name: ['', [Validators.required]],
                lastname: ['', [Validators.required]],
                username: ['', [Validators.required]],
                email: [''],
                password: ['', [Validators.required]],
                confirm_password: ['', [Validators.required]],
                outlet_name: ['', [Validators.required]],
                outlet_status: ['', [Validators.required]],
                phone_no: ['', [Validators.required]],
                user_avatar: ['', [Validators.required]],
                status: ['', [Validators.required]],
            },
            { validators: PasswordValidator }
        );

        this.id = this.route.snapshot.params.id

        this.userService.editUserForm(this.id).subscribe((data: any) => {
            this.editUserForm.patchValue({
                first_name: data.show_data.first_name,
                lastname: data.show_data.lastname,
                username: data.show_data.username,
                email: data.show_data.email,
                password: data.show_data.password,
                confirm_password: data.show_data.confirm_password,
                outlet_name: data.show_data.outlet_name,
                // outlet_status: data.show_data.outlet_status,
                phone_no: data.show_data.phone_no,
                status: Number(data.show_data.status),
            })
            console.log(data)
        })

        this.getOutletData()
    }

    getOutletData() {
        this.outletService.getOutletData(this.page).subscribe(data=> {
            this.outletData = data.outlets.data;
        })
    }

    // For submitting edit user form data
    updateData(data: any) {
        this.userService.editUser(this.id, data).subscribe(data => {
            console.log('Data updated successfully! ', data);
            this.router.navigate(['/pos/users']);
        }, err => {
            this.toast.error('Error', 'Server error.')
        });
    }
}
