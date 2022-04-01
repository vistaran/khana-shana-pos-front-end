import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { VendorsService } from '../vendors.service';

@Component({
  selector: 'sb-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent implements OnInit {

  editVendorForm!: FormGroup;
  id: any;
  status = ['active', 'inactive'];

  get name() {
    return this.editVendorForm.get('name');
  }

  get phone() {
    return this.editVendorForm.get('phone');
  }

  get address() {
    return this.editVendorForm.get('address');
  }

  get stat() {
    return this.editVendorForm.get('status');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: AppToastService,
    private vendorService: VendorsService
  ) { }

  ngOnInit(): void {
    this.editVendorForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        address: ['', [Validators.required]],
        status: ['', [Validators.required]]
      }
    );

    this.id = this.route.snapshot.params.id
  }

  updateData(data: any) {
    // this.vendorService.editVendor(this.id, data).subscribe(data => {
    //   console.log('Data updated successfully! ', data);
    //   this.router.navigate(['/pos/vendors']);

    // }, err => {
    //   this.toast.error('Error', 'Server error.')
    // });
    console.log('Form Submitted', (data));
    this.router.navigate(['/pos/vendors']);
  }

}
