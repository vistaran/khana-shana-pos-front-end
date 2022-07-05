import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { CountryListService } from '@modules/shared-module/services/Country List/country-list.service';

import { OutletDataService } from './../outlet-data.service';


@Component({
    selector: 'sb-edit-outlet',
    templateUrl: './edit-outlet.component.html',
    styleUrls: ['./edit-outlet.component.scss'],
})
export class EditOutletComponent implements OnInit {
    editOutletForm!: FormGroup
    id: any
    // myData: any
    showValidations = false;

    inventory_source = ['default'];
    status = ['active', 'inactive'];

    // For Validations
    get name() {
        return this.editOutletForm.get('outlet_name');
    }

    get stat() {
        return this.editOutletForm.get('status');
    }

    get outletAddress() {
        return this.editOutletForm.get('outlet_Address');
    }

    get country() {
        return this.editOutletForm.get('country');
    }

    get state() {
        return this.editOutletForm.get('state');
    }

    get city() {
        return this.editOutletForm.get('city');
    }

    get postCode() {
        return this.editOutletForm.get('postcode');
    }

    get inventory() {
        return this.editOutletForm.get('inventory_source');
    }

    constructor(private fb: FormBuilder,
        private outletService: OutletDataService,
        private route: ActivatedRoute,
        private router: Router,
        private toast: AppToastService,
        private http: HttpClient
        // private countries: CountryListService
    ) { }

    ngOnInit(): void {
        this.editOutletForm = this.fb.group({
            outlet_name: ['', [Validators.required]],
            outlet_Address: ['', [Validators.required]],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            city: ['', [Validators.required]],
            postcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
            inventory_source: ['', [Validators.required]],
            status: ['', [Validators.required]]
        });
        this.id = this.route.snapshot.params.id

        this.outletService.editOutletForm(this.id).subscribe((data: any) => {

            this.editOutletForm.patchValue(data)
            // this.editOutletForm.get('country')?.setValue(data.country)
        })

        // this.countries.getCountryList().subscribe((resp: any) => {
        //     const countries = [];
        //     for (let i = 0; i < resp.length; ++i) {
        //         const country = resp[i];
        //         countries.push({ text: country.text, value: country.value });
        //     }
        //     this.myData = countries;
        // })
    }

    validateNumber(event: any) {
        // const keyCode = event.keyCode;

        // const excludedKeys = [8, 9, 37, 39, 46];

        // if (!((keyCode >= 48 && keyCode <= 57) ||
        //   (keyCode >= 96 && keyCode <= 105) ||
        //   (excludedKeys.includes(keyCode)))) {
        //   event.preventDefault();
        // }

        var inp = String.fromCharCode(event.keyCode);

        if (/[0-9]/.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
      }

    // For submitting edit outlet form data
    updateData(data: any) {

        if (this.editOutletForm.invalid) {
            this.editOutletForm.markAllAsTouched();
            alert('Please fill all the required fields!');
            return;
        }

        const obj = {
            name: data.outlet_name,
            address: data.outlet_Address,
            country: data.country,
            state: data.state,
            city: data.city,
            postcode: data.postcode,
            inventory_source: data.inventory_source,
            status: data.status
        }
        // console.log(obj);

        this.outletService.editOutlet(this.id, obj).subscribe((data: any) => {
            // console.log('Data updated successfully! ', data);
            this.router.navigate(['/pos/users'], { queryParams: { outlet: true } });
            this.toast.success('Success', 'Outlet Edited successfully.');
        },
            err => {
                this.toast.error('Error', 'Server error.');
            });

    }
}
