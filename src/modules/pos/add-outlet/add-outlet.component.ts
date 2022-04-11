import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { OutletDataService } from './../outlet-data.service';
// import { addOutlet } from '../outletData';

@Component({
  selector: 'sb-add-outlet',
  templateUrl: './add-outlet.component.html',
  styleUrls: ['./add-outlet.component.scss']
})
export class AddOutletComponent implements OnInit {

  addOutletForm!: FormGroup;

  inventorySource = ['default'];
  status = ['active', 'inactive'];

  constructor(
    private fb: FormBuilder,
    private outletService: OutletDataService,
    private router: Router,
    private toast: AppToastService
  ) { }

  // For Validations
  get outletName() {
    return this.addOutletForm.get('name');
  }

  get stat() {
    return this.addOutletForm.get('status');
  }

  get outletAddress() {
    return this.addOutletForm.get('address');
  }

  get country() {
    return this.addOutletForm.get('country');
  }

  get state() {
    return this.addOutletForm.get('state');
  }

  get city() {
    return this.addOutletForm.get('city');
  }

  get postCode() {
    return this.addOutletForm.get('postcode');
  }

  get inventory() {
    return this.addOutletForm.get('inventory_source');
  }

  ngOnInit(): void {

    this.addOutletForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      status: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      inventory_source: ['', [Validators.required]],
    });
  }


  // For submitting add outlet form data
  onSubmit(data: any) {
    this.outletService
      .postOutletData(data)
      .subscribe((result: any) => {
        this.router.navigate(['/pos/users'], {queryParams: {outlet: true}});
        this.toast.success('Success', 'Added Successfully.')
      }, err =>  {
        this.toast.error('Error', 'Server error.')
      });
    console.log('Form Submitted', (data));
  }

}
