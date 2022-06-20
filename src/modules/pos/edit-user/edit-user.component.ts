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
    showValidations = false;
    file: any
    outlet_id: any;

    outletData: any = []
    page = 1
    image: any;

    imgLink: any;

    imgData: any;
    reader!: FileReader;

    imageUrl = 'image\avatardefault_92824.png';
    fileToUpload!: File;

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
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required]],
                confirm_password: ['', [Validators.required]],
                outlet_id: [0, [Validators.required]],
                phone_no: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
                user_avatar: ['', [Validators.required]],
                status: ['', [Validators.required]],
            },
            { validators: PasswordValidator }
        );

        this.id = this.route.snapshot.params.id

        this.userService.editUserForm(this.id).subscribe((data: any) => {

            this.outlet_id = data.show_data[0].outletid;
            this.image = data.show_data[0].user_avatar
            this.editUserForm.patchValue({
                first_name: data.show_data[0].first_name,
                lastname: data.show_data[0].lastname,
                username: data.show_data[0].username,
                email: data.show_data[0].email,
                password: data.show_data[0].confirm_password,
                confirm_password: data.show_data[0].confirm_password,
                outlet_id: Number(data.show_data[0].outletid),
                // outlet_status: data.show_data[0].outlet_status,
                phone_no: data.show_data[0].phone_no,
                user_avatar: data.show_data[0].user_avatar,
                status: Number(data.show_data[0].status),
            })

            this.editUserForm.setValue({
                user_avatar: data.show_data[0].user_avatar
            })
            console.log(data)
        })

        this.getOutletData()
    }

    getOutletData() {
        this.outletService.getOutletData(this.page).subscribe(data => {
            this.outletData = data.outlets.data.sort(function (a: any, b: any) {
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
        if (event.target && event.target.files && event.target.files.length > 0) {
            this.file = event.target.files[0];
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

        // this.imgLink = ''

        // this.imgData = event.target.files[0]

        // In your case
        // this.logo = this.imgData

        // const mimeType = this.imgData.type

        // if (mimeType.match(/image\/*/) == null) {
        //     const message = 'This file type is not supported, Please upload in image format'
        //     return
        // }

        // this.reader = new FileReader()
        // this.reader.readAsDataURL(this.imgData)
        // this.reader.onload = (event) => {
        //     this.imgLink = this.reader.result
        //     // console.log(reader.result);

        // }

        // console.log('reader', this.reader);
        // console.log('imgLink', this.imgLink);


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

    // For submitting edit user form data
    updateData(data: any) {

        if (this.editUserForm.invalid) {
            alert('Please check the validations!');
            return;
        }

        console.log('id', data.outlet_id);

        if (data.outlet_id == null) {
            data.outlet_id = this.outlet_id;
        }

        let outletName = '';

        this.outletData.forEach((ele: any) => {
            console.log(ele);

            if (data.outlet_id == ele.id) {
                outletName = ele.outlet_name;
            }
            console.log('name', outletName);
        })

        data.outlet_id = Number(data.outlet_id);

        // const formData = new FormData();
        // formData.append('user_avatar', this.file);
        // formData.append('first_name', data.first_name);
        // formData.append('lastname', data.lastname);
        // formData.append('username', data.username);
        // formData.append('email', data.email);
        // formData.append('password', data.password);
        // formData.append('confirm_password', data.confirm_password);
        // formData.append('outlet_id', data.outlet_id);
        // formData.append('outlet_name', outletName);
        // formData.append('phone_no', data.phone_no);
        // formData.append('status', data.status);

        const obj = {
            first_name: data.first_name,
            lastname: data.lastname,
            username: data.username,
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
            outlet_id: data.outlet_id,
            outlet_name: outletName,
            phone_no: data.phone_no,
            user_avatar: this.reader,
            status: data.status,
        }

        // obj.user_avatar = formData;

        console.log(obj);

        // console.log(formData.getAll('outlet_id'));

        this.userService.editUser(this.id, obj).subscribe(data => {
            console.log('Data updated successfully! ', data);
            this.router.navigate(['/pos/users']);
            this.toast.success('Succes', 'User Edited Successfully.')
        }, err => {
            this.toast.error('Error', 'Server error.');
        });
    }
}
