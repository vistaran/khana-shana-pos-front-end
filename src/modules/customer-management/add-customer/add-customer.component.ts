import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  addCustomerForm!: FormGroup


  get firstname() {
    return this.addCustomerForm.get('firstname');
  }

  get lastname() {
    return this.addCustomerForm.get('lastname');
  }

  get phone() {
    return this.addCustomerForm.get('phone');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addCustomerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    })
  }

  // For submitting add item group form data
  onSubmit(data: any) {
    // this.itemService.postItemsData(data)
    //   .subscribe((result: any) => {
    //     console.log(result)
    //     this.toast.success('Success', 'Added Successfully.')
    //     this.router.navigate(['/items']);
    //   }, err => {
    //     this.toast.error('Error', 'Server error.')
    //   });
    console.log('Form Submitted', (data));
  }

}
