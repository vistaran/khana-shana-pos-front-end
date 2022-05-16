import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { UomService } from '../uom.service';

@Component({
  selector: 'sb-add-uom',
  templateUrl: './add-uom.component.html',
  styleUrls: ['./add-uom.component.scss']
})
export class AddUomComponent implements OnInit {

  addUomForm!: FormGroup
  showValidations = false;

  // For Validations
  get name() {
    return this.addUomForm.get('unit_name');
  }

  get unit() {
    return this.addUomForm.get('unit');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private uomService: UomService,
    private toast: AppToastService
  ) { }

  ngOnInit(): void {
    this.addUomForm = this.fb.group({
      unit_name: ['', [Validators.required]],
      unit: ['', [Validators.required]]
    })
  }

  // For submitting add uom form data
  onSubmit(data: any) {

    if(this.addUomForm.invalid) {
      alert('Please fill all the required fields!');
      return;
    }

    this.uomService
      .postUomData(data)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Added Successfully.')
        this.router.navigate(['/pos/uom']);
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log('Form Submitted', (data));

  }

}


