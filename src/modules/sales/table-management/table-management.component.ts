import { AppToastService } from './../../shared-module/services/app-toast.service';
import { AppToastsComponentComponent } from './../../../app/app-toasts-component/app-toasts-component.component';
import { TableManagementService } from './../table-management.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-table-management',
    templateUrl: './table-management.component.html',
    styleUrls: ['./table-management.component.scss']
})
export class TableManagementComponent implements OnInit {

    searchValue: any
    tableData: any = [];
    showloader = false;
    total = 0
    pageSize = 10
    page = 1

    constructor(
        private router: Router,
        private TableManagementService: TableManagementService,
        private toast: AppToastService
    ) { }

    ngOnInit(): void {
        this.getTableData();
    }

    onClick() {
        this.router.navigate(['sales/add_table']);
    }

    getTableData() {
        this.showloader = true
        this.TableManagementService.getTableManagementData(this.page).subscribe({
            next: (result: any) => {
                this.showloader = false;
                console.log(result);
                this.tableData = result.data;
                this.total = result.total;
                this.tableData.forEach((element: any) => {
                    if (element.is_table_active == 1) {
                        element.is_table_active = 'Yes';
                    } else {
                        element.is_table_active = 'No';
                    }

                    if (element.is_table_occupied == 1) {
                        element.is_table_occupied = 'Yes';
                    } else {
                        element.is_table_occupied = 'No';
                    }
                });

            }, error: err => {
                this.toast.error('Error', 'Something went wrong.');
                this.showloader = false;
            }
        });
    }

    onPageChange(event: number) {
        this.page = event;
        this.getTableData();
    }

    deleteTableData(id: number, table_number: any) {
        if (confirm('Are you sure you want to delete table number ' + table_number + '?')) {
            this.TableManagementService.deleteTableData(id).subscribe({
                next: data => {
                    this.getTableData();
                    this.toast.success('Success', 'Table Deleted Successfully.')
                }, error: err => {
                    this.toast.error('Error', 'Server error.')
                }
            });
        }
    }


}
