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
  createAccountForm!: FormGroup
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

  onSubmit(data: any) {

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
