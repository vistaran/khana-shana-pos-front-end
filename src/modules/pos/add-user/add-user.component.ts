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

    // For Validations
    get userName() {
        return this.addUserForm.get('username');
    }

    get firstName() {
        return this.addUserForm.get('first_name');
    }

    get lastName() {
        return this.addUserForm.get('lastname');
    }

    get email() {
        return this.addUserForm.get('email');
    }

    get password() {
        return this.addUserForm.get('password');
    }

    get confirm_password() {
        return this.addUserForm.get('confirm_password');
    }

    get outl() {
        return this.addUserForm.get('outlet_name');
    }

    get stat() {
        return this.addUserForm.get('status');
    }

    get phone() {
        return this.addUserForm.get('phone_no');
    }

    get outstat() {
        return this.addUserForm.get('outlet_status');
    }

    outlet = ['Webkul Outlet', 'abc Outlet', 'wow Outlet', 'Mallory Wisoky', 'Antwon Berge Jr.'];
    status = ['active', 'inactive'];

    constructor(private fb: FormBuilder,
        private userService: UserDataService) { }

    ngOnInit(): void {
        this.addUserForm = this.fb.group(
            {
                username: ['', [Validators.required]],
                first_name: ['', [Validators.required]],
                lastname: ['', [Validators.required]],
                email: [''],
                phone_no: ['', [Validators.required]],
                user_avatar: [''],
                password: ['', [Validators.required]],
                confirm_password: ['', [Validators.required]],
                outlet_name: ['', [Validators.required]],
                status: ['', [Validators.required]],
                outlet_status: ['', [Validators.required]]
            },
            { validators: PasswordValidator }
        );
    }

    // For submitting add user form data
    onSubmit(data: any) {
        this.userService
            .postUserData(data)
            .subscribe((result: any) => console.log(result));
        console.log('Form Submitted', (data));
    }
}
