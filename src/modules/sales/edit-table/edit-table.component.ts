import { TableManagementService } from './../table-management.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    id: any;

    get table_name() {
        return this.editTableForm.get('table_name');
    }

    get table_number() {
        return this.editTableForm.get('table_number');
    }

    get is_table_occupied() {
        return this.editTableForm.get('is_table_occupied');
    }

    get is_table_active() {
        return this.editTableForm.get('is_table_active');
    }

    constructor(
        private fb: FormBuilder,
        private toast: AppToastService,
        private router: Router,
        private TableManagementService: TableManagementService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params.id;
        this.editTableForm = this.fb.group({
            table_number: ['', [Validators.required]],
            seats_available: [0],
            table_name: [''],
            table_occupied: ['', [Validators.required]],
            table_active: ['', [Validators.required]]
        })

        this.getTableManagementDataById();
    }

    getTableManagementDataById() {
        this.TableManagementService.getTableManagementDataById(this.id).subscribe({
            next: (result: any) => {
                this.editTableForm.patchValue({
                    table_number: result.Restaurant_Table_Details.res_table_number,
                    table_name: result.Restaurant_Table_Details.res_table_name,
                    table_occupied: result.Restaurant_Table_Details.is_table_occupied.toString(),
                    table_active: result.Restaurant_Table_Details.is_table_active.toString()
                });
            }, error: err => {
                this.toast.error('Error', 'Something went wrong.');
            }
        })
    }

    onSubmit(data: any) {
        if (this.editTableForm.invalid) {
            alert('Please fill the required fields!');
            this.showValidations = true;
            return;
        }
        console.log(data);

        this.TableManagementService.editTableData(this.id, data).subscribe({
            next: (result: any) => {
                this.toast.success('Success', 'Table data updated successfully!');
                this.router.navigate(['/sales/table_management']);
            }, error: err => {
                this.toast.error('Error', 'Something went wrong. Please try again!');
            }
        })

    }


}
