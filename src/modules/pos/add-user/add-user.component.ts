import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PasswordValidator } from '../password.validator';
import { UserDataService } from '../user-data.service';

@Component({
    selector: 'sb-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
    addUserForm!: FormGroup;

    get userName() {
        return this.addUserForm.get('userName');
    }

    get firstName() {
        return this.addUserForm.get('firstName');
    }

    get lastName() {
        return this.addUserForm.get('lastName');
    }

    get email() {
        return this.addUserForm.get('email');
    }

    get password() {
        return this.addUserForm.get('password');
    }

    get confirmPassword() {
        return this.addUserForm.get('confirmPassword');
    }

    get outl() {
        return this.addUserForm.get('outlet');
    }

    get stat() {
        return this.addUserForm.get('status');
    }

    get phone() {
        return this.addUserForm.get('phoneNumber');
    }

    outlet = ['Webkul Outlet', 'abc Outlet', 'wow Outlet'];
    status = ['active', 'inactive'];

    constructor(private fb: FormBuilder,
                private user: UserDataService) {}

    ngOnInit(): void {
        this.addUserForm = this.fb.group(
            {
                username: ['', [Validators.required]],
                first_name: ['', [Validators.required]],
                lastname: ['', [Validators.required]],
                email: [''],
                phoneNumber: ['',[Validators.required]],
                user_avatar: [''],
                password: ['', [Validators.required]],
                confirm_password: ['', [Validators.required]],
                // outlet: ['', [Validators.required]],
                status: ['', [Validators.required]],
            },
            { validators: PasswordValidator }
        );
    }

    // "first_name":"arth",
    // "lastname":"raval",
    // "username":"arth.raval",
    // "email":"arth@gmail.com",
    // "password":"arth",
    // "confirm_password":"arth",
    // "user_avatar":".jpg",
    // "status":"active"

    onSubmit(data: any) {

        this.user
                .postOutletData(data)
                .subscribe((result: any) => console.log(result));
        console.log('Form Submitted',(data));
      }
}
