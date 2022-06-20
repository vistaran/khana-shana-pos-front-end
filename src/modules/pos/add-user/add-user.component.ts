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
    showValidations = false;
    file: any;

    imageUrl = 'image\avatardefault_92824.png';
    fileToUpload!: File;

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
            this.outletList = result.outlets.data.sort(function (a: any, b: any) {
                const nameA = a.outlet_name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.outlet_name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });;

            this.addUserForm.get('outlet')?.setValue(this.outletList[0].id)
        })
    }

    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0) as File;

        const reader = new FileReader()
        // reader.readAsDataURL(this.imgData)
        reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
            // console.log(reader.result);
        }
        reader.readAsDataURL(this.fileToUpload)
        console.log('imageUrl', this.imageUrl);

    }

    onChange(event: any) {

        console.log('event', event);


        if (event.target && event.target.files && event.target.files.length > 0) {
            this.file = event.target.files[0];
            console.log(this.file);

            const img = new Image();
            img.src = window.URL.createObjectURL(event.target.files[0]);

            //   img.onload = () => {
            //     // To calculate Aspect ratio
            //     function gcd(a, b) {
            //       return b == 0 ? a : gcd(b, a % b);
            //     }
            //     var r = gcd(img.width, img.height);
            //     this.aspectRatio = img.height / r == 9 && img.width / r == 16;
            //     console.log('Aspect     = ', img.height / r, ':', img.width / r);
            //     console.log('Aspect allowed  = ', this.aspectRatio);

            //     if (!this.aspectRatio) {
            //       this.file = null;
            //     } else {
            //       this.onUpload();
            //     }
            //   };

            console.log('HERE IF');
            console.table(this.file);
        } else {
            console.log('HERE ELSE');
            this.file = event[0].file;
        }
    }

    validateNumber(event: any) {
        const keyCode = event.keyCode;

        const excludedKeys = [8, 9, 37, 39, 46];

        if (!((keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 96 && keyCode <= 105) ||
            (excludedKeys.includes(keyCode)))) {
            event.preventDefault();
        }
    }

    // For submitting add user form data
    onSubmit(data: any) {


        if (this.addUserForm.invalid) {
            alert('Please fill the required fileds!');
            return;
        }

        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('lastname', data.lastname);
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('confirm_password', data.confirm_password);
        formData.append('outlet', data.outlet);
        // formData.append('outlet_name', data.outlet_name);
        formData.append('phone_no', data.phone_no);
        formData.append('user_avatar', this.file);
        formData.append('status', data.status);

        this.userService
            .postUserData(formData)
            .subscribe((result: any) => {
                console.log(result)
                this.toast.success('Success', 'Added Successfully.');
                this.route.navigate(['/pos/users'])
            }, err => {
                this.toast.error('Error', 'Server error.');
            });
        console.log('Form Submitted', (data));
    }
}
