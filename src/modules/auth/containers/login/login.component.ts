import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    // loginForm!: FormGroup;

    //regData: any;

    constructor(
        public auth: AuthService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    // get f() {
    //     return this.loginForm.controls;
    // }

    // credentials = {
    //     email: this.f.email.value,
    //     password: this.f.password.value
    // }

    ngOnInit() {}

    onSubmit(data: any) {
        console.log(data);
        this.auth.login(data).subscribe((result: any) => {
            localStorage.setItem('token', result.access_token)
        }, error => {
            this.router.navigate(['/dashboard']);

        });


        // prepare parameter
        // this.auth.getUser(
        // .subscribe( data => this.regData = data)
        // console.log(this.loginForm.value)
        // this.auth.login(this.credentials).subscribe((response) =>
        //     console.log(response)
        // set token and user detail in local storage separtel

        localStorage.setItem('user', '');
        // }, (err) =>
        //     console.log(err)
        // }
    }
}
