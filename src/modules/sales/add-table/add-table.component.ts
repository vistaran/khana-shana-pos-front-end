import { TableManagementService } from './../table-management.service';
import { Router, ActivatedRoute } from '@angular/router';
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

    get is_table_occupied() {
        return this.addTableForm.get('table_occupied');
    }

    get is_table_active() {
        return this.addTableForm.get('table_active');
    }


    constructor(
        private fb: FormBuilder,
        private toast: AppToastService,
        private router: Router,
        private TableManagementService: TableManagementService
    ) { }

    ngOnInit(): void {
        this.addTableForm = this.fb.group({
            table_number: ['', [Validators.required]],
            seats_available: [0],
            table_name: ['', [Validators.required]],
            table_occupied: [null, [Validators.required]],
            table_active: [null, [Validators.required]]
        });

    }

    validateNumber(event: any) {

        var inp = String.fromCharCode(event.keyCode);

        if (/[0-9]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }

    onSubmit(data: any) {
        if (this.addTableForm.invalid) {
            alert('Please fill the required fields!');
            this.showValidations = true;
            this.addTableForm.markAllAsTouched;
            return;
        }
        // console.log(data);

        this.TableManagementService.addTableData(data).subscribe({
            next: (result: any) => {
                this.toast.success('Success', 'Table added successfully!');
                this.router.navigate(['/sales/table_management']);

            }, error: err => {
                this.toast.error('Error', 'Something went wrong. Please try again!');
            }
        })

    }

}
