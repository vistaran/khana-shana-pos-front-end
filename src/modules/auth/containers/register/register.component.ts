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
  showValidations = false;
  file: any;
  // user = new User();

  constructor(
    private regUser: AuthService,
    private fb: FormBuilder,
    private route: Router,
    private userService: UserDataService,
    private toast: AppToastService
  ) { }

  get first_Name() {
    return this.createAccountForm.get('first_Name');
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
      first_Name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    },
      { validators: PasswordValidator }
    )

    this.onChange();
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

  onChange() {
    this.file = 'https://cdn.icon-icons.com/icons2/1378/PNG/128/avatardefault_92824.png';
    if (this.file.length > 0) {
        const img = new Image();
        img.src = window.URL.createObjectURL(this.file);

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
    }
}

  onSubmit(data: any) {

    if(this.createAccountForm.invalid) {
      alert('Please fill all the required fields!');
      return;
    }

    const obj = {
      username: data.username,
      first_name: data.first_name,
      lastname: data.lastname,
      email: data.email,
      phone_no: ' ',
      user_avatar: ' ',
      password: data.password,
      confirm_password: data.confirm_password,
      outlet: 'Default',
      status: 'active',
    }

    this.userService
      .postUserData(obj)
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
