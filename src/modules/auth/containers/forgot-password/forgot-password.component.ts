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

    forgotPasswordForm!: FormGroup

    constructor(
        private route: Router,
        private fb: FormBuilder
    ) { }

    get email() {
        return this.forgotPasswordForm.get('email');
    }

    ngOnInit() {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required]]
        })
    }

    onSubmit(data: any) {
        this.route.navigate(['/auth/login'])
    }
}
