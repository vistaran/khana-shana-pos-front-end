import { FormGroup } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup
    
    regData: any = [];
    credentials = {
        email: this.f.email.value,
        password: this.f.password.value
    }
    
    constructor(public auth: AuthService) {}

    get f() { return this.loginForm.controls; }
    
    ngOnInit() {

    }

    onSubmit() {
        // prepare parameters
        this.auth.getUser()
      .subscribe( data => this.regData = data);

        this.auth.login(this.credentials).subscribe((response) => {
            console.log(response);

            // set token and user detail in local storage separtely
            localStorage.setItem('token', 'access_token');
            localStorage.setItem('user', '');
        }, (err) => {
            console.log(err);
        })
    }
}
