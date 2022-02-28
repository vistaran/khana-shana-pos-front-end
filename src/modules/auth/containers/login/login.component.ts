import { FormGroup, FormBuilder } from '@angular/forms';
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
    
    
    constructor(public auth: AuthService, private fb: FormBuilder) {}

    // get f() { 
    //     return this.loginForm.controls; 
    // }

    // credentials = {
    //     email: this.f.email.value,
    //     password: this.f.password.value
    // }


    
    ngOnInit() {
        // this.loginForm = this.fb.group( {
        //     email: [''],
        //     password: [''],
        //   });
    }

    onSubmit(data: any) {
        //console.log(data);
        this.auth.login(data)
            .subscribe( (result: any) => 
            console.log(result)
            )
        // prepare parameters
        // this.auth.getUser()
        // .subscribe( data => this.regData = data);
        // console.log(this.loginForm.value);

        // this.auth.login(this.credentials).subscribe((response) => {
        //     console.log(response);

            // set token and user detail in local storage separtely
            // localStorage.setItem('token', 'access_token');
            // localStorage.setItem('user', '');
        // }, (err) => {
        //     console.log(err);
        // })
    }
}
