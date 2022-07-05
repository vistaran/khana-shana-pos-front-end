import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { EditCustomerAddressComponent } from '../edit-customer-address/edit-customer-address.component';

import { AppToastService } from './../../shared-module/services/app-toast.service';
import { CustomerManagementService } from './../customer-management.service';

@Component({
  selector: 'sb-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  editCustomerForm!: FormGroup
  editAddressForm!: FormGroup
  public addressForm!: FormGroup

  id: any
  customerAddressData: any = [];
  address_type_id: any
  address_type: any
  address_id: any

  address_type_name = [
    {
      id: 1,
      name: 'Home',
    }, {
      id: 2,
      name: 'Work',
    }, {
      id: 3,
      name: 'Other',
    }
  ]

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

  // add address form validations

  get addressType() {
    return this.addressForm.get('address_type');
  }

  get address_line_1() {
    return this.addressForm.get('address_line_1');
  }

  get address_line_2() {
    return this.addressForm.get('address_line_2');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get state() {
    return this.addressForm.get('state');
  }

  get contry() {
    return this.addressForm.get('contry');
  }

  get postalcode() {
    return this.addressForm.get('postalcode');
  }

  // edit address form

  get addressType_edit() {
    return this.editAddressForm.get('address_type');
  }

  get address_line_1_edit() {
    return this.editAddressForm.get('address_line_1');
  }

  get address_line_2_edit() {
    return this.editAddressForm.get('address_line_2');
  }

  get city_edit() {
    return this.editAddressForm.get('city');
  }

  get state_edit() {
    return this.editAddressForm.get('state');
  }

  get contry_edit() {
    return this.editAddressForm.get('contry');
  }

  get postalcode_edit() {
    return this.editAddressForm.get('postalcode');
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
      phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      email: [''],
      // home_address: ['', [Validators.required]],
      // office_address: ['', [Validators.required]],
      // other_address: ['']
    })

    this.addressForm = this.fb.group({
      address_type: [1, [Validators.required]],
      address_line_1: ['', [Validators.required]],
      address_line_2: ['', [Validators.required]],
      address_line_3: [''],
      // landmark: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      contry: ['', [Validators.required]],
      postalcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
      latitude: [''],
      longitude: ['']
    })

    this.editAddressForm = this.fb.group({
      address_type: [0, [Validators.required]],
      address_line_1: ['', [Validators.required]],
      address_line_2: ['', [Validators.required]],
      address_line_3: [''],
      // landmark: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      contry: ['', [Validators.required]],
      postalcode: ['', [Validators.required,  Validators.minLength(5), Validators.maxLength(6)]],
      latitude: [''],
      longitude: ['']
    })

    console.log(this.address_type_name[1].id);


    this.id = this.route.snapshot.params.id
    console.log('Id: ', this.id);


    this.customerService.editCustomerForm(this.id).subscribe((data: any) => {
      this.editCustomerForm.patchValue(data)
    })

    // this.customerService.editAddressFormData(this.id).subscribe((data: any) => {
    //   this.editAddressForm.patchValue({

    //   })
    //   console.log(data)
    // })

    this.getCustomerAddress()
  }

  // For modal
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  openVerticallyCentered2(content: any, id: number) {
    this.modalService.open(content, { size: 'lg' });
    this.address_id = id
    console.log(this.address_id);

    this.customerService.editAddressFormData(this.address_id).subscribe((data: any) => {
      this.editAddressForm.patchValue({
        address_type: (Number(data[0].address_type_id)),
        address_line_1: data[0].address_line_1,
        address_line_2: data[0].address_line_2,
        address_line_3: data[0].address_line_3,
        // landmark: data[0].landmark,
        city: data[0].city,
        state: data[0].state,
        contry: data[0].contry,
        postalcode: data[0].postalcode,
        latitude: data[0].latitude,
        longitude: data[0].longitude
      })
      console.log(data)
    })

  }

  validateNumber(event: any) {
    // const keyCode = event.keyCode;

    // const excludedKeys = [8, 9, 37, 39, 46];

    // if (!((keyCode >= 48 && keyCode <= 57) ||
    //   (keyCode >= 96 && keyCode <= 105) ||
    //   (excludedKeys.includes(keyCode)))) {
    //   event.preventDefault();
    // }

    var inp = String.fromCharCode(event.keyCode);

    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  validateAlphabet(event: any) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  // openModal() {
  //   const modalRef = this.modalService.open(EditCustomerAddressComponent);
  //   modalRef.result.then((result) => {
  //     console.log(result);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

  // For submitting edit customer group form data
  onSubmit(data: any) {
    this.customerService.editCustomer(this.id, data)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Customer Edited Successfully.')
        this.router.navigate(['/customer_management']);
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log('Form Submitted', (data));
  }

  // To get customer address cards details
  getCustomerAddress() {
    this.customerService.getCustomerAddress(this.id).subscribe(data => {
      this.customerAddressData = data.customerAddress
      // console.log(this.customerAddressData[0].address_type);
      // console.log('length', this.customerAddressData.length);

      this.address_type_name.forEach((g: any) => {
        g.addresses = [];
        this.customerAddressData.forEach((c: any) => {
          if (g.name == c.address_type) {
            console.log('yes');
            g.addresses.push(c)
          }
        });
      });


      console.log('Addresses', this.address_type_name);
    })
  }

  addAddress(data: any) {

    if(this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      alert('Please fill all the required fields');
      return;
    }

    this.modalService.dismissAll();

    this.address_type_name.forEach((g: any) => {
      console.log('data', data);

      console.log(g)
      if (g.id == data.address_type) {
        this.address_type = g.name
        this.address_type_id = g.id
      }
    });

    const obj = {
      customer_id: this.id,
      address_type_id: data.address_type,
      address_type: this.address_type,
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      address_line_3: data.address_line_3,
      // landmark: data.landmark,
      city: data.city,
      state: data.state,
      contry: data.contry,
      postalcode: data.postalcode,
      latitude: data.latitude,
      longitude: data.longitude
    }
    this.customerService.addCustomerAddress(obj).subscribe(data => {
      console.log(data)
      this.toast.success('Success', 'Address Added Successfully.')
      this.getCustomerAddress()
      // this.router.navigate(['/customer_management']);
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
  }

  editAddress(data: any) {

    if(this.editAddressForm.invalid) {
      this.editAddressForm.markAllAsTouched();
      alert('Please fill all the required fields');
      return;
    }

    this.modalService.dismissAll();

    this.address_type_name.forEach((g: any) => {
      console.log('data', data);
      if (g.id == data.address_type) {
        this.address_type = g.name
        this.address_type_id = g.id
      }
    });

    const obj = {
      customer_id: this.id,
      address_type_id: data.address_type,
      address_type: this.address_type,
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      address_line_3: data.address_line_3,
      // landmark: data.landmark,
      city: data.city,
      state: data.state,
      contry: data.contry,
      postalcode: data.postalcode,
      latitude: data.latitude,
      longitude: data.longitude
    }
    this.customerService.editCustomerAddress(this.address_id, obj).subscribe(data => {
      console.log(data)
      this.toast.success('Success', 'Address Edited Successfully.')
      this.ngOnInit();
      // this.getCustomerAddress()

      // this.router.navigate(['/customer_management/editcustomer/' + this.id]);
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
  }

  deleteAddress(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.customerService.deleteCustomerAddress(id).subscribe(data => {
        this.getCustomerAddress();
        this.toast.success('Success', 'Address Deleted Successfully.')
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    }
  }


}
