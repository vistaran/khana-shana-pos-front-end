import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

    get user_avatar() {
        return this.addUserForm.get('user_avatar');
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
        private outletService: OutletDataService,
        private route: Router
    ) { }

    ngOnInit(): void {
        this.addUserForm = this.fb.group(
            {
                username: ['', [Validators.required]],
                first_name: ['', [Validators.required]],
                lastname: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                phone_no: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
                user_avatar: ['', [Validators.required]],
                password: ['', [Validators.required]],
                confirm_password: ['', [Validators.required]],
                outlet: ['', [Validators.required]],
                status: [0, [Validators.required]],
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

    // onUploadCoverPic() {
    //     const coverPicFormData = new FormData();
    //     coverPicFormData.append('cover_photo', this.coverPicFile);
    //     coverPicFormData.append('user_id', this.user_id);

    //     // Make http post request over api
    //     // with formData as req
    //     this.loadingCoverPic = !this.loadingCoverPic;

    //     console.log('this.file1', this.file);
    //     this.usersServices.uploadUserCoverPic(coverPicFormData).subscribe(
    //       (event: any) => {
    //         console.log(event);

    //         if (typeof event === 'object') {
    //           // Short link via api response
    //           this.shortLink = event.link;
    //           this.loadingCoverPic = false; // Flag variable
    //           // window.location.reload();
    //           this.SpinnerService.show();
    //           this.initialDetails();
    //           this.SpinnerService.hide();
    //         }
    //       },
    //       (err) => {
    //         this.toastr.error(JSON.stringify(err.error.message));
    //       }
    //     );
    //     this.ngOnInit();
    //   }

    // For submitting add user form data
    onSubmit(data: any) {
        this.userService
            .postUserData(data)
            .subscribe((result: any) => {
                console.log(result)
                this.toast.success('Success', 'Added Successfully.')
                this.route.navigate(['/pos/users'])
            }, err => {
                this.toast.error('Error', 'Server error.')
            });
        console.log('Form Submitted', (data));
    }
}
