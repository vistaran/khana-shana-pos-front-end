import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { OutletDataService } from './../outlet-data.service';


@Component({
    selector: 'sb-edit-outlet',
    templateUrl: './edit-outlet.component.html',
    styleUrls: ['./edit-outlet.component.scss'],
})
export class EditOutletComponent implements OnInit {
    editOutletForm!: FormGroup
    id: any

    inventory_source = ['default'];
    status = ['active', 'inactive'];

    // For Validations
    get name() {
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
        private router: Router,
        private toast: AppToastService) { }

    ngOnInit(): void {
        this.editOutletForm = this.fb.group({
            Outlet_name: ['', [Validators.required]],
            Outlet_Address: ['', [Validators.required]],
            Country: ['', [Validators.required]],
            State: ['', [Validators.required]],
            City: ['', [Validators.required]],
            Postcode: ['', [Validators.required]],
            inventory_source: ['', [Validators.required]],
            Status: ['', [Validators.required]]
        });
        this.id = this.route.snapshot.params.id

        this.outletService.editOutletForm(this.id).subscribe((data: any) => {
            console.log(data);
            
            this.editOutletForm.patchValue(data)
        })
    }

    // For submitting edit outlet form data
    updateData(data: any) {
        var obj = {
            name: data.Outlet_name,
            address: data.Outlet_Address,
            country: data.Country,
            state: data.State,
            city: data.City,
            postcode: data.Postcode,
            inventory_source: data.inventory_source,
            status:data.Status 
        }
        console.log(obj);
        
        this.outletService.editOutlet(this.id, obj).subscribe((data:any) => {
            console.log('Data updated successfully! ', data);
            this.router.navigate(['/pos/users'], {queryParams: {outlet: true}});
            this.toast.success('Success', 'Edited successfully.');
        },
        err =>  {
            this.toast.error('Error', 'Server error.');
          });
        
    }
}
