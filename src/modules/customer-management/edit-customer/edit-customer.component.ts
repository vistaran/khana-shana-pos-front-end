import { AppToastService } from './../../shared-module/services/app-toast.service';
import { CustomerManagementService } from './../customer-management.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'sb-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  editCustomerForm!: FormGroup
  id: any

  get firstname() {
    return this.editCustomerForm.get('first_name');
  }

  get lastname() {
    return this.editCustomerForm.get('last_name');
  }

  get phone() {
    return this.editCustomerForm.get('phone_number');
  }

  get email() {
    return this.editCustomerForm.get('email');
  }

  get homeAddress() {
    return this.editCustomerForm.get('home_address');
  }

  get officeAddress() {
    return this.editCustomerForm.get('office_address');
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerManagementService,
    private toast: AppToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editCustomerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      email: ['', [Validators.required]],
      home_address: ['', [Validators.required]],
      office_address: ['', [Validators.required]],
      other_address: ['', [Validators.required]]
    })

    this.id = this.route.snapshot.params.id

    this.customerService.editCustomerForm(this.id).subscribe((data: any) => {
      this.editCustomerForm.patchValue(data)
      console.log(data)
    })
  }

   // For submitting add item group form data
   onSubmit(data: any) {
     this.customerService.editCustomer(this.id, data)
       .subscribe((result: any) => {
         console.log(result)
         this.toast.success('Success', 'Edited Successfully.')
         this.router.navigate(['/customer_management']);
       }, err => {
         this.toast.error('Error', 'Server error.')
       });
    console.log('Form Submitted', (data));
  }

}
