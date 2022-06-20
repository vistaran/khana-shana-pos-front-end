import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'sb-forgot-password',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

    forgotPasswordForm!: FormGroup;
    showValidations = false;

    constructor(
        private route: Router,
        private fb: FormBuilder
    ) { }

    get email() {
        return this.forgotPasswordForm.get('email');
    }

    ngOnInit() {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
        })
    }

    onSubmit(data: any) {
        if (this.forgotPasswordForm.invalid) {
            alert('Please check the validations!');
            return;
        }
        this.route.navigate(['/auth/login'])
    }
}
