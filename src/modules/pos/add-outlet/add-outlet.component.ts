import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sb-add-outlet',
  templateUrl: './add-outlet.component.html',
  styleUrls: ['./add-outlet.component.scss']
})
export class AddOutletComponent implements OnInit {

  addOutletForm!: FormGroup;

  inventorySource = ['default'];
  status = ['active', 'inactive'];

  constructor(private fb: FormBuilder) { }

  get outletName() {
    return this.addOutletForm.get('outletName');
  }

  get stat() {
    return this.addOutletForm.get('status');
  }

  get outletAddress() {
    return this.addOutletForm.get('outletAddress');
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
    return this.addOutletForm.get('postCode');
  } 

  get inventory() {
    return this.addOutletForm.get('inventorySource');
  } 
  
  ngOnInit(): void {
    this.addOutletForm = this.fb.group( {
      outletName: ['',[Validators.required]],
      status: ['',[Validators.required]],
      outletAddress: ['',[Validators.required]],
      country: ['',[Validators.required]],
      state: ['',[Validators.required]],
      city: ['',[Validators.required]],
      postCode: ['',[Validators.required]],
      inventorySource:['',[Validators.required]],
    });
  }

}
