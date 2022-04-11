import { AppToastService } from './../../shared-module/services/app-toast.service';
import { CustomerManagementService } from './../customer-management.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  editCustomerForm!: FormGroup
  id: any
  public addressForm!: FormGroup
  customerAddressData: any = [];
  address_type_id: any
  address_type:any

  address_type_name = ['Home', 'Work', 'Other'];

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
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.editCustomerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      email: [''],
      home_address: ['', [Validators.required]],
      office_address: ['', [Validators.required]],
      other_address: ['']
    })

    this.addressForm = this.fb.group({
      address_type: [''],
      address_line_1: [''],
      address_line_2: [''],
      address_line_3: [''],
      landmark: [''],
      city: [''],
      state: [''],
      country: [''],
      postalcode: [''],
      latitude: [''],
      longitude: ['']
    })

    this.id = this.route.snapshot.params.id

    this.customerService.editCustomerForm(this.id).subscribe((data: any) => {
      this.editCustomerForm.patchValue(data)
      console.log(data)
    })

    this.getCustomerAddress()
  }


  // For modal
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
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

  getCustomerAddress() {
    this.customerService.getCustomerAddress(this.id).subscribe(data => {
      this.customerAddressData = data.customerAddress
      console.log(this.customerAddressData);
    })
  }

  addAddress(data: any) {
    this.customerAddressData.forEach((g: any) => {
      if (g.id == data.address_type) {
        console.log(g)
        this.address_type = g.address_type
        this.address_type_id = g.address_type_id
      }
    });

    const obj = {
      customer_id: this.id,
      address_type_id: data.address_type,
      address_type: this.address_type,
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      address_line_3: data.address_line_3,
      landmark: data.landmark,
      city: data.city,
      state: data.state,
      country: data.country,
      postalcode: data.postalcode,
      latitude: data.latitude,
      longitude: data.longitude
    }
    this.customerService.addCustomerAddress(obj).subscribe(data => {
      console.log(data)
      this.toast.success('Success', 'Added Successfully.')
      this.getCustomerAddress()
      // this.router.navigate(['/customer_management']);
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
  }

  deleteAddress(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.customerService.deleteCustomerAddress(id).subscribe(data => {
        this.getCustomerAddress();
        this.toast.success('Success', 'Deleted Successfully.')
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    }
  }


}
