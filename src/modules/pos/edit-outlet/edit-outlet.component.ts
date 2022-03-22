import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';

import { OutletDataService } from './../outlet-data.service';


@Component({
    selector: 'sb-edit-outlet',
    templateUrl: './edit-outlet.component.html',
    styleUrls: ['./edit-outlet.component.scss'],
})
export class EditOutletComponent implements OnInit {
    editOutletForm!: FormGroup
    id: any

    inventorySource = ['default'];
    status = ['active', 'inactive'];

    // For Validations
    get outletName() {
        return this.editOutletForm.get('name');
    }

    get stat() {
        return this.editOutletForm.get('status');
    }

    get outletAddress() {
        return this.editOutletForm.get('address');
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
        private router: Router) { }

    ngOnInit(): void {
        this.editOutletForm = this.fb.group({
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            city: ['', [Validators.required]],
            postcode: ['', [Validators.required]],
            inventory_source: ['', [Validators.required]],
            status: ['', [Validators.required]]
        });
        this.id = this.route.snapshot.params.id

        // this.edit.editOutletForm(this.id).subscribe((data: any) => {
        //     this.editOutletForm.patchValue(data.Show_Data)
        //     console.log(data)
        // })
    }

    // For submitting edit outlet form data
    updateData(data: any) {
        this.outletService.editOutlet(this.id, data).subscribe(data => {
            console.log('Data updated successfully! ', data)
        })
        this.router.navigate(['/pos/users']);
    }
}
