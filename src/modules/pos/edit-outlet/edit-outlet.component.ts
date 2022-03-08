import { data } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { OutletDataService } from './../outlet-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'sb-edit-outlet',
    templateUrl: './edit-outlet.component.html',
    styleUrls: ['./edit-outlet.component.scss'],
})
export class EditOutletComponent implements OnInit {
    editOutletForm!: FormGroup
    id:any
    //outlet = new Outlet();

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

    constructor(private fb: FormBuilder, private edit: OutletDataService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.editOutletForm = this.fb.group({
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            city: ['', [Validators.required]],
            postcode: ['', [Validators.required]],
            status: ['', [Validators.required]]
        });
        this.id = this.route.snapshot.params.id
    }
    // "name": " rutu",
    // "address": "390/2,sector-5/A",
    // "country": "India",
    // "state": "Gujarat",
    // "city": "Gandhinagar",
    // "postcode": 382006,
    // "status": "active"

    getData() {

    }
    updateData(data: any) {
        this.edit.editOutlet(this.id, data).subscribe(data => {
            console.log("Data updated successfully! ", data)
        })
        this.router.navigate(['/pos/users']);
    }
}
