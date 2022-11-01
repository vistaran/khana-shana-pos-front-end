import { Router } from '@angular/router';
import { AppToastService } from './../../shared-module/services/app-toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-add-table',
    templateUrl: './add-table.component.html',
    styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent implements OnInit {

    addTableForm!: FormGroup
    showValidations = false;

    get table_name() {
        return this.addTableForm.get('table_name');
    }

    get table_number() {
        return this.addTableForm.get('table_number');
    }


    constructor(
        private fb: FormBuilder,
        private toast: AppToastService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.addTableForm = this.fb.group({
            table_number: ['', [Validators.required]],
            table_name: ['', [Validators.required]]
        })
    }

    onSubmit(data: any) {
        if(this.addTableForm.invalid) {
            alert('Please fill the required fields!');
            this.showValidations = true;
            return;
        }
        console.log(data);

    }

}
