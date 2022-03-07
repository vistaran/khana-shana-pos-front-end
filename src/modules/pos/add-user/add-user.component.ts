import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PasswordValidator } from '../password.validator';

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

    outlet = ['Webkul Outlet', 'abc Outlet', 'wow Outlet'];
    status = ['active', 'inactive'];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.addUserForm = this.fb.group(
            {
                userName: ['', [Validators.required]],
                firstName: ['', [Validators.required]],
                lastName: ['', [Validators.required]],
                email: [''],
                avatar: [''],
                password: ['', [Validators.required]],
                confirmPassword: ['', [Validators.required]],
                outlet: ['', [Validators.required]],
                status: ['', [Validators.required]],
            },
            { validators: PasswordValidator }
        );
    }
}
