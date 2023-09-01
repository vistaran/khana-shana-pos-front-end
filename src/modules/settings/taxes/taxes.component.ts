import { SettingsService } from './../settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-taxes',
    templateUrl: './taxes.component.html',
    styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {
    showloader: any
    taxesList: any = []
    page = 1;
    pageSize = 10;
    itemsPerPage: any;
    searchValue: any
    activeId = 1

    constructor(
        public settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        this.getTaxList();
    }

    getTaxList() {
        this.settingsService.getTaxesList(this.page).subscribe({
            next: (result: any) => {
                this.taxesList = result.data;
            }
        })
    }

    // To update data on page change
    onPageChange(event: number) {
        this.page = event;
        this.getTaxList();
        console.log('Here >>>', this.page, this.taxesList);
    }

}
