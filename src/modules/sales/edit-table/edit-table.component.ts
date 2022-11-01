import { Router } from '@angular/router';
import { AppToastService } from './../../shared-module/services/app-toast.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-edit-table',
    templateUrl: './edit-table.component.html',
    styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit {

    editTableForm!: FormGroup
    showValidations = false;

    get table_name() {
        return this.editTableForm.get('table_name');
    }

    get table_number() {
        return this.editTableForm.get('table_number');
    }

    constructor(
        private fb: FormBuilder,
        private toast: AppToastService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.editTableForm = this.fb.group({
            table_number: ['', [Validators.required]],
            table_name: ['', [Validators.required]]
        })
    }

    onSubmit(data: any) {
        if (this.editTableForm.invalid) {
            alert('Please fill the required fields!');
            this.showValidations = true;
            return;
        }
        console.log(data);

    }


}
