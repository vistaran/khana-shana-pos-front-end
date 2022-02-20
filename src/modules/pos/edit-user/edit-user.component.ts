import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordValidator } from '../password.validator';

@Component({
    selector: 'sb-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
    editUserForm!: FormGroup;

    get userName() {
        return this.editUserForm.get('userName');
    }

    get firstName() {
        return this.editUserForm.get('firstName');
    }

    get lastName() {
        return this.editUserForm.get('lastName');
    }

    get email() {
        return this.editUserForm.get('email');
    }

    get password() {
        return this.editUserForm.get('password');
    }

    get confirmPassword() {
        return this.editUserForm.get('confirmPassword');
    }

    get outl() {
        return this.editUserForm.get('outlet');
    }

    get stat() {
        return this.editUserForm.get('status');
    }

    outlet = ['Webkul Outlet', 'abc Outlet', 'wow Outlet'];
    status = ['active', 'inactive'];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.editUserForm = this.fb.group(
            {
                userName: ['', [Validators.required]],
                firstName: ['', [Validators.required]],
                lastName: ['', [Validators.required]],
                email: [''],
                password: ['', [Validators.required]],
                confirmPassword: ['', [Validators.required]],
                outlet: ['', [Validators.required]],
                status: ['', [Validators.required]],
            },
            { validators: PasswordValidator }
        );
    }
}
