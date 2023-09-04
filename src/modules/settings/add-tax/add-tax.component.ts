import { SettingsService } from './../settings.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

@Component({
    selector: 'sb-add-tax',
    templateUrl: './add-tax.component.html',
    styleUrls: ['./add-tax.component.scss']
})
export class AddTaxComponent implements OnInit {
    taxForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private settingsService: SettingsService,
        private toast: AppToastService,
        private router: Router
    ) { }

    ngOnInit() {
        this.taxForm = this.fb.group({
            name: ['', [Validators.required]],
            percentage: [0.00, [Validators.required]],
            status: [1],
            position: [0],
        })
    }

    addTax(data: any) {
        console.log(data, 'data');

    }
}
