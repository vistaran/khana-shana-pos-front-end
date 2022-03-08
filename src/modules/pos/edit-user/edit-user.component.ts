import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

    get phone() {
        return this.editUserForm.get('phoneNumber');
    }

    outlet = ['Webkul Outlet', 'abc Outlet', 'wow Outlet'];
    status = ['active', 'inactive'];

    constructor(private fb: FormBuilder,
        private edit: UserDataService,
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit(): void {
        this.editUserForm = this.fb.group(
            {
                username: ['', [Validators.required]],
                first_name: ['', [Validators.required]],
                lastname: ['', [Validators.required]],
                email: [''],
                phoneNumber: ['', [Validators.required]],
                password: ['', [Validators.required]],
                confirm_password: ['', [Validators.required]],
                user_avatar: ['', [Validators.required]],
                outlet: ['', [Validators.required]],
                status: ['', [Validators.required]],
            },
            { validators: PasswordValidator }
        );

        this.id = this.route.snapshot.params.id
    }


    // "first_name":"hrutu",
    // "lastname":"chaudhari",
    // "username":"hrutu.chaudhari",
    // "email":"hrutu@gmail.com",
    // "password":"hrutu",
    // "confirm_password":"hrutu",
    // "user_avatar":".jpeg",
    // "status":"active"

    updateData(data: any) {
        this.edit.editUser(this.id, data).subscribe(data => {
            console.log('Data updated successfully! ', data)
        })
        this.router.navigate(['/pos/users']);
        console.log(this.id);

    }
}
