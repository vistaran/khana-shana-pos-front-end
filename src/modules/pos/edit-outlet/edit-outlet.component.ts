import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'sb-edit-outlet',
    templateUrl: './edit-outlet.component.html',
    styleUrls: ['./edit-outlet.component.scss'],
})
export class EditOutletComponent implements OnInit {
    editOutletForm!: FormGroup;

    inventorySource = ['default'];
    status = ['active', 'inactive'];

    get outletName() {
        return this.editOutletForm.get('outletName');
    }

    get stat() {
        return this.editOutletForm.get('status');
    }

    get outletAddress() {
        return this.editOutletForm.get('outletAddress');
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
        return this.editOutletForm.get('postCode');
    }

    get inventory() {
        return this.editOutletForm.get('inventorySource');
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.editOutletForm = this.fb.group({
            outletName: ['', [Validators.required]],
            status: ['', [Validators.required]],
            outletAddress: ['', [Validators.required]],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            city: ['', [Validators.required]],
            postCode: ['', [Validators.required]],
            inventorySource: ['', [Validators.required]],
        });
    }
}
