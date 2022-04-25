import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@modules/auth/models/auth.model';
import { PasswordValidator } from '@modules/pos/password.validator';

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
    private route: Router
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
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    },
    { validators: PasswordValidator }
    )
  }

  refreshUser() {
    this.regUser.getUser()
      .subscribe(data => {
        console.log(data)
        this.user2 = data;
      })
  }

  onSubmit(data: any) {
    this.route.navigate(['/auth/login'])
  }

  // onClick() {
  //        this.regUser.addUser()
  //         console.log(data)
  //         this.refreshUser();
  //       }

}
