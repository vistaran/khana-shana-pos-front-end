import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { CountryListService } from '@modules/shared-module/services/Country List/country-list.service';

import { OutletDataService } from './../outlet-data.service';
// import { addOutlet } from '../outletData';

@Component({
  selector: 'sb-add-outlet',
  templateUrl: './add-outlet.component.html',
  styleUrls: ['./add-outlet.component.scss']
})
export class AddOutletComponent implements OnInit {

  addOutletForm!: FormGroup;
  // myData: any = []
  showValidations = false;

  inventorySource = ['default'];
  status = ['active', 'inactive'];

  constructor(
    private fb: FormBuilder,
    private outletService: OutletDataService,
    private router: Router,
    private toast: AppToastService,
    private countries: CountryListService
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
      status: [0, [Validators.required]],
      postcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      inventory_source: ['default', [Validators.required]],
    });

    // this.getCountryList()
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

  // For submitting add outlet form data
  onSubmit(data: any) {

    console.log(data);
    

    if (this.addOutletForm.invalid) {
      this.addOutletForm.markAllAsTouched();
      alert('Please fill all the required fields!');
      return;
    }

    this.outletService
      .postOutletData(data)
      .subscribe((result: any) => {
        this.router.navigate(['/pos/users'], { queryParams: { outlet: true } });
        this.toast.success('Success', 'Added Successfully.')
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log('Form Submitted', (data));
  }

  // getCountryList() {
  //   this.countries.getCountryList().subscribe((resp: any) => {
  //     console.log(resp);

  //     const countries = [];
  //     for (let i = 0; i < resp.length; ++i) {
  //       const country = resp[i];
  //       countries.push({ text: country.text, value: country.value });
  //     }
  //     this.myData = countries;
  //   })
  // }

}
