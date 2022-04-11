import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { OutletDataService } from '../outlet-data.service';

import { PasswordValidator } from '../password.validator';
import { UserDataService } from '../user-data.service';

@Component({
    selector: 'sb-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
    addUserForm!: FormGroup;
    outletList: any;

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
        return this.addUserForm.get('outlet');
    }

    get stat() {
        return this.addUserForm.get('status');
    }

    get phone() {
        return this.addUserForm.get('phone_no');
    }


    outlet = ['Webkul Outlet', 'abc Outlet', 'wow Outlet', 'Mallory Wisoky', 'Antwon Berge Jr.'];
    status = ['active', 'inactive'];

    constructor(private fb: FormBuilder,
        private userService: UserDataService,
        private toast: AppToastService,
        private outletService: OutletDataService
    ) { }

    ngOnInit(): void {
        this.addUserForm = this.fb.group(
            {
                username: ['', [Validators.required]],
                first_name: ['', [Validators.required]],
                lastname: ['', [Validators.required]],
                email: [''],
                phone_no: ['', [Validators.required]],
                // user_avatar: [''],
                password: ['', [Validators.required]],
                confirm_password: ['', [Validators.required]],
                outlet: ['', [Validators.required]],
                status: ['', [Validators.required]],
                // outlet_status: ['', [Validators.required]]
            },
            { validators: PasswordValidator }
        );

        this.getOutletData()
    }

    getOutletData() {
        this.outletService.getOutletData(1).subscribe(result => {
          this.outletList = result.outlets.data;

          this.addUserForm.get('outlet')?.setValue(this.outletList[0].id)
        })
      }

    // For submitting add user form data
    onSubmit(data: any) {
        this.userService
            .postUserData(data)
            .subscribe((result: any) => {
                console.log(result)
                this.toast.success('Suucess', 'Added Successfully.')
            }, err => {
                this.toast.error('Error', 'Server error.')
            });
        console.log('Form Submitted', (data));
    }
}
