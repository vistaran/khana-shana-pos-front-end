import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { VendorsService } from '../vendors.service';

@Component({
  selector: 'sb-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {

  addVendorForm!: FormGroup;

  // For Validations
  get name() {
    return this.addVendorForm.get('name');
  }

  get phone() {
    return this.addVendorForm.get('phone_numbers');
  }

  get address() {
    return this.addVendorForm.get('address');
  }

  get stat() {
    return this.addVendorForm.get('status');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vendorService: VendorsService,
    private toast: AppToastService
  ) { }

  ngOnInit(): void {

    this.addVendorForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        phone_numbers: ['', [Validators.required]],
        address: ['', [Validators.required]],
        status: ['', [Validators.required]]
      }
    );
  }

  // For submitting add vendor form data
  onSubmit(data: any) {
    this.vendorService
      .postVendorData(data)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Added Successfully.')
        this.router.navigate(['/pos/vendors']);

      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log('Form Submitted', (data));
  }

}
