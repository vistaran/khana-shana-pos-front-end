import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppToastService } from './../../shared-module/services/app-toast.service';
import { CustomerManagementService } from './../customer-management.service';

@Component({
  selector: 'sb-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  addCustomerForm!: FormGroup

  get firstname() {
    return this.addCustomerForm.get('first_name');
  }

  get lastname() {
    return this.addCustomerForm.get('last_name');
  }

  get phone() {
    return this.addCustomerForm.get('phone_number');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: AppToastService,
    private customerService: CustomerManagementService
  ) { }

  ngOnInit(): void {
    this.addCustomerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    })
  }

  // For submitting add item group form data
  onSubmit(data: any) {
    this.customerService.postCustomerData(data)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Added Successfully.')
        this.router.navigate(['/customer_management']);
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log('Form Submitted', (data));
  }

}
