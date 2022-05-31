import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@modules/auth/models/auth.model';
import { PasswordValidator } from '@modules/pos/password.validator';
import { UserDataService } from '@modules/pos/user-data.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'sb-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {

  user2: User[] = [];
  createAccountForm!: FormGroup;
  imageForm!: FormGroup;
  showValidations = false;
  file: any;

  imageUrl = 'image\avatardefault_92824.png';
  fileToUpload!: File;

  // user = new User();

  constructor(
    private regUser: AuthService,
    private fb: FormBuilder,
    private route: Router,
    private userService: UserDataService,
    private toast: AppToastService
  ) { }

  get first_Name() {
    return this.createAccountForm.get('first_name');
  }

  get lastname() {
    return this.createAccountForm.get('lastname');
  }

  get username() {
    return this.createAccountForm.get('username');
  }

  get email() {
    return this.createAccountForm.get('email');
  }

  get password() {
    return this.createAccountForm.get('password');
  }

  get confirm_password() {
    return this.createAccountForm.get('confirm_password');
  }

  ngOnInit() {
    this.createAccountForm = this.fb.group({
      first_name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    },
      { validators: PasswordValidator }
    )

    this.imageForm = this.fb.group({ image: [''] });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0) as File;

    const reader = new FileReader()
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload)
    console.log('imageUrl');

  }

  // username: ['', [Validators.required]],
  //               first_name: ['', [Validators.required]],
  //               lastname: ['', [Validators.required]],
  //               email: ['', [Validators.required, Validators.email]],
  //               phone_no: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
  //               user_avatar: ['', [Validators.required]],
  //               password: ['', [Validators.required]],
  //               confirm_password: ['', [Validators.required]],
  //               outlet: ['', [Validators.required]],
  //               status: [0, [Validators.required]],

  refreshUser() {
    this.regUser.getUser()
      .subscribe(data => {
        console.log(data)
        this.user2 = data;
      })
  }

  onChange(event: any) {

    this.handleFileInput(event.target.files);

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
      // this.ngOnInit();
    } else {
      console.log('HERE ELSE');
      this.file = event[0].file;
    }
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  onSubmit(data: any) {

    if (this.createAccountForm.invalid || this.file == null) {
      if (this.createAccountForm.invalid && this.file == null) {
        alert('Please fill all the required fields and upload an image!');
      }
      else if (this.file == null && !this.createAccountForm.invalid) {
        alert('Please upload an image');
      } else {
        alert('Please fill all the required fields!');
      }
      return;
    }

    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('lastname', data.lastname);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirm_password', data.confirm_password);
    formData.append('outlet', '4');
    // formData.append('outlet_name', data.outlet_name);
    formData.append('phone_no', data.phone_no);
    formData.append('user_avatar', this.file);
    formData.append('status', 'active');

    // const obj = {
    //   username: data.username,
    //   first_name: data.first_name,
    //   lastname: data.lastname,
    //   email: data.email,
    //   phone_no: ' ',
    //   user_avatar: this.file,
    //   password: data.password,
    //   confirm_password: data.confirm_password,
    //   outlet: ,
    //   status: ,
    // }

    this.userService
      .postUserData(formData)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Account Created Successfully.')
        this.route.navigate(['/auth/login'])
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log(data);
  }

  // onClick() {
  //        this.regUser.addUser()
  //         console.log(data)
  //         this.refreshUser();
  //       }

}
