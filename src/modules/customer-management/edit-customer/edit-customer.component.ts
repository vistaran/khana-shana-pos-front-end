import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'sb-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  editCustomerForm!: FormGroup
  id: any

  get firstname() {
    return this.editCustomerForm.get('firstname');
  }

  get lastname() {
    return this.editCustomerForm.get('lastname');
  }

  get phone() {
    return this.editCustomerForm.get('phone');
  }

  get email() {
    return this.editCustomerForm.get('email');
  }

  get homeAddress() {
    return this.editCustomerForm.get('homeAddress');
  }

  get officeAddress() {
    return this.editCustomerForm.get('officeAddress');
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editCustomerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      homeAddress: ['', [Validators.required]],
      officeAddress: ['', [Validators.required]],
      otherAddress: ['', [Validators.required]]
    })

    this.id = this.route.snapshot.params.id
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
